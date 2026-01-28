import { urlFor } from "../lib/sanity";

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
      {posts.map((post) => {
        const imageUrl = urlFor(post.previewImage);
        const date = post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : null;

        return (
          <article
            key={post._id}
            onClick={() => onSelectPost(post)}
            className="cursor-pointer group"
          >
            {/* Thumbnail */}
            {imageUrl && (
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-3">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
        );
      })}
    </div>
  );
}
