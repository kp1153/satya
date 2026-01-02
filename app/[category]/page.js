// app/[category]/page.js
import { getPostsByCategory } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

const getCategoryDisplayName = (route) => {
  const displayNames = {
    desh: "भारत",
    duniya: "विश्व",
    punjab: "पंजाब",
    khel: "खेल",
    manoranjan: "मनोरंजन",
    commerce: "कॉमर्स",
    vividh: "विविध",
  };
  return displayNames[route] || route;
};

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const safeCategory = decodeURIComponent(category);

  const posts = await getPostsByCategory(safeCategory);
  const categoryDisplayName = getCategoryDisplayName(safeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-xs uppercase font-bold text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#006680]">
          होम
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-800">{categoryDisplayName}</span>
      </div>

      <h1 className="text-4xl font-black mb-8">{categoryDisplayName}</h1>

      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
        {posts?.map((post) => (
          <Link
            key={post._id}
            href={`/${safeCategory}/${post.slug.current}`}
            className="group"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 duration-500"
              />
            </div>
            <h2 className="text-xl font-bold mt-3 group-hover:text-[#006680]">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}