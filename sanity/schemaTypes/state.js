export default {
  name: "state",
  title: "राज्य",
  type: "document",
  fields: [
    {
      name: "title",
      title: "State Name (Hindi)",
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
            "आंध्र-प्रदेश": "andhra-pradesh",
            "अरुणाचल-प्रदेश": "arunachal-pradesh",
            असम: "assam",
            बिहार: "bihar",
            छत्तीसगढ़: "chhattisgarh",
            गोवा: "goa",
            गुजरात: "gujarat",
            हरियाणा: "haryana",
            "हिमाचल-प्रदेश": "himachal-pradesh",
            झारखंड: "jharkhand",
            कर्नाटक: "karnataka",
            केरल: "kerala",
            "मध्य-प्रदेश": "madhya-pradesh",
            महाराष्ट्र: "maharashtra",
            मणिपुर: "manipur",
            मेघालय: "meghalaya",
            मिजोरम: "mizoram",
            नागालैंड: "nagaland",
            ओडिशा: "odisha",
            पंजाब: "punjab",
            राजस्थान: "rajasthan",
            सिक्किम: "sikkim",
            तमिलनाडु: "tamil-nadu",
            तेलंगाना: "telangana",
            त्रिपुरा: "tripura",
            "उत्तर-प्रदेश": "uttar-pradesh",
            उत्तराखंड: "uttarakhand",
            "पश्चिम-बंगाल": "west-bengal",
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
