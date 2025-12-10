// components/Footer.js

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} सर्वाधिकार सुरक्षित।
          </p>

          <Link
            href="https://nfiw.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            Web Developer: Creative Solutions
          </Link>
        </div>
      </div>
    </footer>
  );
}
