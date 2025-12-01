// Navbar.js
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#006680] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 text-center border-b border-white/20 flex items-center justify-between">
          <Link href="/" className="flex-1 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              चोरकट सत्यवान सौरभ
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              इस कमीने ने वेब डेवलपर का पैसा नहीं दिया
            </p>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/10 rounded"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop + Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-6 py-3 text-sm md:text-base">
            <Link
              href="/"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              होम
            </Link>

            <Link
              href="/desh"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              देश
            </Link>

            <Link
              href="/duniya"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              दुनिया
            </Link>

            <Link
              href="/rajneeti"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              राजनीति
            </Link>

            <Link
              href="/vishleshan"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              विश्लेषण
            </Link>

            <Link
              href="/vichar"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              खरी-खरी
            </Link>

            <Link
              href="/video"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              इंटरव्यू
            </Link>

            <Link
              href="/waqt-bewaqt"
              className="hover:text-gray-200 transition px-4 py-2 md:p-0"
              onClick={() => setIsOpen(false)}
            >
              कला-साहित्य
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
