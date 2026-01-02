// components/Navbar.js
"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

const navLinks = [
    { href: "/", label: "होम" },
    { href: "/bharat", label: "भारत" },
    { href: "/vishwa", label: "विश्व" },
    { href: "/punjab", label: "पंजाब" },
    { href: "/khel", label: "खेल" },
    { href: "/manoranjan", label: "मनोरंजन" },
    { href: "/commerce", label: "कॉमर्स" },
    { href: "/vividh", label: "विविध" },
  ];

  return (
    <nav className="bg-[#006680] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 text-center border-b border-white/20 flex items-center justify-between md:justify-center">
          <Link href="/" className="flex-1 md:flex-none text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              टेलीस्कोप टाइम्स
            </h1>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop + Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-6 py-3 text-sm md:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gray-200 transition px-4 py-2 md:p-0"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
