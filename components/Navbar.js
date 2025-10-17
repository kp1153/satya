// Navbar.js
"use client";

import Link from "next/link";
import { useState } from "react";

const states = [
  { title: "आंध्र-प्रदेश", slug: "andhra-pradesh" },
  { title: "अरुणाचल-प्रदेश", slug: "arunachal-pradesh" },
  { title: "असम", slug: "assam" },
  { title: "बिहार", slug: "bihar" },
  { title: "छत्तीसगढ़", slug: "chhattisgarh" },
  { title: "गोवा", slug: "goa" },
  { title: "गुजरात", slug: "gujarat" },
  { title: "हरियाणा", slug: "haryana" },
  { title: "हिमाचल-प्रदेश", slug: "himachal-pradesh" },
  { title: "झारखंड", slug: "jharkhand" },
  { title: "कर्नाटक", slug: "karnataka" },
  { title: "केरल", slug: "kerala" },
  { title: "मध्य-प्रदेश", slug: "madhya-pradesh" },
  { title: "महाराष्ट्र", slug: "maharashtra" },
  { title: "मणिपुर", slug: "manipur" },
  { title: "मेघालय", slug: "meghalaya" },
  { title: "मिजोरम", slug: "mizoram" },
  { title: "नागालैंड", slug: "nagaland" },
  { title: "ओडिशा", slug: "odisha" },
  { title: "पंजाब", slug: "punjab" },
  { title: "राजस्थान", slug: "rajasthan" },
  { title: "सिक्किम", slug: "sikkim" },
  { title: "तमिलनाडु", slug: "tamil-nadu" },
  { title: "तेलंगाना", slug: "telangana" },
  { title: "त्रिपुरा", slug: "tripura" },
  { title: "उत्तर-प्रदेश", slug: "uttar-pradesh" },
  { title: "उत्तराखंड", slug: "uttarakhand" },
  { title: "पश्चिम-बंगाल", slug: "west-bengal" },
];

export default function Navbar() {
  const [showStates, setShowStates] = useState(false);

  return (
    <nav className="bg-[#006680] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-3 text-center border-b border-white/20">
          <Link href="/" className="flex items-center justify-center">
            <img src="/dolatti.png" alt="दोलत्ती" className="h-12 md:h-16" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 py-3 text-sm md:text-base">
          <Link href="/desh" className="hover:text-gray-200 transition">
            देश
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowStates(!showStates)}
              className="hover:text-gray-200 transition"
            >
              राज्य ▼
            </button>

            {showStates && (
              <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-52 max-h-96 overflow-y-auto">
                {states.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/rajya/${s.slug}`}
                    onClick={() => setShowStates(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/rajneeti" className="hover:text-gray-200 transition">
            राजनीति
          </Link>

          <Link href="/duniya" className="hover:text-gray-200 transition">
            दुनिया
          </Link>

          <Link href="/vishleshan" className="hover:text-gray-200 transition">
            विश्लेषण
          </Link>

          <Link href="/vichar" className="hover:text-gray-200 transition">
            विचार
          </Link>

          <Link href="/video" className="hover:text-gray-200 transition">
            वीडियो
          </Link>

          <Link href="/waqt-bewaqt" className="hover:text-gray-200 transition">
            वक़्त-बेवक़्त
          </Link>
        </div>
      </div>
    </nav>
  );
}