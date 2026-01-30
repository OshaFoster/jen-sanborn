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

// Group posts by month/year
function groupPostsByMonth(posts) {
  const groups = {};

  posts.forEach((post) => {
    const date = new Date(post.publishedAt || post._createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
    const label = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    if (!groups[key]) {
      groups[key] = { label, posts: [] };
    }
    groups[key].posts.push(post);
  });

  // Return sorted by key (newest first)
  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, group]) => group);
}

export default function BlogList({ posts, onSelectPost }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">No posts yet. Check back soon!</p>
      </div>
    );
  }

  const groupedPosts = groupPostsByMonth(posts);
  let globalIndex = 0;

  return (
    <div className="space-y-10">
      {groupedPosts.map((group) => (
        <div key={group.label}>
          <h3 className="font-[family-name:var(--font-megrim)] text-xl text-neutral-600 mb-4 border-b border-neutral-200 pb-2">
            {group.label}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {group.posts.map((post) => {
              const imageUrl = urlFor(post.previewImage);
              const youtubeId = getYouTubeId(post.videoUrl);
              const youtubeThumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null;

              const hasVideo = !!youtubeId;
              const thumbnailUrl = youtubeThumbnail || imageUrl;

              const date = post.publishedAt || post._createdAt
                ? new Date(post.publishedAt || post._createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : null;

              const currentIndex = globalIndex++;

              return (
                <ScrollReveal key={post._id} delay={currentIndex < 6 ? currentIndex * 100 : 0}>
                  <article
                    onClick={() => onSelectPost(post)}
                    className="cursor-pointer group bg-white/80 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 mb-3 relative">
                      {thumbnailUrl ? (
                        <>
                          <img
                            src={thumbnailUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {hasVideo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#968881" strokeWidth="1">
                            <path d="M12 19l7-7 3 3-7 7-3-3z" />
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                            <path d="M2 2l7.586 7.586" />
                            <circle cx="11" cy="11" r="2" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-[family-name:var(--font-megrim)] text-lg text-neutral-800 group-hover:text-[#AB622C] transition-colors leading-tight">
                        {post.title}
                      </h3>
                      {date && (
                        <time className="text-xs text-neutral-400 block mt-1">
                          {date}
                        </time>
                      )}
                      {post.excerpt && (
                        <p className="text-neutral-600 text-sm mt-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="text-xs text-[#AB622C] mt-2 inline-block group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
