'use client';

import Image from "next/image";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import CountryCurrencySelector from "@/components/CountryCurrencySelector";
import ProductCarousel from "@/components/ProductCarousel";
import FacebookReviews from "@/components/FacebookReviews";
import Results from "@/components/Results";
import { GrCheckboxSelected } from "react-icons/gr";
import './globals.css';
import ScrollToTopButton from "@/components/ScrollToTopButton";


export default function Page() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [forceMobileMenu, setForceMobileMenu] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const footerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const faqRef = useRef<HTMLHeadingElement>(null);
  const [faqVisible, setFaqVisible] = useState(false);
  const taurineRef = useRef<HTMLElement>(null);
  const [taurineVisible, setTaurineVisible] = useState(false);

  const [currency, setCurrency] = useState<{ code: string; symbol: string; rate: number }>({
    code: "USD",
    symbol: "$",
    rate: 1,
  });

  const faqsData = [
    {
      title: "Does taurine supplementation actually work for cats?",
      content: `Yes. Taurine is an essential amino acid that cats cannot produce on their own and must obtain through diet. Studies show that taurine supplementation supports cardiovascular function, retinal health, reproduction, and immune response in cats. Many cat owners notice improvements in energy levels, coat quality, and overall vitality within 2-4 weeks of consistent daily use. However, taurine is a nutritional supplement, not a medication. It works by addressing deficiency, not treating disease.`,
    },
    {
      title: "My cat has kidney disease (CKD). Can taurine help?",
      content: "Cats with CKD are actually at higher risk of taurine-related decline, especially heart complications like HCM, which commonly co-occurs with kidney disease. Taurine is essential for heart muscle function, and since CKD cats are often on restricted diets, supplementing ensures they're not missing this critical amino acid. While taurine isn't a CKD treatment, it's considered an important part of supporting overall health in cats managing kidney disease.",
    },
    {
      title: "My cat vomits frequently. Could taurine help?",
      content: "Taurine plays a role in bile acid production, which helps your cat properly digest fats and reduces GI irritation, one of the common drivers of chronic vomiting in cats. Many cat owners notice improved digestion and less bile vomiting after consistent supplementation. If your cat vomits regularly, it's also worth pairing taurine with our Probiotics to support the gut lining directly.",
    },
    {
      title: "How is this different from the taurine in cat food?",
      content: "Commercial cat food processing destroys up to 50% of naturally occurring taurine through high-heat manufacturing. Even premium brands can't guarantee adequate bioavailable taurine after processing, storage, and exposure to air. KittySupps™ Taurine bypasses this problem entirely—our pharmaceutical-grade powder hasn't been heat-damaged or degraded, so your cat receives the full potency with every scoop. Think of it like fresh vegetables versus canned: both contain nutrients, but one delivers significantly more nutrition per serving.",
    },
    {
      title: "How often should I give KittySupps™ Taurine?",
      content: "Just one scoop of KittySupps™ Taurine mixed into your cat's daily meal provides the essential amino acid support they need. Cats cannot produce taurine on their own, so consistent daily supplementation is key. The unflavored powder mixes into anything—wet food, moistened kibble, bone broth, tuna water, or homemade meals—without changing taste or texture. Most cat owners notice improvements in energy levels, coat quality, and overall vitality within 2-4 weeks. For best results, blend the appropriate dose (based on your cat's weight) thoroughly into your cat's food once daily, and even picky eaters will accept it without hesitation.",
    },
    {
      title: "Is KittySupps™ Taurine safe for cats?",
      content: "KittySupps worked with veterinary nutritionists and feline health experts to ensure that our Taurine supplement is suitable for cats of all sizes and breeds, 12 weeks and older.",
    },
    {
      title: "What if my cat won't eat it?",
      content: 'KittySupps™ Taurine is an unflavored, odorless powder that disappears when thoroughly mixed into any type of food. For extra-picky eaters, start with a tiny amount (⅛ scoop) for 2-3 days, then gradually increase to the full dose. Many customers also find success mixing the powder with a teaspoon of tuna juice or bone broth first, then adding to food. Over 95% of "picky eater" concerns are resolved using these simple techniques.',
    },
    {
      title: "Can I give too much taurine? Is it safe every day?",
      content: "No, you cannot overdose on taurine. Unlike fat-soluble vitamins (A, D, E, K) that accumulate in the body, taurine is water-soluble, meaning any excess your cat doesn't need is simply excreted in urine. This makes daily supplementation completely safe for long-term use.",
    },
    {
      title: "My cat is on a high-quality or raw diet. Does she still need this?",
      content: "Yes, even premium and raw diets benefit from taurine supplementation. Here's why: fresh meat naturally contains taurine, but the moment it's processed, frozen, or exposed to air, taurine begins degrading. Raw feeders often assume their cats get enough, but muscle meat alone (especially chicken and turkey) is relatively low in taurine compared to organ meats like heart and liver. Unless you're feeding fresh, whole prey animals daily, supplementation ensures your cat receives consistent therapeutic levels. Many raw-feeding cat parents use KittySupps as \"nutritional insurance\" to guarantee their cats never experience deficiency, especially important for indoor cats with lower activity levels.",
    },
    {
      title: "What if my cat already seems healthy? Do I really need to add this?",
      content: "Taurine deficiency develops slowly and silently.. by the time symptoms appear (lethargy, vision problems, heart issues), damage has already occurred. Indoor cats, senior cats, and cats on dry-food-heavy diets are especially at risk, even if they \"seem fine.\" Think of taurine like a seatbelt: you don't wait until after the crash. It's nutritional insurance that costs pennies per day but protects against thousands in emergency vet bills.",
    },
  ];

  // Create state array for all 10 FAQs
  const [openIndexes, setOpenIndexes] = useState<boolean[]>(Array(faqsData.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>(Array(faqsData.length).fill(null));

  const toggleFAQ = (index: number) => {
    const newOpen = [...openIndexes];
    newOpen[index] = !newOpen[index];
    setOpenIndexes(newOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!linksRef.current || !containerRef.current) return;
      const linksHeight = linksRef.current.scrollHeight;
      const containerHeight = containerRef.current.clientHeight;
      if (linksHeight > containerHeight) {
        setForceMobileMenu(true);
      } else {
        setForceMobileMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.2 } // trigger when 20% visible
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  const paragraphs = [
    <>
      <strong className="text-white">Email:</strong> supp@kittysupps.com
    </>,
    <>
      <strong className="text-white">Average Response Time:</strong> Under 12 Hours
    </>,
    <>
      <strong className="text-white">Operating Hours Available:</strong> Monday–Friday 9am–5pm EST
    </>
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFaqVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTaurineVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (taurineRef.current) observer.observe(taurineRef.current);

    return () => {
      if (taurineRef.current) observer.unobserve(taurineRef.current);
    };
  }, []);

  return (
    <>
      <ScrollToTopButton />
      {/* Announcement Bar */}
      <div className="bg-[#3d93e9] text-white text-[12px] md:text-[14px] font-bold py-1 px-4">
        <div className="grid grid-cols-3 text-center items-center">
          <span><strong>UP TO 60% OFF + FREE GIFTS</strong></span>
          <span className="border-l border-white"><strong>VETERINARIAN RECOMMENDED</strong></span>
          <span className="border-l border-white"><strong>LIMITED TIME OFFER</strong></span>
        </div>
      </div>

      {/* Navbar - Added safe z-index */}
      <div 
        ref={containerRef} 
        className="flex flex-col md:flex-row border border-gray-300 items-center px-4 md:px-6 py-4 md:py-7 bg-white gap-4 md:gap-6 z-50"
      >
        
        {/* LEFT SIDE */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="md:hidden">
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>

          <div className="flex justify-center md:justify-start">
            <Image src="/images/logo.avif" alt="Logo" width={190} height={40} />
          </div>

          <div className="md:hidden">
            <FiShoppingCart className="text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Desktop Links */}
        {!forceMobileMenu && (
          <div ref={linksRef} className="hidden md:flex items-center space-x-6">
            <span className="cursor-pointer hover:text-blue-500">Shop Taurine</span>
            <span className="cursor-pointer hover:text-blue-500">Best Sellers</span>

            <div className="relative">
              <div
                className={`flex items-center space-x-1 cursor-pointer select-none transition duration-200 hover:text-blue-500
                  ${supportOpen ? "underline" : ""}`}
                onClick={() => setSupportOpen(!supportOpen)}
              >
                <span>Support</span>
                <IoChevronDown
                  className={`text-sm transition-transform duration-200 ${supportOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>

              {supportOpen && (
                <div className="text-[15px] absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 shadow-md z-10 rounded-md flex flex-col space-y-2">
                  <span className="mt-5 block px-4 py-1 hover:text-blue-500 cursor-pointer">
                    Track Your Order
                  </span>
                  <span className="block px-4 py-2 hover:text-blue-500 cursor-pointer">
                    Contact
                  </span>
                </div>
              )}
            </div>

            <span className="cursor-pointer hover:text-blue-500">Manage Subscription</span>
          </div>
        )}

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4 md:ml-auto">
          <CountryCurrencySelector onCurrencyChange={setCurrency} />
          <FiUser className="text-[25px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
          <FiShoppingCart className="text-[25px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" />
        </div>
      </div>

      {/* Mobile Slide Menu - Reliable Version */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 pointer-events-auto
            ${mobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Menu */}
        <div
          className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col justify-between 
            transform transition-transform duration-300 ease-in-out pointer-events-auto
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div>
            <div className="flex justify-end p-4">
              <FiX
                className="text-2xl cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>

            <h2 className="px-6 py-4 text-xl font-bold border-b border-gray-200">Menu</h2>

            <div className="flex flex-col text-[16px] font-medium">
              <span className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:text-blue-500">Shop Taurine</span>
              <span className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:text-blue-500">Best Sellers</span>
              <span className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:text-blue-500">Support</span>
              <span className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:text-blue-500">Manage Subscription</span>
              <span className="flex items-center px-6 py-4 border-b border-gray-200 cursor-pointer hover:text-blue-500">
                <FiUser className="mr-2" /> Log in
              </span>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <CountryCurrencySelector />
          </div>
        </div>
      </div>
      <ProductCarousel selectedCurrency={currency} />
      <FacebookReviews />
      <Results />

      <section className="bg-white text-black py-12 px-4 md:px-16">
        <h2
          ref={faqRef}
          className={`text-3xl md:text-4xl font-bold text-center mb-8 transition-all duration-1000 ease-out
            ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqsData.map((faq, idx) => (
            <div key={idx} className="overflow-hidden border-b border-gray-300">
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center px-4 py-3 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-black">
                    <GrCheckboxSelected size={20} />
                  </span>
                  <h3 className="text-sm md:text-base font-semibold hover:underline">{faq.title}</h3>
                </div>

                <div
                  className="transition-transform duration-300"
                  style={{ transform: openIndexes[idx] ? "rotate(180deg)" : "rotate(0deg)" }}
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

              {/* Collapsible content */}
              <div
                ref={(el) => { refs.current[idx] = el; }} // <-- fixed
                className="overflow-hidden transition-all duration-500 ease-in-out text-[#121212e6]"
                style={{ maxHeight: openIndexes[idx] ? `${refs.current[idx]?.scrollHeight}px` : "0px" }}
              >
                <div className="px-4 pb-4 text-sm md:text-base space-y-4 whitespace-pre-line">
                  {faq.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={taurineRef}
        className={`bg-white py-12 px-4 md:px-16 transition-all duration-1000 ease-out
          ${taurineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <div className="flex flex-col md:flex-row items-center gap-15">
          
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/cat.webp"
              alt="Cat"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-1/2 text-start space-y-4">
            <h2 className="text-2xl md:text-5xl font-bold text-black">Daily Taurine</h2>
            <h3 className="text-2xl md:text-5xl font-bold text-[#1284f7]">Made Simple</h3>

            <p className="text-base md:text-1xl text-[#121212e6]">
              Just one scoop of KittySupps Taurine mixed into your cat’s food provides the essential taurine their body can’t make on its own. Perfect for cats on grain-free, fish, rabbit, raw, or homemade diets.
            </p>

            <p className="text-base md:text-1xl space-y-2 text-[#121212e6]">
              - Supports healthy vision and heart function<br /><br />
              - Tasteless, odorless, and easy to mix in food<br /><br />
              - Water-soluble, safe daily use, no risk of overdose
            </p>

            <p className="text-base md:text-1xl text-[#121212e6]">
              Give your cat complete nutrition in 10 seconds a day — and enjoy the peace of mind that comes with knowing you’ll never have to say, "If only I had known."
            </p>
          </div>
        </div>
      </section>

      <div className="relative w-full overflow-hidden text-center bg-gray-100 overflow-x-hidden">
        {/* Black Waves */}
        <div className="waves relative w-full h-[15vh] min-h-[100px] max-h-[150px] -mb-7 overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="black-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#black-wave" x="48" y="0" fill="rgba(0, 0, 0, 0.7)" />
              <use href="#black-wave" x="48" y="3" fill="rgba(0, 0, 0, 0.5)" />
              <use href="#black-wave" x="48" y="5" fill="rgba(0, 0, 0, 0.3)" />
              <use href="#black-wave" x="48" y="7" fill="#121212" />
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
            `}
        </style>
      </div>

      <section className="bg-[#121212] text-white py-16 px-4 md:px-16">
        <div
          ref={footerRef}
          className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-12 items-start
          transition-all duration-1000 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {/* Column 1: Logo */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/images/logo2.avif"
              alt="KittySupps Logo"
              className="w-40 md:w-48 h-auto object-contain"
            />
          </div>

          {/* Column 2: Newsletter / Sign Up */}
          <div className="flex flex-col items-start space-y-6 w-full">
            <h2 className="text-white text-3xl md:text-4xl font-bold text-start">
              Join KittySupps Club!
            </h2>

            <p className="text-[#ffffffcc] text-base md:text-lg text-start">
              Recieve daily blog posts from fellow Cat lovers now for free!
            </p>

            <div className="flex flex-col w-full max-w-xl gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 text-white rounded border border-[#ffffffcc] focus:outline-none focus:border-white placeholder-[#ffffffcc]"
              />

              <button className="relative overflow-hidden w-full bg-white  text-[#121212] font-bold py-3 rounded-md border-2 border-white transition active:scale-[0.98] group">
                
                {/* LEFT TRAIN */}
                <span className="absolute left-0 top-0 h-full w-1/2 bg-[#121212] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

                {/* RIGHT TRAIN */}
                <span className="absolute right-0 top-0 h-full w-1/2 bg-[#121212] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

                {/* TEXT */}
                <span className="relative z-10 group-hover:text-white transition">
                  Sign Up
                </span>
              </button>
            </div>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-[#ffffffe6] text-2xl font-bold">NEED A HAND?</h2>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="hover:underline">Shipping & Delivery</a>
                <a href="#" className="hover:underline">Refunds & Exchange</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Manage Subscription</a>
                <a href="#" className="hover:underline">Blog</a>
              </nav>
          </div>
        </div>

        {/* Contact Section */}
        <div
          ref={contactRef}
          className={`mt-16 max-w-7xl mx-auto text-start space-y-4
            transition-all duration-1000 ease-out
            ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <h2 className={`text-white text-3xl font-bold transition-all duration-1000 ease-out
            ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Contact US
          </h2>

          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`text-[#ffffffcc] text-base md:text-lg transition-all duration-1000 ease-out
                ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
              `}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className=" mt-16 border-t border-[#ffffffcc] -mx-4 md:-mx-16" />

        {/* Payment Cards */}
        <div className="mt-8 max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6">
          <img src="/images/cards/american-express.png" className="h-8 object-contain" />
          <img src="/images/cards/apple-pay.svg" className="h-9 object-contain" />
          <img src="/images/cards/Bancontact.svg" className="h-8 object-contain" />
          <img src="/images/cards/google-pay.svg" className="h-8 object-contain" />
          <img src="/images/cards/Shop.png" className="h-6 object-contain" />
          <img src="/images/cards/union.svg" className="h-8 object-contain" />
          <img src="/images/cards/visa.png" className="h-8 object-contain" />
          <img src="/images/cards/mastercard.svg" className="h-8 object-contain" />
        </div>

        {/* Copyright */}
        <div className="mt-3 text-center text-[12px] text-[#ffffffcc]">
          © 2026, KittySupps
        </div>

        {/* Big Gap */}
        <div className="mt-16" />

        {/* Disclaimer */}
        <div className="text-[11px] max-w-1xl mx-auto text-start text-xs text-[#ffffffcc] leading-relaxed space-y-2">
          <p>The information contained within this site is not intended as a substitute for professional medical or veterinary advice. KittySupps is not intended to diagnose, treat, cure or prevent any disease. If your pet has, or you suspect your pet has any medical condition, you are urged to consult your veterinarian. Medical conditions can only be diagnosed by a licensed veterinarian. These statements have not been evaluated by the Food and Drug Administration. Results may vary. Not intended for human consumption. Please consult your veterinarian regarding any change in treatment or supplementation.</p>
        </div>
      </section>
    </>
  );
}