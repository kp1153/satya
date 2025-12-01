// app/page.js
import React from "react";
import { getAllPosts } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

// 🟢 CATEGORY NAME FIX (Navbar के अनुसार)
const formatCategory = (c) => {
  if (!c) return "News";
  const map = {
    desh: "देश",
    duniya: "दुनिया",
    rajneeti: "राजनीति",
    vishleshan: "विश्लेषण",
    vichar: "खरी-खरी",
    video: "इंटरव्यू",
    "waqt-bewaqt": "कला-साहित्य",
  };
  return map[c] || c;
};

export default async function Page() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600">कोई पोस्ट उपलब्ध नहीं है।</p>
      </div>
    );
  }

  const featured = posts[0];
  const subFeatured = posts.slice(1, 3);
  const list = posts.slice(3, 9);
  const sidebar = posts.slice(1, 6);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("hi-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <div className="font-['Open_Sans'] text-stone-800">
      {/* Breaking News */}
      <div className="mb-8">
        <div className="flex items-center bg-white border shadow-sm h-10 overflow-hidden">
          <div className="bg-red-600 text-white px-4 text-[10px] font-bold uppercase flex items-center">
            ताज़ा ख़बर
          </div>
          <div className="flex-1 px-4 text-xs font-semibold text-stone-700 truncate">
            • {featured?.title ?? "स्वागत है"}
          </div>
          <div className="flex border-l">
            <button className="h-10 w-8 flex justify-center items-center">
              <ChevronLeft size={14} />
            </button>
            <button className="h-10 w-8 flex justify-center items-center">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-12">
        {featured && (
          <div className="lg:col-span-2 relative group overflow-hidden h-[450px]">
            <Link
              href={`/${featured.category?.slug?.current}/${featured.slug.current}`}
            >
              <div className="relative w-full h-full">
                {featured.mainImage ? (
                  <Image
                    src={featured.mainImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  {/* 🟢 Category Label Updated */}
                  <span className="bg-[#006680] text-white text-[10px] font-bold px-2 py-1 inline-block">
                    {formatCategory(featured.category?.slug?.current)}
                  </span>

                  <h2 className="text-4xl font-bold text-white leading-tight">
                    {featured.title}
                  </h2>
                  <span className="text-xs text-gray-300">
                    {formatDate(featured.publishedAt)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-rows-2 gap-1 h-[450px]">
          {subFeatured.map((item) => (
            <Link
              key={item._id}
              href={`/${item.category?.slug?.current}/${item.slug.current}`}
              className="relative group overflow-hidden block"
            >
              {item.mainImage ? (
                <Image
                  src={item.mainImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                <span className="bg-black text-[9px] font-bold px-1.5 py-0.5">
                  {formatCategory(item.category?.slug?.current)}
                </span>

                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN LIST */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <h3 className="bg-[#006680] text-white text-sm px-3 py-1 inline-block mb-6">
            नवीनतम लेख
          </h3>

          <div className="grid gap-8">
            {list.map((item) => (
              <article key={item._id} className="flex gap-6 border-b pb-6">
                <Link
                  href={`/${item.category?.slug?.current}/${item.slug.current}`}
                  className="md:w-1/3 relative aspect-[3/2] block overflow-hidden"
                >
                  {item.mainImage ? (
                    <>
                      <Image
                        src={item.mainImage}
                        fill
                        alt={item.title}
                        className="object-cover"
                      />
                      <span className="absolute bottom-0 left-0 bg-black text-white text-[9px] px-2">
                        {formatCategory(item.category?.slug?.current)}
                      </span>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </Link>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold hover:text-[#006680]">
                    <Link
                      href={`/${item.category?.slug?.current}/${item.slug.current}`}
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <span className="text-[10px] font-bold text-gray-500 block mb-2">
                    {formatDate(item.publishedAt)}
                  </span>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/${item.category?.slug?.current}/${item.slug.current}`}
                    className="text-[10px] bg-stone-200 px-2 py-1"
                  >
                    और पढ़ें
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Popular Widget */}
          <div className="bg-white border p-4 shadow-sm">
            <h4 className="bg-[#006680] text-white text-xs px-2 py-1 inline-block mb-3">
              लोकप्रिय
            </h4>

            <div className="space-y-4">
              {sidebar.map((item, idx) => (
                <Link
                  key={item._id}
                  href={`/${item.category?.slug?.current}/${item.slug.current}`}
                  className="flex gap-4 border-b pb-3 last:border-none group"
                >
                  <div className="w-20 h-16 relative overflow-hidden">
                    {item.mainImage ? (
                      <Image
                        src={item.mainImage}
                        fill
                        alt={item.title}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <span className="absolute top-0 left-0 w-5 h-5 bg-[#006680] text-white text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold hover:text-[#006680] leading-tight">
                      {item.title}
                    </h5>
                    <small className="text-[10px] text-gray-500">
                      {formatDate(item.publishedAt)}
                    </small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
