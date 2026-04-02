'use client';

import { useEffect, useState } from "react";

const getShippingDate = (processingDays = 1) => {
  const today = new Date();
  let shipDate = new Date(today);

  let addedDays = 0;
  while (addedDays < processingDays) {
    shipDate.setDate(shipDate.getDate() + 1);
    const day = shipDate.getDay();
    if (day !== 0 && day !== 6) { // Skip Sunday (0) and Saturday (6)
      addedDays++;
    }
  }

  const options = { weekday: "short", month: "short", day: "numeric" } as const;
  return shipDate.toLocaleDateString(undefined, options);
};

export default function ShippingInfo() {
  const [countryCode, setCountryCode] = useState("PH");

  useEffect(() => {
    const code = (navigator.language || "en-PH").split("-")[1]?.toUpperCase() || "PH";
    setCountryCode(code);
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-[20px] px-4 py-2 mt-3">
      {/* Left: Ships by date */}
      <div className="flex items-center gap-2">
        <svg
          className="w-3 h-3 animate-pulse text-green-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 13"
          fill="none"
        >
          <circle cx="6" cy="6.5" r="6" fill="#137333" />
        </svg>
        <div className="text-xs text-black">
          Ships by <span className="font-bold">{getShippingDate(2)}</span>
        </div>
      </div>

      {/* Right: Country flag + shipping info */}
      <div className="flex items-center gap-2">
        <img
          src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
          alt={`${countryCode} Flag`}
          className="w-4 h-3"
        />
        <div className="text-xs text-black">
          Fast <span className="font-bold">{countryCode}</span> Shipping
        </div>
      </div>
    </div>
  );
}