"use client";

import { useState } from "react";
import paintings from "@/data/paintings.json";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const menuItems = [
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Writings", id: "writings" },
    { label: "Connect", id: "connect" },
  ];

  const handleMenuClick = (id) => {
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
    <div className="flex h-screen w-screen relative overflow-hidden">
      {/* Sidebar - 25% */}
      <aside
        onClick={() => modalOpen && closeModal()}
        className="w-1/4 h-full flex flex-col pt-16 px-8 pb-8 cursor-pointer relative z-10 bg-white"
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
        <h1 className="font-[family-name:var(--font-megrim)] text-6xl tracking-wide mb-2">
          Jen Sanborn
        </h1>
        <span className="text-sm tracking-[0.4em] uppercase text-[#c0c0c0] mb-12 block">
          Artist
        </span>

        <nav className="flex flex-col gap-4">
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
                className={`text-sm tracking-widest uppercase hover:text-neutral-500 transition-colors text-left pb-1 w-fit ${
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
          href="https://www.etsy.com/shop/YOURSHOP"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-4 py-2 text-sm tracking-widest uppercase border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-all w-fit"
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
        </div>

        {/* Bird illustration */}
        <img
          src="/assets/bird.png"
          alt=""
          className="absolute bottom-[44px] left-8 w-24 opacity-80 z-40"
        />

        {/* Dimming overlay - on top of everything except line */}
        <div
          className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-200 ease-out z-20 ${
            modalOpen ? "opacity-35" : "opacity-0"
          }`}
          style={{ transitionDelay: modalOpen ? "250ms" : "0ms" }}
        />
      </aside>

      {/* Gallery Section - 75% */}
      <main className="w-3/4 h-full relative">
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
        <div className="h-full overflow-y-auto p-16">
          <div className="columns-4 gap-8 relative z-10">
          {paintings.map((painting) => (
            <div
              key={painting.id}
              className="break-inside-avoid mb-10"
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
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs tracking-wide text-white">{painting.title}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      <div
        className={`absolute top-0 right-0 w-3/4 h-full bg-[#fafafa] transform transition-all duration-300 ease-in-out z-20 rounded-l-lg overflow-hidden will-change-transform ${
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
        {/* Modal content */}
        <div className="p-8 h-full overflow-y-auto relative z-10">
          {modalContent === "about" && (
            <div>
              <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8">About</h2>
              <p className="text-neutral-600">About content goes here...</p>
            </div>
          )}
          {modalContent === "writings" && (
            <div>
              <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8">Writings</h2>
              <p className="text-neutral-600">Blog posts will go here...</p>
            </div>
          )}
          {modalContent === "connect" && (
            <div>
              <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8">Connect</h2>
              <p className="text-neutral-600">Contact information goes here...</p>
            </div>
          )}
          {modalContent?.type === "painting" && (
            <div className="flex items-center justify-center h-full relative">
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
              <div className="flex flex-col items-center gap-4 h-full justify-center">
                <span className="font-[family-name:var(--font-megrim)] text-2xl text-neutral-700">{modalContent.painting.title}</span>
                <div
                  style={{ aspectRatio: modalContent.painting.aspectRatio }}
                  className="bg-neutral-100 border border-neutral-200 rounded h-[60vh] overflow-hidden"
                >
                  {modalContent.painting.image && (
                    <img
                      src={modalContent.painting.image}
                      alt={modalContent.painting.title}
                      className="w-full h-full object-cover"
                    />
                  )}
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
