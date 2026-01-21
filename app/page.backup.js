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
    { id: 19, aspectRatio: "3/4", title: "Painting 19" },
    { id: 20, aspectRatio: "1/1", title: "Painting 20" },
    { id: 21, aspectRatio: "4/5", title: "Painting 21" },
    { id: 22, aspectRatio: "5/4", title: "Painting 22" },
    { id: 23, aspectRatio: "3/4", title: "Painting 23" },
    { id: 24, aspectRatio: "4/3", title: "Painting 24" },
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
            stroke="#c5c5c5"
            strokeWidth="0.3"
          />
        </svg>
        <h1 className="font-[family-name:var(--font-megrim)] text-6xl tracking-wide mb-12">
          Jen Sanborn
        </h1>

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
            stroke="#c5c5c5"
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
                className="w-full bg-neutral-100 cursor-pointer relative group rounded overflow-hidden"
              >
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
        className={`absolute top-0 right-0 w-3/4 h-full bg-white transform transition-all duration-300 ease-out z-20 rounded-l-lg ${
          modalOpen ? "translate-x-0 opacity-100 shadow-[-10px_0_60px_rgba(0,0,0,0.2)]" : "translate-x-full opacity-0"
        }`}
      >
        {/* Line drawing - modal portion (spiral continues) */}
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
            stroke="#c5c5c5"
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
            <div className="flex items-center justify-center h-full relative">
              {/* Previous arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = paintings.findIndex(p => p.id === modalContent.painting.id);
                  const prevIndex = currentIndex === 0 ? paintings.length - 1 : currentIndex - 1;
                  setModalContent({ type: "painting", painting: paintings[prevIndex] });
                }}
                className="absolute left-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Painting */}
              <div className="flex flex-col items-center gap-4 h-full justify-center">
                <div
                  style={{ aspectRatio: modalContent.painting.aspectRatio }}
                  className="bg-neutral-100 border border-neutral-200 rounded h-[70vh]"
                />
                <span className="font-[family-name:var(--font-megrim)] text-2xl text-neutral-500">{modalContent.painting.title}</span>
              </div>

              {/* Next arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = paintings.findIndex(p => p.id === modalContent.painting.id);
                  const nextIndex = currentIndex === paintings.length - 1 ? 0 : currentIndex + 1;
                  setModalContent({ type: "painting", painting: paintings[nextIndex] });
                }}
                className="absolute right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
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
