import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanity";
import { portableTextComponents } from "./PortableTextComponents";

// Extract video embed URL from YouTube or Vimeo
function getVideoEmbedUrl(url) {
  if (!url) return null;

  // YouTube (including Shorts)
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export default function BlogPost({ post, onBack }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const videoEmbedUrl = getVideoEmbedUrl(post.videoUrl);

  // Split images: first one is hero, rest go to gallery
  const heroImage = post.images?.[0];
  const heroImageUrl = heroImage ? urlFor(heroImage) : null;
  const additionalImages = post.images?.slice(1) || [];

  return (
    <article className="max-w-2xl">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors mb-6"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-sm uppercase tracking-wider">Back to posts</span>
      </button>

      {/* Header */}
      <header className="mb-6">
        <h1 className="font-[family-name:var(--font-megrim)] text-4xl text-neutral-800 mb-2">
          {post.title}
        </h1>
        {date && <time className="text-sm text-neutral-400">{date}</time>}
      </header>

      {/* Hero: Video or First Image (large) */}
      {videoEmbedUrl ? (
        <div className="aspect-video w-full mb-8">
          <iframe
            src={videoEmbedUrl}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video"
          />
        </div>
      ) : heroImageUrl ? (
        <figure className="mb-8">
          <div
            className="rounded-lg overflow-hidden bg-neutral-100 cursor-pointer"
            onClick={() => setLightboxImage({ url: heroImageUrl, alt: heroImage.alt, caption: heroImage.caption })}
          >
            <img
              src={heroImageUrl}
              alt={heroImage.alt || post.title}
              className="w-full h-auto"
            />
          </div>
          {heroImage.caption && (
            <figcaption className="text-sm text-neutral-500 mt-2 italic">
              {heroImage.caption}
            </figcaption>
          )}
        </figure>
      ) : null}

      {/* Content */}
      {post.content && (
        <div className="prose-custom mb-8">
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
        </div>
      )}

      {/* Additional Images (smaller gallery) */}
      {additionalImages.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {additionalImages.map((image, index) => {
              const imageUrl = urlFor(image);
              if (!imageUrl) return null;

              return (
                <figure key={index}>
                  <div
                    className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setLightboxImage({ url: imageUrl, alt: image.alt, caption: image.caption })}
                  >
                    <img
                      src={imageUrl}
                      alt={image.alt || post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="text-xs text-neutral-500 mt-1 italic">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      )}

      {/* Share & Connect */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-neutral-500 mb-3">Share this post</p>
            <div className="flex gap-3">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}&quote=${encodeURIComponent(post.title + ' - Jen Sanborn')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#1877F2] hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* X/Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}&text=${encodeURIComponent(post.title + ' by Jen Sanborn')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-[#0A66C2] hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
            </div>
          </div>

          {/* Connect with Jen */}
          <a
            href="mailto:Jen@sanbornstudio.com"
            className="flex items-center gap-2 text-sm text-[#AB622C] hover:text-[#8a4e23] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            Connect with Jen
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-8 animate-[fadeIn_0.2s_ease-out_forwards]"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative flex flex-col items-center gap-3 animate-[fadeIn_0.3s_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-2 -right-2 p-2 text-neutral-500 hover:text-neutral-700 transition-colors bg-white rounded-full shadow-md z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Image */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden shadow-xl">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.alt || post.title}
                className="max-w-[85vw] max-h-[75vh] object-contain"
              />
            </div>

            {/* Caption */}
            {lightboxImage.caption && (
              <p className="text-neutral-600 text-sm italic">{lightboxImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
