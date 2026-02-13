// Sanity schema definition for paintings
// Add this to your Sanity Studio's schema types
export default {
  name: "painting",
  title: "Painting",
  type: "document",
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      description: 'CSS aspect ratio (e.g. "3/4", "1/1", "5/4")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "size",
      title: "Size",
      type: "string",
      description: 'Physical dimensions (e.g. 16"x20")',
    },
    {
      name: "medium",
      title: "Medium",
      type: "string",
      description: "e.g. Oil on canvas, Oil on linen board",
    },
    {
      name: "sold",
      title: "Sold",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in the gallery",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      sold: "sold",
    },
    prepare({ title, media, sold }) {
      return {
        title: sold ? `${title} (SOLD)` : title,
        media,
      };
    },
  },
};
