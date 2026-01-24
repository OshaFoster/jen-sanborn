"use client";

import { useState, useEffect } from "react";
import paintings from "@/data/paintings.json";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const menuItems = [
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Artist's Notes", id: "writings" },
  ];

  const handleMenuClick = (id) => {
    setMenuOpen(false); // Close mobile menu
    if (modalOpen) {
      closeModal();
    } else if (id !== "portfolio") {
      setModalContent(id);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen relative overflow-hidden">
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-start px-6 py-4 z-50">
        <div>
          <h1 className="font-[family-name:var(--font-megrim)] text-4xl tracking-wide">
            Jen Sanborn
          </h1>
          <span className="text-xs tracking-[0.3em] uppercase text-[#c0c0c0]">
            Artist
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-neutral-600"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar - 25% on desktop, full overlay on mobile */}
      <aside
        onClick={() => modalOpen && closeModal()}
        className={`
          md:w-1/4 md:h-full md:flex md:flex-col md:pt-16 md:px-8 md:pb-8 md:relative md:translate-x-0 md:z-10
          fixed inset-0 z-40 bg-white flex flex-col pt-28 px-6 pb-8 transform transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:cursor-pointer
        `}
      >
        {/* Line drawing - sidebar portion (spiral) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          viewBox="0 0 25 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 5 95
               Q 20 85, 15 70
               Q 10 55, 20 45
               Q 25 40, 25 40"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="0.5"
          />
        </svg>
        <h1 className="hidden md:block font-[family-name:var(--font-megrim)] text-4xl lg:text-6xl tracking-wide mb-2">
          Jen Sanborn
        </h1>
        <span className="hidden md:block text-sm tracking-[0.4em] uppercase text-[#c0c0c0] mb-12">
          Artist
        </span>

        <nav className="flex flex-col gap-8 md:gap-6">
          {menuItems.map((item) => {
            const isActive =
              (item.id === "portfolio" && !modalOpen) ||
              (modalOpen && modalContent === item.id);
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClick(item.id);
                }}
                className={`text-lg md:text-sm tracking-widest uppercase hover:text-neutral-500 transition-colors text-left pb-1 w-fit ${
                  isActive ? "border-b border-neutral-300" : ""
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Shop button */}
        <a
          href="https://www.etsy.com/shop/sanbornstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-4 py-2 text-sm tracking-widest uppercase border border-[#AB622C] text-[#AB622C] hover:bg-[#AB622C] hover:text-white transition-all w-fit"
        >
          Shop
        </a>

        {/* Social icons */}
        <div className="mt-4 flex gap-3">
          <a
            href="https://www.instagram.com/jensanborn_artist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="mailto:Jen@sanbornstudio.com"
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
          </a>
        </div>

        {/* Bird illustration */}
        <img
          src="/assets/bird.png"
          alt=""
          className={`absolute bottom-[44px] left-8 w-24 z-40 transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-80' : 'opacity-0'
          }`}
        />

        {/* Dimming overlay - on top of everything except line */}
        <div
          className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-200 ease-out z-20 ${
            modalOpen ? "opacity-35" : "opacity-0"
          }`}
          style={{ transitionDelay: modalOpen ? "250ms" : "0ms" }}
        />
      </aside>

      {/* Gallery Section - 75% on desktop, full on mobile */}
      <main className="w-full md:w-3/4 h-full relative flex-1">
        {/* Line drawing - gallery portion (spiral continues) - fixed */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 75 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 40
               Q 15 30, 30 40
               Q 50 55, 40 75
               Q 30 90, 50 95
               Q 70 100, 75 80
               Q 80 60, 60 45
               Q 40 30, 55 15
               Q 70 0, 75 10"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="0.5"
          />
        </svg>
        <div className="h-full overflow-y-auto p-6 md:p-8 lg:p-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 md:gap-8 relative z-10">
          {paintings.map((painting, index) => (
            <div
              key={painting.id}
              className={`break-inside-avoid mb-8 md:mb-10 transition-all duration-1000 ease-out ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${400 + index * 150}ms`
              }}
            >
              <div
                onClick={() => {
                  setModalContent({ type: "painting", painting });
                  setModalOpen(true);
                }}
                style={{ aspectRatio: painting.aspectRatio }}
                className="w-full bg-neutral-100 cursor-pointer relative group rounded overflow-hidden"
              >
                {painting.image && (
                  <img
                    src={painting.image}
                    alt={painting.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-md tracking-wide text-white">{painting.title}</span>
                  {painting.size && <span className="text-sm tracking-wide text-white mt-1">{painting.size}</span>}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      <div
        className={`absolute top-0 right-0 w-full md:w-3/4 h-full bg-[#fafafa] transform transition-all duration-300 ease-in-out z-50 md:z-20 rounded-none md:rounded-l-lg overflow-hidden will-change-transform ${
          modalOpen ? "translate-x-0 opacity-100 shadow-[-10px_0_60px_rgba(0,0,0,0.2)]" : "translate-x-full opacity-0 shadow-none"
        }`}
      >
        {/* Line drawing - modal portion (spiral continues) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 75 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 40
               Q 15 30, 30 40
               Q 50 55, 40 75
               Q 30 90, 50 95
               Q 70 100, 75 80
               Q 80 60, 60 45
               Q 40 30, 55 15
               Q 70 0, 75 10"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="0.5"
          />
        </svg>
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-700 transition-colors z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-4 md:p-8 h-full overflow-y-auto relative z-10 overscroll-contain">
          {modalContent === "about" && (
            <div className="max-w-xl mx-auto pt-16 pb-40 text-center">
              <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8">About Me</h2>
              <img
                src="/assets/jen.jpg"
                alt="Jen Sanborn"
                className="w-64 h-44 md:w-80 md:h-56 rounded-2xl object-cover mx-auto my-8 md:my-12 border-[3px] border-[#d2dcff]"
              />
              <div className="text-neutral-600 space-y-4">
                <p>
                  I'm a contemporary oil painter whose work explores the delicate
                  relationship between nature and the human spirit. Working primarily in oils,
                  I create luminous pieces that capture fleeting moments of beauty in the
                  natural world.
                </p>
                <p>
                  Based in the American Southwest, I draw inspiration from the landscapes,
                  wildlife, and quiet moments that surround me. My paintings invite viewers
                  to pause and find connection in the everyday sacred.
                </p>
              </div>

              <div className="mt-8 md:mt-12 pt-8 border-t border-[#e0e0e0]">
                <h3 className="font-[family-name:var(--font-megrim)] text-2xl mb-4">Connect</h3>
                <div className="text-neutral-600 space-y-2">
                  <p>
                    <a href="mailto:Jen@sanbornstudio.com" className="text-[#AB622C] hover:text-[#a8854f] transition-colors">Jen@sanbornstudio.com</a>
                  </p>
                </div>
              </div>
            </div>
          )}
          {modalContent === "writings" && (
            <div>
              <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8">Artist's Notes</h2>
              <p className="text-neutral-600">Blog posts will go here...</p>
            </div>
          )}
                    {modalContent?.type === "painting" && (
            <div
              key={modalContent.painting.id}
              className="flex items-center justify-center h-full relative animate-[fadeIn_0.3s_ease-out_forwards]"
              style={{ opacity: 0 }}
            >
              {/* Previous arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = paintings.findIndex(p => p.id === modalContent.painting.id);
                  const prevIndex = currentIndex === 0 ? paintings.length - 1 : currentIndex - 1;
                  setModalContent({ type: "painting", painting: paintings[prevIndex] });
                }}
                className="absolute left-4 p-2 text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Painting */}
              <div className="flex flex-col items-center gap-3 h-full justify-center">
                <span className="font-[family-name:var(--font-megrim)] text-2xl text-neutral-700">{modalContent.painting.title}</span>
                <div
                  style={{ aspectRatio: modalContent.painting.aspectRatio }}
                  className={`bg-neutral-100 border border-neutral-200 rounded overflow-hidden ${
                    (() => {
                      const size = modalContent.painting.size || '';
                      const match = size.match(/(\d+)"?\s*x\s*(\d+)/i);
                      if (match) {
                        const height = parseInt(match[2], 10);
                        if (height >= 30) return 'h-[80vh]';
                      }
                      return 'h-[60vh]';
                    })()
                  }`}
                >
                  {modalContent.painting.image && (
                    <img
                      src={modalContent.painting.image}
                      alt={modalContent.painting.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#AB622C]">
                  {modalContent.painting.medium && <span>{modalContent.painting.medium}</span>}
                  {modalContent.painting.medium && modalContent.painting.size && <span>·</span>}
                  {modalContent.painting.size && <span>{modalContent.painting.size}</span>}
                  {modalContent.painting.sold && <span className="ml-2 uppercase tracking-wider text-xs">Sold</span>}
                </div>
              </div>

              {/* Next arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = paintings.findIndex(p => p.id === modalContent.painting.id);
                  const nextIndex = currentIndex === paintings.length - 1 ? 0 : currentIndex + 1;
                  setModalContent({ type: "painting", painting: paintings[nextIndex] });
                }}
                className="absolute right-4 p-2 text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
