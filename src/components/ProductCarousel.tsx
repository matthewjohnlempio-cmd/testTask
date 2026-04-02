'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { IoIosLock } from "react-icons/io";
import ShippingInfo from "./ShippingInfo";
import ReviewCarousel from "./ReviewCarousel";

interface Currency {
  symbol: string;
  code: string;
  rate: number; // conversion rate from base currency (USD)
}

// Bundle data
const bundleData = [
  {
    id: 1,
    name: "Buy 1 Tubs",
    quantity: 1,
    originalPrice: 80.0,
    total: 49.95,
    image: "/images/Buy/1tub.avif",
    discountPercent: 0,
    badge: "",
  },
  {
    id: 2,
    name: "Buy 2 Tubs",
    quantity: 2,
    originalPrice: 80.0,
    total: 75.9,
    image: "/images/Buy/2tub.avif",
    discountPercent: 53,
    badge: "MOST POPULAR",
  },
  {
    id: 3,
    name: "Buy 3 Tubs",
    quantity: 3,
    originalPrice: 80.0,
    total: 86.85,
    image: "/images/Buy/3tub.avif",
    discountPercent: 64,
    badge: "MOST VALUE",
  },
];

const products = [
  { id: 1, image: "/images/product/cat1.webp" },
  { id: 2, image: "/images/product/cat2.webp" },
  { id: 3, image: "/images/product/cat3.webp" },
  { id: 4, image: "/images/product/cat4.webp" },
  { id: 5, image: "/images/product/cat5.webp" },
  { id: 6, image: "/images/product/cat6.webp" },
  { id: 7, image: "/images/product/cat7.webp" },
  { id: 8, image: "/images/product/cat8.webp" },
];

const gifts = [
  { id: 1, price: 4.99, label: "Locked" },
  { id: 2, price: 14.99, label: "2 Tubs" },
  { id: 3, price: 9.95, label: "3 Tubs" },
];

interface Props {
  selectedCurrency: Currency;
}

export default function ProductCarousel({ selectedCurrency }: Props) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState<number | null>(null);

  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsRef = useRef<HTMLDivElement>(null);

  const [showGuarantee, setShowGuarantee] = useState(false);
  const guaranteeRef = useRef<HTMLDivElement>(null);

  const visibleCount = 5;
  const step = 3;
  const maxStart = products.length - visibleCount;

  const nextThumbs = () => setThumbStart((prev) => Math.min(prev + step, maxStart));
  const prevThumbs = () => setThumbStart((prev) => Math.max(prev - step, 0));

const formatPrice = (value: number): string => {
    // Format the number part with locale-aware separators (thousands + decimals)
    const numberPart = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    // Put the symbol in front (most currencies do this; you can adjust if needed)
    return `${selectedCurrency.symbol}${numberPart}`;
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">

          {/* LEFT SIDE (PRODUCT) */}
          <div className="md:sticky md:top-6 h-fit">
            {/* MAIN IMAGE */}
            <div className="relative w-full max-w-md md:max-w-lg mx-auto md:ml-6 md:-mt-2 aspect-square bg-white rounded-3xl overflow-hidden shadow-xl mb-5">
              <div
                className="w-full h-full transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${mainImageIndex * 100}%)`,
                  display: "flex",
                }}
              >
                {products.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0 relative">
                    <Image
                      src={product.image}
                      alt="Product Preview"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevThumbs}
                disabled={thumbStart === 0}
                className="p-2 disabled:opacity-30"
              >
                <FiChevronLeft size={22} />
              </button>

              <div className="overflow-x-auto md:overflow-hidden flex-1">
                <div
                  className="flex gap-2 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${thumbStart * (80 + 12)}px)` }}
                >
                  {products.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => setMainImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-opacity duration-300 border ${
                        index === mainImageIndex
                          ? "border-black"
                          : "border-transparent hover:opacity-70"
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={nextThumbs}
                disabled={thumbStart >= maxStart}
                className="p-2 disabled:opacity-30"
              >
                <FiChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (CONTENT) */}
          <div className="space-y-3 pt-2">

            {/* RATING */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-yellow-500" />
                ))}
              </div>
              <span>Rated 4.8/5 by 1000+ devoted cat parents</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Stop the Silent Deficiency Before You See the Signs with KittySupps
              <sup className="text-sm align-super">TM</sup> Taurine Supplement
            </h1>

            {/* PARAGRAPH */}
            <p className=" text-lg leading-relaxed">
              Don't wait for silent deficiency strike. KittySupps Taurine fills
              the gap your cat's food leaves behind, supporting healthy vision,
              heart function, and daily vitality in one simple scoop.
            </p>

            {/* LOW STOCK BADGE */}
            <div className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-md font-bold text-xs w-fit">
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                <span className="inline-flex h-2 w-2 rounded-full bg-red-600"></span>
              </div>
              <span>Only 8 Left in stock</span>
            </div>

            {/* ALMOST SOLD OUT BOX */}
            <div className="mt-3 mb-6 bg-[#ffe7e7] border border-red-500 rounded-md px-3 py-2 w-fit">
              <p className="text-sm md:text-base text-gray-900 max-w-md">
                <strong>Almost Sold Out</strong>: High Demand Due to Limited Time Sale!
              </p>
            </div>

            {/* BUNDLE TITLE WITH LINES */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#0e9eff4d]"></div>
              <span className="font-bold text-sm md:text-base tracking-wide whitespace-nowrap">
                BUY MORE - SAVE MORE
              </span>
              <div className="flex-1 h-px bg-[#0e9eff4d]"></div>
            </div>

            {/* BUNDLE CARDS */}
            {bundleData.map((bundle) => {
              const discountMultiplier = subscribed ? 0.8 : 1; // 20% off for subscribers
              const discountedTotalNumber = bundle.total * discountMultiplier * selectedCurrency.rate;
              const discountedEachNumber = discountedTotalNumber / bundle.quantity;

              const discountedTotal = formatPrice(discountedTotalNumber);
              const discountedEach = formatPrice(discountedEachNumber);

              // Only show % OFF for bundle 2 and 3 (Buy 2 and Buy 3)
              const showPercentOff = bundle.id !== 1; // id 1 = Buy 1 Tub

              const percentOff = subscribed
                ? Math.round(100 - (discountedEachNumber / (bundle.originalPrice * selectedCurrency.rate)) * 100)
                : bundle.discountPercent;

              return (
                <div
                  key={bundle.id}
                  onClick={() =>
  setSelectedBundleId(
    selectedBundleId === bundle.id ? null : bundle.id
  )
}
                  className={`relative border rounded-xl p-4 flex items-center gap-4 transition cursor-pointer
                    ${selectedBundleId === bundle.id 
                      ? 'bg-[#fcffc462] border-3 border-[#007bff]' 
                      : 'border border-[#007bff51] hover:border-2'}`}
                >
                  {/* Badge (MOST POPULAR / MOST VALUE) - Keep only for bundle 2 and 3 */}
                  {bundle.badge && (
                    <div className="absolute -top-3 right-4 bg-[#0e9eff] text-white text-xs font-bold px-3 py-1 rounded-b-md shadow">
                      {bundle.badge}
                    </div>
                  )}

                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-16 h-16 object-contain"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm md:text-base">{bundle.name}</span>
                      
                      {/* % OFF badge - Show only for Tub 2 and Tub 3 */}
                      {showPercentOff && percentOff > 0 && (
                        <span className="bg-[#007bff51] text-black text-xs font-bold px-2 py-[2px] rounded">
                          {percentOff}% OFF
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total {discountedTotal}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-base md:text-lg">
                      {discountedEach} <span className="text-sm font-normal">each</span>
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(bundle.originalPrice * selectedCurrency.rate)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* SUBSCRIBE BAR */}
            <div
              onClick={() => setSubscribed(!subscribed)}
              className="border-2 border-dashed border-[#0e9eff] rounded-xl p-4 flex items-start gap-3 cursor-pointer transition hover:bg-blue-50"
            >
              <div className="mt-2 flex items-center justify-center text-[#0e9eff]">
                {subscribed ? <GrCheckboxSelected size={25} /> : <GrCheckbox size={25} />}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-sm md:text-base">
                  <strong>Subscribe & Save 20%</strong>
                </div>
                <div className="text-[10px] text-gray-600">
                  Zero commitment | Exclusive Discounts | Cancel Anytime
                </div>
              </div>
            </div>

            {/* FREE GIFTS SPAN */}
            <span className="kaching-bundles__progressive-gifts__title mt-2 block text-[#2b2b2b] text-sm md:text-base font-bold text-center">
              FREE Gifts With Your First Order!
            </span>


{/* GIFTS GRID */}
<div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
  {gifts.map((gift) => (
    <div
      key={gift.id}
      className="relative border border-[#b7e2ff] rounded-xl p-4 flex flex-col items-center cursor-pointer hover:border-2 transition"
    >
      {/* Label attached to top border */}
      <div className="absolute -top-3 bg-[#ee4b4b] text-white text-xs px-3 py-1 rounded-md">
        FREE{" "}
        <span className="line-through ml-1">
          {gift.id === 1 || gift.id === 2
            ? formatPrice(gift.price * selectedCurrency.rate)
            : `$${gift.price}`}
        </span>
      </div>

      {/* CONDITIONAL CONTENT */}
      {selectedBundleId && gift.id <= selectedBundleId ? (
        <div
          key={`gift-${gift.id}`}
          className="flex flex-col items-center mt-3 opacity-0 animate-fadeUp"
        >
          <Image
            src={
              gift.id === 1
                ? "/images/Gift/cup.webp"
                : gift.id === 2
                ? "/images/Gift/brush.avif"
                : "/images/Gift/box.avif"
            }
            alt="Free Gift"
            width={60}
            height={60}
            className="object-contain"
          />
          <div className="text-[#667085] text-sm mt-2 text-center">
            {gift.id === 1 ? (
    <>
      FREE KittySupps<sup>TM</sup> Measuring Scoop
    </>
  ) : gift.id === 2 ? (
    <>
      FREE KittySupps<sup>TM</sup> Groom Brush
    </>
  ) : (
    <>FREE Priority Shipping</>
  )}
          </div>
        </div>
      ) : (
        <div key={`locked-${gift.id}`} className="flex flex-col items-center mt-3">
          <IoIosLock size={50} className="text-[#667085]" />
          <div className="text-[#667085] text-2l mt-2 text-center">
            {gift.label}
          </div>
        </div>
      )}
    </div>
  ))}
</div>


{/* ADD TO CART BUTTON */}
<div className="mt-6">
<button className="relative overflow-hidden w-full bg-[#53af01] text-white font-bold text-[20px] py-4 rounded-xl border-2 border-[#53af01] transition active:scale-[0.98] group">
  
  {/* LEFT TRAIN */}
  <span className="absolute left-0 top-0 h-full w-1/2 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

  {/* RIGHT TRAIN */}
  <span className="absolute right-0 top-0 h-full w-1/2 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

  {/* TEXT */}
  <span className="relative z-10 group-hover:text-[#53af01] transition">
    ADD TO CART
  </span>
</button>
</div>

<button className="w-full mt-3 bg-[#5433EB]/95 text-white font-semibold text-[18px] py-1 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5433EB] active:scale-[0.98] transition">
  <span>Buy with</span>
  <Image
    src="/images/svg/shop.svg"
    alt="Shop Pay"
    width={60}
    height={14}
    className="object-contain -ml-1"
  />
</button>

<a
  href="#"
  className="block text-center text-sm text-black mt-3 hover:underline transition"
>
  More payment options
</a>

 {/* SHIPPING INFO */}
<ShippingInfo />

{/* LOW STOCK ALERT */}
<div className="low-stock-alert bg-white border border-black rounded-xl p-4 mt-3">
      
      {/* Header */}
      <div className="alert-header flex items-center gap-2 mb-2">
        <svg
          viewBox="0 0 24 24"
          className="alert-icon w-6 h-6 text-black flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div className="alert-title text-black text-sm md:text-base">
          WARNING: Low Stock Notice
        </div>
      </div>

      {/* Body */}
      <div className="alert-body text-sm md:text-base text-[#667085] mb-2">
        This product sold out <span className="alert-underline underline">12 times</span> last year. We encourage you to take advantage of the <strong className="text-black">limited sale</strong> and buy now.
      </div>

      {/* Footer */}
      <div className="alert-footer text-xs md:text-sm text-[#667085]">
        <strong>PS:</strong> KittySupps is ONLY available here, don’t buy <span className="alert-underline underline">fakes on Amazon/eBay</span>
      </div>

    </div>

{/* INSTRUCTIONS DROPDOWN */}
<div className="mt-3 overflow-hidden border-b-1 border-gray-300">
  <button
    onClick={() => setShowInstructions(!showInstructions)}
    className="w-full flex justify-between items-center px-4 py-3 transition"
  >
    {/* Left side: icon + title */}
    <div className="flex items-center gap-3">
      <span className="material-icons material-symbols-outlined text-black">
        <GrCheckboxSelected size={20} />
      </span>
      <h2 className="h4 text-sm md:text-base font-semibold">Directions For Use</h2>
    </div>

    {/* Right side: caret */}
    <div
      className="accordion__collapse-icon transition-transform duration-300"
      style={{ transform: showInstructions ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <svg aria-hidden="true" focusable="false" className="w-4 h-4" viewBox="0 0 10 6">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
          fill="currentColor"
        />
      </svg>
    </div>
  </button>

  {/* Collapsible content: image */}
  <div
    ref={instructionsRef}
    className="overflow-hidden transition-all duration-500 ease-in-out"
    style={{
      maxHeight: showInstructions ? `${instructionsRef.current?.scrollHeight}px` : "0px",
    }}
  >
    <div className="p-4">
      <Image
        src="/images/drop/instruct.webp"
        alt="Instructions"
        width={600}
        height={400}
        className="w-full h-auto object-contain rounded-md"
      />
    </div>
  </div>
</div>


{/* MONEY BACK GUARANTEE DROPDOWN */}
<div className="mt-3 overflow-hidden border-b border-gray-300">
  <button
    onClick={() => setShowGuarantee(!showGuarantee)}
    className="w-full flex justify-between items-center px-4 py-3 transition"
  >
    {/* Left side: icon + title */}
    <div className="flex items-center gap-3">
      <span className="text-black">
        <GrCheckboxSelected size={20} />
      </span>
      <h2 className="h4 text-sm md:text-base font-semibold">
        30-Day Money Back Guarantee
      </h2>
    </div>

    {/* Right side: caret */}
    <div
      className="transition-transform duration-300"
      style={{ transform: showGuarantee ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <svg aria-hidden="true" focusable="false" className="w-4 h-4" viewBox="0 0 10 6">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
          fill="currentColor"
        />
      </svg>
    </div>
  </button>

  {/* Collapsible content: TEXT */}
  <div
    ref={guaranteeRef}
    className="overflow-hidden transition-all duration-500 ease-in-out"
    style={{
      maxHeight: showGuarantee
        ? `${guaranteeRef.current?.scrollHeight}px`
        : "0px",
    }}
  >
    <div className="px-4 pb-4 text-sm md:text-base text-black space-y-4">
      <p>
        We're so confident your kitty will be happier and more energetic, all of our products are backed by a 30 day money back guarantee.
      </p>

      <p>
        If you're not 100% satisfied with our product, simply contact our team and we'll refund your entire order.
      </p>

      <p>
        Or if something isn't right, contact us and we'll deal with it for no additional charge.
      </p>
    </div>
  </div>
</div>


{/* REVIEW CAROUSEL */}
  <ReviewCarousel />

    

          </div>
        </div>
      </div>
    </div>
  );
}