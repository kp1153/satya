// components/Footer.js

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">{/* Future content यहाँ */}</div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} सर्वाधिकार सुरक्षित।
          </p>

          <nav
            className="flex gap-6 text-sm items-center"
            aria-label="Footer navigation"
          >
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              गोपनीयता नीति
            </Link>

            <span className="text-gray-600" aria-hidden="true">
              |
            </span>

            <Link
              href="https://nfiw.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-white transition-colors duration-200"
            >
              Web Developer: Creative Solutions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
