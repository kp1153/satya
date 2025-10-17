// app/[category]/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import ViewsCounter from "@/components/ViewsCounter";

export const dynamic = "force-dynamic";

const getCategoryDisplayName = (route) => {
  const displayNames = {
    desh: "देश",
    rajneeti: "राजनीति",
    duniya: "दुनिया",
    vishleshan: "विश्लेषण",
    vichar: "विचार",
    video: "वीडियो",
    "waqt-bewaqt": "वक़्त-बेवक़्त",
    rajya: "राज्य",
  };
  return displayNames[route] || route;
};

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
      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6 bg-blue-50 py-4 rounded-r-lg">
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
    link: ({ value, children }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <div className="my-8 flex justify-center">
          <Image
            src={urlFor(value).width(1200).url()}
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
      );
    },
    gallery: ({ value }) => (
      <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {value.images?.map((img, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={urlFor(img).width(600).url()}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg shadow"
            />
          </div>
        ))}
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
    "rajneeti",
    "duniya",
    "vishleshan",
    "vichar",
    "video",
    "waqt-bewaqt",
    "rajya",
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
      timeZone: "Asia/Kolkata",
    });
  };

  const categoryDisplayName = getCategoryDisplayName(safeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">{formatDate(post.publishedAt)}</span>
            <ViewsCounter slug={safeSlug} initialViews={post.views || 0} />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
          {post.title}
        </h1>

        {post.mainImageUrl && (
          <div className="w-full mb-8 flex justify-center">
            <Image
              src={post.mainImageUrl}
              alt={post.mainImageAlt || "Main image"}
              width={2500}
              height={2122}
              className="object-contain w-auto max-h-[80vh] rounded-xl shadow bg-gray-100"
              priority
            />
          </div>
        )}

        {post.mainImageCaption && (
          <p className="text-center text-sm text-gray-600 mb-8 italic -mt-4">
            {post.mainImageCaption}
          </p>
        )}

        <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </div>
        </article>

        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            होम पेज
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
