// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white py-10 mt-16">
      <div className="container mx-auto px-4 text-center space-y-6">
        <p className="text-lg font-medium leading-relaxed">
          अगर आपको लगता है कि <strong>हरकारा</strong> आपके काम का है, तो आप
          इसमें योगदान दे सकते हैं. हम जितना हो सके इस कोशिश को खुला और आसान
          रखना चाहते हैं.
        </p>
        <p className="text-lg font-medium leading-relaxed">
          अगर आपको लगता है कि इस तरह की पेशकश न सिर्फ़ आपके लिए बल्कि बहुत सारे
          हिंदी भाषियों के लिए भी काम आ सकती हो, तो इसका समर्थन कीजिए.
        </p>
        <p className="text-lg font-medium leading-relaxed">
          ख़ास तौर पर जिन्हें इस समय, इस समाज, इसकी प्रवृत्तियों, इसके संकटों की
          फ़िक्र है. न सिर्फ अपने लिए, बल्कि उन नौजवान और किशोर लोगों के लिए,
          जिनसे अगला भारत तैयार होता है.
        </p>
        <a
          href="https://www.web-developer-kp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-100 transition"
        >
          वेबसाइट बनाने वाले: web-developer-kp.com
        </a>
      </div>
    </footer>
  );
}
