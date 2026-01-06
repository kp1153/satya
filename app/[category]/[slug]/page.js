// app/[category]/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";
import ViewsCounter from "@/components/ViewsCounter";
import { ChevronRight, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

const getCategoryDisplayName = (route) => {
const displayNames = {
  bharat: "भारत",
  vishwa: "विश्व",
  punjab: "पंजाब",
  khel: "खेल",
  manoranjan: "मनोरंजन",
  commerce: "कॉमर्स",
  vividh: "विविध",
  "sanad-rahe": "सनद रहे",
  team: "टीम",
};

  return displayNames[route] || route;
};

export default async function NewsPage({ params }) {
  const { category, slug } = await params;
  const safeCategory = decodeURIComponent(category);
  const safeSlug = decodeURIComponent(slug);

  const post = await getPostBySlugAndCategory(safeSlug, safeCategory);
  if (!post) return notFound();

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-xs uppercase font-bold text-gray-500 mb-6 border-b pb-3">
        <Link href="/" className="hover:text-[#006680]">
          होम
        </Link>
        <ChevronRight size={12} />
        <Link href={`/${safeCategory}`} className="hover:text-[#006680]">
          {categoryDisplayName}
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-800">{post.title}</span>
      </div>

      <span className="bg-[#006680] text-white text-xs px-2 py-1 rounded-sm">
        {categoryDisplayName}
      </span>

      <h1 className="text-4xl font-bold my-4">{post.title}</h1>

      <div className="flex gap-4 text-sm text-gray-500 border-y py-2 mb-6">
        <span className="flex items-center gap-1">
          <User size={14} /> संपादकीय टीम
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {formatDate(post.publishedAt)}
        </span>
        <ViewsCounter slug={safeSlug} initialViews={post.views || 0} />
      </div>

      {post.mainImageUrl && (
        <Image
          src={post.mainImageUrl}
          alt="main image"
          width={1200}
          height={700}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="rounded mb-8"
        />
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText 
          value={post.content} 
          components={PortableTextComponents}
        />
      </div>
    </div>
  );
}