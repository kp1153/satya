// Navbar.js
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#006680] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 text-center border-b border-white/20">
          <Link href="/" className="block">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              चोरकट सत्यवान सौरभ
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              इस कमीने ने वेब डेवलपर का पैसा नहीं दिया
            </p>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 py-3 text-sm md:text-base">
          <Link href="/" className="hover:text-gray-200 transition">
            होम
          </Link>

          <Link href="/desh" className="hover:text-gray-200 transition">
            देश
          </Link>

          <Link href="/duniya" className="hover:text-gray-200 transition">
            दुनिया
          </Link>

          <Link href="/rajneeti" className="hover:text-gray-200 transition">
            राजनीति
          </Link>

          <Link href="/vishleshan" className="hover:text-gray-200 transition">
            विश्लेषण
          </Link>

          <Link href="/vichar" className="hover:text-gray-200 transition">
            खरी-खरी
          </Link>

          <Link href="/video" className="hover:text-gray-200 transition">
            इंटरव्यू
          </Link>

          <Link href="/waqt-bewaqt" className="hover:text-gray-200 transition">
            कला-साहित्य
          </Link>
        </div>
      </div>
    </nav>
  );
}
