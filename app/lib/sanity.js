import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

// Helper to generate image URLs from Sanity image references
export function urlFor(source) {
  if (!source?.asset?._ref) return null;

  const ref = source.asset._ref;
  // Parse the reference: image-{id}-{dimensions}-{format}
  const [, id, dimensions, format] = ref.split("-");

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}

// Fetch all blog posts (for list view)
export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "previewImage": images[0]
    }
  `);
}

// Fetch a single post by slug
export async function getPost(slug) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mediaType,
      images,
      videoUrl,
      content
    }
  `,
    { slug }
  );
}
