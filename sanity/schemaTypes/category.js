export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title (Hindi)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => {
          const slugMap = {
            देश: "desh",
            राज्य: "rajya",
            राजनीति: "rajneeti",
            दुनिया: "duniya",
            विश्लेषण: "vishleshan",
            विचार: "vichar",
            वीडियो: "video",
            "वक़्त-बेवक़्त": "waqt-bewaqt",
          };
          return (
            slugMap[input] ||
            input
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w\-]+/g, "")
          );
        },
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
