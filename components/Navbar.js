// components/Navbar.js
"use client";
import Link from "next/link";
import Image from "next/image";
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
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 text-center border-b border-gray-200 flex items-center justify-between md:justify-center">
          <Link href="/" className="flex-1 md:flex-none text-center">
            <Image 
              src="/logo.jpg" 
              alt="The Telescope" 
              width={400} 
              height={80}
              className="mx-auto"
              priority
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <div className={`${isOpen ? "block" : "hidden"} md:block`} style={{backgroundColor: 'rgb(255, 23, 76)'}}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-6 py-3 text-sm md:text-base text-white">
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