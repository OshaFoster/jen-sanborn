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
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const videoEmbedUrl = getVideoEmbedUrl(post.videoUrl);

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

      {/* Content first */}
      {post.content && (
        <div className="prose-custom mb-8">
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
        </div>
      )}

      {/* Media at bottom: Images and/or Video */}
      {(videoEmbedUrl || (post.images && post.images.length > 0)) && (
        <div className="mt-8 pt-6 border-t border-neutral-200 space-y-6">
          {/* Video */}
          {videoEmbedUrl && (
            <div className="aspect-video max-w-md">
              <iframe
                src={videoEmbedUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
              />
            </div>
          )}

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {post.images.map((image, index) => {
                const imageUrl = urlFor(image);
                if (!imageUrl) return null;

                return (
                  <figure key={index} className="w-32">
                    <img
                      src={imageUrl}
                      alt={image.alt || post.title}
                      className="w-full h-24 object-cover rounded"
                    />
                    {image.caption && (
                      <figcaption className="text-xs text-neutral-500 mt-1 italic">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
