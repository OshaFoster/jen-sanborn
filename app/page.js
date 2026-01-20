"use client";

import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const menuItems = [
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Writings", id: "writings" },
    { label: "Connect", id: "connect" },
  ];

  // Placeholder paintings with varied aspect ratios
  const paintings = [
    { id: 1, aspectRatio: "3/4", title: "Painting 1" },
    { id: 2, aspectRatio: "4/3", title: "Painting 2" },
    { id: 3, aspectRatio: "1/1", title: "Painting 3" },
    { id: 4, aspectRatio: "3/5", title: "Painting 4" },
    { id: 5, aspectRatio: "4/3", title: "Painting 5" },
    { id: 6, aspectRatio: "3/4", title: "Painting 6" },
    { id: 7, aspectRatio: "5/4", title: "Painting 7" },
    { id: 8, aspectRatio: "3/4", title: "Painting 8" },
    { id: 9, aspectRatio: "1/1", title: "Painting 9" },
    { id: 10, aspectRatio: "4/5", title: "Painting 10" },
    { id: 11, aspectRatio: "3/4", title: "Painting 11" },
    { id: 12, aspectRatio: "5/3", title: "Painting 12" },
    { id: 13, aspectRatio: "3/4", title: "Painting 13" },
    { id: 14, aspectRatio: "1/1", title: "Painting 14" },
    { id: 15, aspectRatio: "4/5", title: "Painting 15" },
    { id: 16, aspectRatio: "3/4", title: "Painting 16" },
    { id: 17, aspectRatio: "5/4", title: "Painting 17" },
    { id: 18, aspectRatio: "4/3", title: "Painting 18" },
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
            d="M 12 90
               Q 8 85, 10 78
               Q 14 70, 8 65
               Q 2 60, 6 52
               Q 12 42, 20 48
               Q 25 52, 25 52"
            fill="none"
            stroke="#a0a0a0"
            strokeWidth="0.3"
          />
        </svg>
        <h1 className="font-[family-name:var(--font-megrim)] text-6xl tracking-wide mb-12">
          Jen Sanborn
        </h1>

        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                handleMenuClick(item.id);
              }}
              className="text-sm tracking-widest uppercase hover:text-neutral-500 transition-colors text-left"
            >
              {item.label}
            </button>
          ))}
        </nav>
        {/* Dimming overlay - on top of everything except line */}
        <div
          className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-200 ease-out z-20 ${
            modalOpen ? "opacity-40" : "opacity-0"
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
            d="M 0 52
               Q 8 58, 15 50
               Q 25 38, 40 45
               Q 55 52, 50 68
               Q 45 85, 60 90
               Q 75 95, 70 75
               Q 65 55, 75 40"
            fill="none"
            stroke="#a0a0a0"
            strokeWidth="0.3"
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
                className="w-full bg-neutral-100 cursor-pointer relative group"
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200" />
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
        className={`absolute top-0 right-0 w-3/4 h-full bg-white transform transition-all duration-300 ease-out z-20 ${
          modalOpen ? "translate-x-0 opacity-100 shadow-[-6px_0_50px_rgba(0,0,0,0.15)]" : "translate-x-full opacity-0"
        }`}
      >
        {/* Line drawing - modal portion (spiral continues) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 75 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 52
               Q 8 58, 15 50
               Q 25 38, 40 45
               Q 55 52, 50 68
               Q 45 85, 60 90
               Q 75 95, 70 75
               Q 65 55, 75 40"
            fill="none"
            stroke="#a0a0a0"
            strokeWidth="0.3"
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
            <div className="flex items-center justify-center h-full">
              <div
                style={{ aspectRatio: modalContent.painting.aspectRatio }}
                className="max-h-[80vh] max-w-full bg-neutral-100 border border-neutral-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
