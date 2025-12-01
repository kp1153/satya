// Footer.js
export default function Footer() {
  return (
    <footer className="bg-[#006680] text-white py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-1 gap-8 mb-8">
          <div className="text-left">
            <h3 className="text-xl font-bold mb-4">सत्यवान सौरभ की असलियत</h3>
            <div className="space-y-3 text-sm">
              <p>
                सत्यवान सौरभ ने वेबसाइट बनवाई, यह हरामजादा चाहता था कि मैं सब्सक्राइब के नाम पर ऐसी व्यवस्था कर दूँ कि यह हजारों लोगों को स्पैम भेज सके, बिना सामने वाले की मर्जी के एक साथ हजारों लोगों को ईमेल भेजता रहे।
              </p>

              <p>
                जब टेक्निकली ऐसा संभव नहीं हो पाया, फ्री प्लान में तो इसने पूरी कुत्तई दिखाई और डेवलपर का फोन उठाना बंद कर दिया और वेबसाइट बनाने का उसका मेहनताना भी नहीं दिया।
              </p>

              <p>
                यह सूअर की औलाद खुद को पशु-चिकित्सक और लेखक बताता है। यह अपनी बीवी के नाम पर अंड-बंड कुछ भी लिखकर लोगों के ईमेल्स पर बमबारी करता रहता है।
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 border-t border-white/20 pt-6">
          <p className="text-sm">
            © {new Date().getFullYear()} सर्वाधिकार सुरक्षित
          </p>

          
            <a href="https://www.web-developer-kp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#006680] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            वेब डेवलपर: कामता प्रसाद
          </a>
        </div>
      </div>
    </footer>
  );
}