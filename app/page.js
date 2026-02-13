"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPosts, getPost, getPaintings } from "./lib/sanity";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import ScrollReveal from "./components/ScrollReveal";

function HomeContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postsLoading, setPostsLoading] = useState(false);
  const [paintings, setPaintings] = useState([]);
  const modalContentRef = useRef(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
    getPaintings().then((data) => setPaintings(data || []));
  }, []);

  // Handle URL-based post loading on mount
  useEffect(() => {
    const postSlug = searchParams.get("post");
    if (postSlug && !selectedPost) {
      // Open writings modal and load the post
      setModalContent("writings");
      setModalOpen(true);
      getPost(postSlug).then((fullPost) => {
        if (fullPost) {
          setSelectedPost(fullPost);
        }
      });
    }
  }, [searchParams]);

  // Fetch blog posts when writings modal opens (always refetch for fresh data)
  useEffect(() => {
    if (modalContent === "writings") {
      setPostsLoading(true);
      getPosts()
        .then((data) => {
          setPosts(data || []);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
        })
        .finally(() => {
          setPostsLoading(false);
        });
    }
  }, [modalContent]);

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
    setSelectedPost(null);
    // Clear URL if there's a post param
    if (searchParams.get("post")) {
      router.push("/", { scroll: false });
    }
  };

  const handleSelectPost = async (post) => {
    // Fetch full post data including content
    const fullPost = await getPost(post.slug.current);
    setSelectedPost(fullPost);
    // Update URL with post slug
    router.push(`/?post=${post.slug.current}`, { scroll: false });
    // Scroll modal to top
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    // Clear URL param
    router.push("/", { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row h-dvh w-screen relative overflow-hidden">
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-start px-6 py-4 z-50">
        <div>
          <h1 className="font-[family-name:var(--font-megrim)] text-4xl tracking-wide">
            Jen Sanborn
          </h1>
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a832]">
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
          md:w-1/4 md:h-full md:flex md:flex-col md:pt-16 md:px-8 md:pb-8 md:relative md:translate-x-0 md:z-10 md:overflow-visible
          fixed inset-0 z-40 bg-white flex flex-col pt-28 px-6 pb-8 transform transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:cursor-pointer
        `}
      >
        {/* Line drawing - sidebar portion (spiral) */}
        <svg
          className="absolute inset-0 w-[103%] h-full pointer-events-none z-30 overflow-visible"
          viewBox="0 0 26 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 5 95
               Q 20 85, 15 70
               Q 10 55, 20 45
               Q 26 40, 26 40"
            fill="none"
            stroke="#c4e0ff"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="hidden md:block font-[family-name:var(--font-megrim)] text-4xl lg:text-6xl tracking-wide mb-2">
          Jen Sanborn
        </h1>
        <span className="hidden md:block text-sm tracking-[0.4em] uppercase text-[#c9a832] mb-12">
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
          href="https://www.etsy.com/shop/sanbornstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-4 py-2 text-sm tracking-widest uppercase border border-[#8a4734] text-[#8a4734] hover:bg-[#8a4734] hover:text-white transition-all w-fit"
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://jensanborn.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16M4 9h16M4 14v6l8-4.5L20 20v-6H4z" />
            </svg>
          </a>
          <a
            href="mailto:Jen@sanbornstudio.com"
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
            d="M -2.2 42
               Q 15 30, 30 40
               Q 50 55, 40 75
               Q 30 90, 50 95
               Q 70 100, 75 80
               Q 80 60, 60 45
               Q 40 30, 55 15
               Q 70 0, 75 10"
            fill="none"
            stroke="#c4e0ff"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="h-full overflow-y-auto p-6 pb-16 md:p-8 lg:p-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 md:gap-8 relative z-10">
          {paintings.map((painting, index) => (
            <ScrollReveal
              key={painting._id}
              delay={index < 8 ? index * 100 : 0}
              className="break-inside-avoid mb-8 md:mb-10"
            >
              <div
                onClick={() => {
                  setModalContent({ type: "painting", painting });
                  setModalOpen(true);
                }}
                style={{ aspectRatio: painting.aspectRatio }}
                className="w-full bg-neutral-100 cursor-pointer relative group rounded overflow-hidden"
              >
                {painting.imageUrl && (
                  <img
                    src={painting.imageUrl}
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
            </ScrollReveal>
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
            d="M -2 42
               Q 15 30, 30 40
               Q 50 55, 40 75
               Q 30 90, 50 95
               Q 70 100, 75 80
               Q 80 60, 60 45
               Q 40 30, 55 15
               Q 70 0, 75 10"
            fill="none"
            stroke="#c4e0ff"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Close button - mobile only, hidden when viewing blog detail */}
        {!(modalContent === "writings" && selectedPost) && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-700 transition-colors z-20 md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        )}

        {/* Modal content */}
        <div ref={modalContentRef} className="p-4 pb-16 md:p-8 h-full overflow-y-auto relative z-10 overscroll-contain">
          {modalContent === "about" && (
            <div className="max-w-2xl mx-auto mt-8 p-8 bg-white/80 rounded-lg shadow-sm text-center">
              <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8 md:mb-[3vh] lg:mb-8">About Me</h2>
              <img
                src="/assets/jen.jpg"
                alt="Jen Sanborn"
                className="w-64 h-44 md:w-72 md:h-48 lg:w-80 lg:h-56 rounded-2xl object-cover mx-auto my-8 md:my-[3vh] lg:my-12 border-[3px] border-[#d2dcff]"
              />
              <div className="text-neutral-600 space-y-4 md:space-y-3 lg:space-y-4">
                <p>
                  I'm a contemporary oil painter whose work explores the delicate
                  relationship between nature and the human spirit. Working primarily in oils,
                  I create luminous pieces that capture fleeting moments of beauty in the
                  natural world.
                </p>
                <p>
                  Based in the American West, I draw inspiration from the landscapes,
                  wildlife, and quiet moments that surround me. My paintings invite viewers
                  to pause and find connection in these moments of Grace.
                </p>
              </div>

              <div className="mt-6 md:mt-[4vh] lg:mt-12 pt-8 md:pt-[3vh] lg:pt-8 border-t border-[#e0e0e0]">
                <h3 className="font-[family-name:var(--font-megrim)] text-2xl mb-4 md:mb-3 lg:mb-4">Connect</h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.instagram.com/jensanborn_artist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c9a832] hover:text-[#a8891a] transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href="https://jensanborn.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c9a832] hover:text-[#a8891a] transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16M4 9h16M4 14v6l8-4.5L20 20v-6H4z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:Jen@sanbornstudio.com"
                    className="text-[#c9a832] hover:text-[#a8891a] transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
          {modalContent === "writings" && (
            <div className="max-w-4xl mx-auto my-8 px-4">
              {selectedPost ? (
                <BlogPost
                  post={selectedPost}
                  onBack={handleBackToList}
                />
              ) : (
                <>
                  <h2 className="font-[family-name:var(--font-megrim)] text-4xl mb-8">
                    Artist's Notes
                  </h2>
                  {postsLoading ? (
                    <div className="text-center py-12">
                      <p className="text-neutral-500">Loading posts...</p>
                    </div>
                  ) : (
                    <BlogList
                      posts={posts}
                      onSelectPost={handleSelectPost}
                    />
                  )}
                </>
              )}
            </div>
          )}
                    {modalContent?.type === "painting" && (
            <div
              key={modalContent.painting._id}
              className="flex items-center justify-center h-full relative animate-[fadeIn_0.3s_ease-out_forwards]"
              style={{ opacity: 0 }}
            >
              {/* Previous arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = paintings.findIndex(p => p._id === modalContent.painting._id);
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
              <div className="flex flex-col items-center gap-3 justify-center bg-white/80 rounded-lg shadow-sm p-6">
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
                  {modalContent.painting.imageUrl && (
                    <img
                      src={modalContent.painting.imageUrl}
                      alt={modalContent.painting.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8a4734]">
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
                  const currentIndex = paintings.findIndex(p => p._id === modalContent.painting._id);
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

export default function Home() {
  return (
    <Suspense fallback={<div className="h-dvh w-screen" />}>
      <HomeContent />
    </Suspense>
  );
}
