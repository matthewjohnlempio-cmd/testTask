'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiStar } from 'react-icons/fi';
import '@splidejs/react-splide/css';

// Dynamically import Splide (client-only)
const Splide = dynamic(() => import('@splidejs/react-splide').then((mod) => mod.Splide), {
  ssr: false,
});
const SplideSlide = dynamic(
  () => import('@splidejs/react-splide').then((mod) => mod.SplideSlide),
  { ssr: false }
);

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Isla F.',
    rating: 5,
    text: "I thought my cat’s food covered taurine, but KittySupps proved me wrong. More energy and shinier coat in weeks.",
  },
  {
    id: 2,
    name: 'Tilly W.',
    rating: 5,
    text: "My cat used to vomit 2-3 times a week and after taking Kittysupps for a month, she barely vomits now!",
  },
  {
    id: 3,
    name: 'Ella M.',
    rating: 5,
    text: "I was scared to give too much, but it’s water-soluble and safe. The scoop makes it foolproof.",
  },
];

export default function ReviewCarousel() {
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Don't render on the server

  return (
    <div className="max-w-3xl px-4">
      <Splide
        options={{
          type: 'slide',
          perPage: 1,
          perMove: 1,
          arrows: false,
          pagination: true,
          interval: 5000,
        }}
        className="review-splide"
        aria-label="Customer Reviews"
      >
        {reviews.map((review) => (
          <SplideSlide key={review.id}>
            <div className="p-4">
              {/* REVIEW TEXT */}
              <div className="mb-4 text-left border-b-1 border-gray-200 pb-1">
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                  <em>"{review.text}"</em>
                </p>
              </div>

              {/* AUTHOR + STARS */}
              <div className="flex items-center gap-2 flex-wrap text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 122.88 116.87"
                >
                  <polygon
                    fill="currentColor"
                    points="61.37 8.24 80.43 0 90.88 17.79 111.15 22.32 109.15 42.85 122.88 58.43 109.2 73.87 111.15 94.55 91 99 80.43 116.87 61.51 108.62 42.45 116.87 32 99.08 11.73 94.55 13.73 74.01 0 58.43 13.68 42.99 11.73 22.32 31.88 17.87 42.45 0 61.37 8.24"
                  />
                  <path
                    fill="#ffffff"
                    d="M37.92,65c-6.07-6.53,3.25-16.26,10-10.1l8.24,7.49L74.66,39.66C81.1,33,91.27,42.78,84.91,49.48L61.67,77.2a7.13,7.13,0,0,1-9.9.44C47.83,73.89,42.05,68.5,37.92,65Z"
                  />
                </svg>

                <span className="text-sm md:text-base font-medium text-gray-500">
                  {review.name} - Verified Buyer
                </span>

                <div className="flex items-center gap-1 ml-1 text-yellow-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <FiStar
                      key={i}
                      className={i < review.rating ? 'fill-yellow-400' : 'text-gray-300'}
                      size={14}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      {/* DOT STYLING */}
      <style jsx global>{`
        .review-splide .splide__pagination {
          margin-bottom: -20px; /* moved lower */
          display: flex;
          justify-content: center;
        }

        .review-splide .splide__pagination__page {
          background: #d1d5db; /* gray dots */
          opacity: 1;
        }

        .review-splide .splide__pagination__page.is-active {
          background: #000000; /* active = black */
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}