// Footer.js
export default function Footer() {
  return (
    <footer className="bg-[#006680] text-white py-10 mt-16">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-sm">
          © {new Date().getFullYear()} सर्वाधिकार सुरक्षित
        </p>

        <a
          href="https://www.web-developer-kp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-[#006680] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          वेबसाइट बनाने वाले: web-developer-kp.com
        </a>
      </div>
    </footer>
  );
}
