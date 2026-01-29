import { urlFor } from "../lib/sanity";
import ScrollReveal from "./ScrollReveal";

// Extract YouTube video ID from URL
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function BlogList({ posts, onSelectPost }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        const imageUrl = urlFor(post.previewImage);
        const youtubeId = getYouTubeId(post.videoUrl);
        const thumbnailUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : imageUrl;
        const isVideo = !!youtubeId;

        const date = post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null;

        return (
          <ScrollReveal key={post._id} delay={index * 100}>
            <article
              onClick={() => onSelectPost(post)}
              className="cursor-pointer group"
            >
            {/* Thumbnail */}
            {thumbnailUrl && (
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-3 relative">
                <img
                  src={thumbnailUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play icon for video posts */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div>
              <h3 className="font-[family-name:var(--font-megrim)] text-xl text-neutral-800 group-hover:text-[#AB622C] transition-colors">
                {post.title}
              </h3>
              {date && (
                <time className="text-sm text-neutral-400 block mt-1">
                  {date}
                </time>
              )}
              {post.excerpt && (
                <p className="text-neutral-600 text-sm mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
