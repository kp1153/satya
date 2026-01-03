// app/page.js
import React from "react";
import { getAllPosts } from "@/lib/sanity";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600">कोई पोस्ट उपलब्ध नहीं है।</p>
      </div>
    );
  }

  return <HomeContent posts={posts} />;
}