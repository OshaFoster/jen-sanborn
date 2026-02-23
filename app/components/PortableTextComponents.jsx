import { urlFor } from "../lib/sanity";

// Extract video ID from YouTube or Vimeo URLs
function getVideoEmbed(url) {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return {
      type: "youtube",
      id: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  return null;
}

export const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-[family-name:var(--font-megrim)] text-3xl mt-8 mb-4 text-neutral-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[family-name:var(--font-megrim)] text-2xl mt-6 mb-3 text-neutral-800">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-semibold text-lg mt-4 mb-2 text-neutral-800">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-neutral-600 leading-snug mb-2">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#c4e0ff] pl-4 my-6 italic text-neutral-500">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#AB622C] hover:text-[#8a4e23] underline transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-700">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value);
      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-sm text-neutral-500 mt-2 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      const video = getVideoEmbed(value?.url);
      if (!video) return null;

      return (
        <div className="my-8 aspect-video">
          <iframe
            src={video.embedUrl}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video embed"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-neutral-600 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-neutral-600 space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-snug">{children}</li>,
    number: ({ children }) => <li className="leading-snug">{children}</li>,
  },
  hardBreak: () => " ",
};
