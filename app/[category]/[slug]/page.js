// app/[category]/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

// Category display names mapping for हरकारा
const getCategoryDisplayName = (route) => {
  const displayNames = {
    desh: "देश",
    rajya: "राज्य",
    rajneeti: "राजनीति",
    duniya: "दुनिया",
    vishleshan: "विश्लेषण",
    vichar: "विचार",
    video: "वीडियो",
    "waqt-bewaqt": "वक़्त-बेवक़्त",
  };
  return displayNames[route] || route;
};

// Custom PortableText components
const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-gray-800 leading-relaxed text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 text-gray-900 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-gray-900 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 text-gray-900 mt-5">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-500 pl-6 italic text-gray-700 my-6 bg-red-50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 text-gray-800 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 text-gray-800 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="text-red-600 hover:text-red-800 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8 flex justify-center">
        <Image
          src={value.asset ? value.asset.url : value.url}
          alt={value.alt || "Article image"}
          width={1200}
          height={800}
          className="object-contain rounded-lg shadow max-h-[70vh] w-auto bg-gray-100"
        />
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic w-full">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
};

export default async function NewsPage({ params }) {
  const { category, slug } = await params;

  const safeCategory = decodeURIComponent(category);
  const safeSlug = decodeURIComponent(slug);

  const validCategories = [
    "desh",
    "rajya",
    "rajneeti",
    "duniya",
    "vishleshan",
    "vichar",
    "video",
    "waqt-bewaqt",
  ];

  if (!validCategories.includes(safeCategory)) {
    notFound();
  }

  const post = await getPostBySlugAndCategory(safeSlug, safeCategory);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categoryDisplayName = getCategoryDisplayName(safeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Date */}
        <div className="flex items-center justify-end mb-6">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Main Image */}
        {post.mainImageUrl && (
          <div className="w-full mb-8 flex justify-center">
            <Image
              src={post.mainImageUrl}
              alt={post.mainImageAlt || "Main image"}
              width={1200}
              height={800}
              className="object-contain w-auto max-h-[80vh] rounded-xl shadow bg-gray-100"
              priority
            />
          </div>
        )}

        {/* Caption */}
        {post.mainImageCaption && (
          <p className="text-center text-sm text-gray-600 mb-8 italic -mt-4">
            {post.mainImageCaption}
          </p>
        )}

        {/* Content */}
        <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </div>
        </article>

        {/* Back */}
        <div className="flex items-center justify-center">
          <Link
            href={`/${safeCategory}`}
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            ← {categoryDisplayName} पर वापस
          </Link>
        </div>
      </div>
    </main>
  );
}
