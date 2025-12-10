// components/Footer.js

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h3 className="text-white text-2xl font-bold mb-4">
            हरियाणा जन संदेश
          </h3>
          <p className="text-gray-400 mb-4 leading-relaxed max-w-2xl mx-auto">
            हरियाणा और देश की सच्ची खबरें, निष्पक्ष पत्रकारिता और जनता की आवाज
            का मंच।
          </p>
          <p className="text-[#006680] font-semibold text-lg">
            सत्य का साथ, जनता के साथ
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} हरियाणा जन संदेश। सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex gap-6 text-sm items-center">
            <Link href="/privacy" className="hover:text-white transition">
              गोपनीयता नीति
            </Link>
            <span className="text-gray-600">|</span>
            <a
              href="https://nfiw.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Web Developer: Creative Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
