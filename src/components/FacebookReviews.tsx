'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from "react";

interface Post {
  id: number;
  name: string;
  time: string;
  profile: string;
  content: string;
  image: string;
  reactions: string;
  comments: string;
}

const posts: Post[] = [
  {
    id: 1,
    name: 'Dorothy Ann',
    time: '2h ago',
    profile: '/images/FB/user1.webp',
    content:
      "I honestly thought this was unnecessary because my cat’s premium food says ‘complete and balanced.’ But after learning that processing destroys taurine, I decided to try Kittysupps. Within a month, my 8-year-old cat was more energetic and her coat looked shinier than it had in years.",
    image: '/images/FB/cat1.webp',
    reactions: '1.1k',
    comments: '26 Comments',
  },
  {
    id: 2,
    name: 'Jessica Lane',
    time: '1d ago',
    profile: '/images/FB/user2.jpg',
    content:
      "I hesitated for weeks because I was worried about giving my cat too much taurine. My vet explained it’s water-soluble and any excess just gets flushed out, so it’s completely safe. Kittysupps even includes the perfect little scoop so I don’t have to measure or guess. Now it’s part of my nightly routine, and I finally feel at peace knowing my cat is covered.",
    image: '/images/FB/cat2.webp',
    reactions: '2.6k',
    comments: '67 Comments',
  },
  {
    id: 3,
    name: 'Mavis Irene',
    time: '3d ago',
    profile: '/images/FB/user3.jpg',
    content:
      "I was convinced taurine deficiency was something that only happened decades ago before pet food was regulated. Honestly, I thought supplementing was just marketing. But my vet explained that cooking and storage destroy taurine, even in ‘complete’ foods. That terrified me because my cat was already on a grain-free diet. I started using Kittysupps and the peace of mind alone has been worth it. Now I know for sure my cat isn’t slowly missing something essential.",
    image: '/images/FB/cat3.webp',
    reactions: '5.3k',
    comments: '130 Comments',
  },
];

export default function SocialProof() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [showTitle, setShowTitle] = useState(false);

  const noticeRef = useRef<HTMLDivElement | null>(null);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTitle(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowNotice(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (noticeRef.current) observer.observe(noticeRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-100 pt-16 pb-0 px-4">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h2
          ref={titleRef}
          className={`text-center text-2xl md:text-4xl font-bold mb-10 transition-all duration-700 ease-out ${
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          LOVED BY THOUSANDS...
        </h2>

        {/* POSTS GRID */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden"
            >

              {/* TOP */}
              <div className="flex items-center gap-3 p-4 pb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.profile}
                    alt={post.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-sm">{post.name}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>

                <span className="text-gray-500 text-lg cursor-pointer">•••</span>
              </div>

              {/* CONTENT */}
              <p className="text-sm text-gray-700 px-4 mb-3">
                {post.content}
              </p>

              {/* IMAGE */}
              <div className="w-full">
                <Image
                  src={post.image}
                  alt=""
                  width={500}
                  height={600}
                  className="object-cover w-full h-auto"
                />
              </div>

              {/* REACTIONS */}
              <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <img src="/images/FB/like.webp" className="w-4 h-4 border border-white rounded-full" />
                    <img src="/images/FB/heart.webp" className="w-4 h-4 border border-white rounded-full -ml-1" />
                    <img src="/images/FB/care.webp" className="w-4 h-4 border border-white rounded-full -ml-1" />
                  </div>
                  <span>{post.reactions}</span>
                </div>

                <span>{post.comments}</span>
              </div>

              <div className="border-t mx-4" />

              {/* ACTIONS */}
              <div className="flex justify-between px-2 py-1 text-sm">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md transition">
                  <img src="https://img.icons8.com/windows/32/facebook-like.png" className="w-5 h-5" />
                  Like
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md transition">
                  <img src="https://img.icons8.com/ios/50/speech-bubble--v1.png" className="w-5 h-5" />
                  Comment
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md transition">
                  <img src="https://img.icons8.com/ios/50/forward-arrow.png" className="w-5 h-5" />
                  Share
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* AUTHENTICITY NOTICE */}
      <div
        ref={noticeRef}
        className={`mt-16 bg-white w-full p-6 md:p-8
          ${showNotice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
      {/* Title */}
      <h2
        className={`text-2xl md:text-3xl font-bold text-black mb-4 transition-all duration-700 ease-out
          ${showNotice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        Authenticity Notice
      </h2>

      {/* Paragraphs */}
      <div className="text-gray-700 space-y-4 text-[15px] leading-relaxed">
        {[
          "It has come to our attention that inferior, counterfeit products are being offered on Amazon under the KittySupps trademark.",
          "Please be aware that KittySupps has never permitted third parties to market or sell our products.",
          "To ensure you're getting genuine KittySupps supplements, always make your purchases directly from ",
        ].map((text, i) => (
          <p
            key={i}
            className={`transition-all duration-700 ease-out delay-${i * 150}ms
              ${showNotice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
            `}
          >
            {i === 2 ? (
              <>
                {text}
                <strong>KittySupps.com</strong>.
              </>
            ) : (
              text
            )}
          </p>
        ))}
      </div>
    </div>

      </div>
    </section>
  );
}