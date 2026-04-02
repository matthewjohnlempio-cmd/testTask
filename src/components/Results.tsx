'use client';

import { useEffect, useState, useRef } from "react";

export default function WavesAnimation() {
  const results = [
    { percent: 92, text: 'Noticed their cat had more energy and playfulness within the first 30 days.' },
    { percent: 88, text: 'Reported visible improvements in coat shine and eye brightness after consistent use.' },
    { percent: 96, text: 'Said they feel peace of mind knowing their cat is getting complete nutrition every day.' },
  ];

  const [animatedPercents, setAnimatedPercents] = useState(results.map(() => 0));
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Animate percentages
  useEffect(() => {
    if (!showResults) return;
    const interval = setInterval(() => {
      setAnimatedPercents(prev => prev.map((val, i) => (val < results[i].percent ? val + 1 : val)));
    }, 15);
    return () => clearInterval(interval);
  }, [showResults]);

  // Observe when results come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowResults(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (resultsRef.current) observer.observe(resultsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="header relative w-full overflow-hidden text-center bg-[#3d93e9] text-white">

      {/* Top Waves */}
      <div className="waves relative w-full h-[15vh] min-h-[100px] max-h-[150px] -mb-7 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(61, 147, 233, 0.7)" />
            <use href="#gentle-wave" x="48" y="3" fill="rgba(61, 147, 233, 0.5)" />
            <use href="#gentle-wave" x="48" y="5" fill="rgba(61, 147, 233, 0.3)" />
            <use href="#gentle-wave" x="48" y="7" fill="#3d93e9" />
          </g>
        </svg>
      </div>

      {/* Results Content */}
      <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16 pt-13 pb-12 bg-[#3d93e9]">

        {/* Title */}
        <div className={`flex items-center justify-center transition-all duration-700 ease-out
          ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Results</h2>
        </div>

        {/* Results List */}
        <div className="flex flex-col gap-4">
          {results.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-4 
                ${idx === 2 ? 'border-t border-b border-gray-300/15' : 'border-t border-gray-300/15'} 
                transition-all duration-700 ease-out
                ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              {/* Circle */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="transparent" strokeWidth="4" stroke="transparent" />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="transparent"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${animatedPercents[idx]}, 100`}
                  />
                </svg>
                <span className="absolute text-sm sm:text-base font-bold">{animatedPercents[idx]}%</span>
              </div>

              {/* Text */}
              <p className="text-left text-sm sm:text-base">{item.text}</p>
            </div>
          ))}

          <p className={`mt-2 text-xs sm:text-sm italic text-start transition-all duration-700 ease-out
            ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            *Based on feedback from 8000+ customers who used KittySupps Taurine Supplement for at least 60 days.
          </p>
        </div>
      </div>

      {/* Bottom Waves */}
      <div className="waves relative w-full h-[16vh] sm:h-[14vh] min-h-[100px] max-h-[160px] overflow-hidden -mt-1 rotate-180 bg-white">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave-bottom" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave-bottom" x="48" y="0" fill="rgba(61, 147, 233, 0.7)" />
            <use href="#gentle-wave-bottom" x="48" y="3" fill="rgba(61, 147, 233, 0.5)" />
            <use href="#gentle-wave-bottom" x="48" y="5" fill="rgba(61, 147, 233, 0.3)" />
            <use href="#gentle-wave-bottom" x="48" y="7" fill="#3d93e9" />
          </g>
        </svg>
      </div>

      {/* Waves animation */}
      <style jsx>{`
        .parallax > use {
          animation: move-forever 25s cubic-bezier(0.55,0.5,0.45,0.5) infinite;
        }
        .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
        .parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
        .parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
        .parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

        @keyframes move-forever {
          0% { transform: translate3d(-90px, 0, 0); }
          100% { transform: translate3d(85px, 0, 0); }
        }
      `}</style>
    </div>
  );
}