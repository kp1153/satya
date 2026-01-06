// app/[category]/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";
import ViewsCounter from "@/components/ViewsCounter";
import { ChevronRight, Calendar, User, Edit } from "lucide-react";

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
      {/* Edit Button */}
      <a 
        href={`https://www.telescopetimes.com/studio/structure/post;${post._id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2 z-50"
      >
        <Edit size={18} />
        एडिट करें
      </a>
      
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
      
      <span className="bg-[#006680] text-white text-xs px-2 py-1 rounded"></span>