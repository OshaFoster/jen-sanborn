import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false, // Disable CDN to always get fresh data
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

// Fetch all paintings (for gallery)
export async function getPaintings() {
  return client.fetch(`
    *[_type == "painting"] | order(orderRank asc) {
      _id,
      title,
      "imageUrl": image.asset->url,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      size,
      medium,
      sold
    }
  `);
}

// Fetch all blog posts (for list view)
export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      _createdAt,
      publishedAt,
      excerpt,
      "previewImage": images[0],
      videoUrl
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
      _createdAt,
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
