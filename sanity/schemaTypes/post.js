export default {
  name: "post",
  title: "समाचार (Post)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "शीर्षक",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(200)
          .error("शीर्षक 10-200 अक्षरों के बीच होना चाहिए"),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => {
          return (
            input
              .toLowerCase()
              .replace(/[\u0900-\u097F]/g, "") // हिंदी अक्षर हटाओ
              .replace(/[^\w\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-")
              .replace(/\-\-+/g, "-")
              .replace(/^-+/, "")
              .replace(/-+$/, "") || `post-${Date.now()}`
          );
        },
      },
      validation: (Rule) => Rule.required().error("URL Slug आवश्यक है"),
    },
    {
      name: "content",
      title: "सामग्री",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("सामग्री आवश्यक है"),
    },
    {
      name: "mainImage",
      title: "मुख्य तस्वीर",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "caption",
          title: "कैप्शन",
          type: "string",
          description: "तस्वीर के नीचे दिखने वाला कैप्शन",
        },
      ],
    },
    {
      name: "publishedAt",
      title: "प्रकाशन तारीख",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("प्रकाशन तारीख आवश्यक है"),
    },
    {
      name: "category",
      title: "श्रेणी",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required().error("श्रेणी का चुनाव आवश्यक है"),
    },
    {
      name: "views",
      title: "Views Count",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    },
  ],
  orderings: [
    {
      title: "प्रकाशन तारीख के अनुसार (नया पहले)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "शीर्षक के अनुसार",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      category: "category.name",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, media, category, publishedAt } = selection;
      const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString("hi-IN")
        : "तारीख नहीं";
      return {
        title,
        media,
        subtitle: `${category || "बिना श्रेणी"} • ${formattedDate}`,
      };
    },
  },
};
