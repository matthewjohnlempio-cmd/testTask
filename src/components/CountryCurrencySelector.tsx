'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";

interface Country {
  name: string;
  flag: string;
  currency: string; // symbol
  code: string;     // currency code (e.g., "PHP")
  rate: number;     // rate to 1 USD (e.g., PHP ≈ 58)
}

interface ApiCountry {
  name: { common: string };
  flags: { png: string };
  currencies?: Record<string, { symbol?: string; name?: string }>;
}

interface Props {
  onCurrencyChange?: (currency: { code: string; symbol: string; rate: number }) => void;
}

export default function CountryCurrencySelector({ onCurrencyChange }: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const [loading, setLoading] = useState(true);

  // Comprehensive currency symbols map (covers most common cases where REST Countries fails)
  const currencySymbols: Record<string, string> = {
    USD: "$",    EUR: "€",    GBP: "£",    JPY: "¥",    CNY: "¥",    INR: "₹",
    RUB: "₽",    PHP: "₱",    KRW: "₩",    BRL: "R$",   TRY: "₺",
    MXN: "$",    CAD: "C$",   AUD: "A$",   CHF: "CHF",  SEK: "kr",
    NOK: "kr",   DKK: "kr",   PLN: "zł",   CZK: "Kč",   HUF: "Ft",
    ILS: "₪",    ZAR: "R",    SGD: "S$",   HKD: "HK$",  TWD: "NT$",
    THB: "฿",    IDR: "Rp",   MYR: "RM",   VND: "₫",    AED: "د.إ",
    SAR: "ر.س",  AFN: "؋",    ALL: "L",     AOA: "Kz",    // ← These were missing/broken
    ARS: "$",    BDT: "৳",    BGN: "лв",   BHD: "BD",    BIF: "FBu",
    BOB: "Bs",   BWP: "P",    BYN: "Br",    CDF: "FC",    CLP: "$",
    COP: "$",    CRC: "₡",    DZD: "د.ج",   EGP: "E£",    ETB: "Br",
    GEL: "₾",    GHS: "₵",    GNF: "FG",    GTQ: "Q",     HNL: "L",
    HRK: "kn",   HTG: "G",    IQD: "ع.د",   IRR: "﷼",     ISK: "kr",
    JMD: "J$",   JOD: "JD",   KES: "KSh",   KGS: "сом",   KHR: "៛",
    KMF: "CF",   KWD: "KD",   KZT: "₸",     LAK: "₭",     LBP: "ل.ل",
    LKR: "Rs",   LRD: "$",    LSL: "M",     LYD: "LD",    MAD: "د.م.",
    MDL: "L",    MGA: "Ar",   MKD: "ден",   MMK: "K",     MNT: "₮",
    MOP: "MOP$", MRO: "UM",   MUR: "Rs",    MVR: "Rf",    MWK: "MK",
    MZN: "MT",   NAD: "$",    NGN: "₦",     NIO: "C$",    NPR: "Rs",
    NZD: "NZ$",  OMR: "ر.ع.",  PAB: "B/.",   PEN: "S/",    PGK: "K",
    PKR: "Rs",   PYG: "₲",    QAR: "ر.ق",   RON: "lei",   RSD: "дин",
    RWF: "FRw",  SBD: "$",    SCR: "SR",    SDG: "ج.س.",  SOS: "Sh",
    SRD: "$",    SSP: "£",    STN: "Db",    SYP: "£S",    SZL: "E",
    TJS: "ЅМ",   TMT: "m",    TND: "د.ت",   TOP: "T$",    TTD: "TT$",
    TZS: "TSh",  UAH: "₴",    UGX: "USh",   UYU: "$U",    UZS: "сўм",
    VES: "Bs.S", VUV: "VT",   WST: "WS$",   XAF: "FCFA",  XOF: "CFA",
    XPF: "CFP",  YER: "﷼",    ZMW: "ZK",    ZWL: "$",
    // Add more if you notice any still missing
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch countries + currencies
        const countryRes = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,currencies"
        );
        const countryData: ApiCountry[] = await countryRes.json();

        if (!Array.isArray(countryData)) return;

        // 2. Fetch live exchange rates (base USD) — this is the key fix
        const ratesRes = await fetch("https://open.er-api.com/v6/latest/USD");
        const ratesData = await ratesRes.json();

        const rates: Record<string, number> = ratesData.rates || {};

        const mapped: Country[] = countryData
  .filter((c) => c.currencies && Object.keys(c.currencies).length > 0)
  .map((c) => {
    const currencyKey = Object.keys(c.currencies!)[0];
    const currencyInfo = c.currencies![currencyKey];

    // Priority: 1. Our comprehensive map  2. API symbol (if it's good)  3. Currency code
    let symbol = currencySymbols[currencyKey] 
      || currencyInfo?.symbol 
      || currencyKey;

    // Clean bad symbols from REST Countries (e.g. "Af", "US$", very long text)
    if (!symbol || symbol.length > 4 || symbol === currencyKey + "$") {
      symbol = currencySymbols[currencyKey] || currencyKey;
    }

    const rate = rates[currencyKey] ?? 1;

    return {
      name: c.name.common,
      flag: c.flags.png,
      currency: symbol,
      code: currencyKey,
      rate,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(mapped);

        // Auto-select based on user locale (fallback to PHP since you're in PH)
        const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
        const countryCodeFromLocale = userLocale.split("-")[1]?.toUpperCase();

        let userCountry =
          mapped.find((c) => c.code === countryCodeFromLocale) ||
          mapped.find((c) => c.code === "PHP") ||
          mapped[0];

        setSelected(userCountry ?? null);

        if (userCountry && onCurrencyChange) {
          onCurrencyChange({
            code: userCountry.code,
            symbol: userCountry.currency,
            rate: userCountry.rate,
          });
        }
      } catch (err) {
        console.error("Failed to fetch currency data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onCurrencyChange]);

  // Position dropdown logic (unchanged)
  useEffect(() => {
    if (!open || !dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setPosition(spaceBelow < 200 && spaceAbove > 200 ? "top" : "bottom");
  }, [open]);

  const handleSelect = (c: Country) => {
    setSelected(c);
    setOpen(false);
    if (onCurrencyChange) {
      onCurrencyChange({
        code: c.code,
        symbol: c.currency,
        rate: c.rate,
      });
    }
  };

  const formatPrice = (value: number) => {
    if (!selected) return value.toFixed(2);
    const symbol = selected.currency;
    return `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading currencies...</div>;
  }

  return (
    <div className="relative">
      {/* Selected */}
      <div
        className="flex items-center space-x-2 cursor-pointer select-none hover:text-blue-500"
        onClick={() => setOpen(!open)}
      >
        {selected && (
          <>
            <span className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
              <Image
                src={selected.flag}
                alt={selected.name}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </span>
            <span>{selected.name} | {selected.currency} {selected.code}</span>
          </>
        )}
        <IoChevronDown
          className={`text-sm transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute right-0 w-64 max-h-80 bg-white border border-gray-200 shadow-md z-10 rounded-md overflow-y-auto
            ${position === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}`}
        >
          {countries.map((c) => (
            <div
              key={`${c.code}-${c.name}`}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(c)}
            >
              <span className="w-6 h-6 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                <Image
                  src={c.flag}
                  alt={c.name}
                  width={24}
                  height={24}
                  className="object-cover w-full h-full"
                />
              </span>
              <span>{c.name} | {c.currency} {c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}