import { getPost, urlFor } from "../../lib/sanity";
import BlogRedirect from "./BlogRedirect";

const siteUrl = "https://jen-sanborn.vercel.app";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Jen Sanborn - Artist",
    };
  }

  const title = `${post.title} - Jen Sanborn`;
  const description = post.excerpt || "Artist's Notes by Jen Sanborn";
  const heroImage = post.images?.[0];
  const imageUrl = heroImage ? urlFor(heroImage) : `${siteUrl}/assets/Haloed-Wanderer.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog/${slug}`,
      siteName: "Jen Sanborn",
      images: [
        {
          url: imageUrl,
          alt: heroImage?.alt || post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogRedirect slug={slug} />;
}
