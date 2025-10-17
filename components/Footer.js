// Footer.js
export default function Footer() {
  return (
    <footer className="bg-[#006680] text-white py-10 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Left Image with Caption */}
        <div className="flex-shrink-0 text-center md:text-left">
          <img src="/kumar.jpg" alt="Kumar" className="w-32 h-auto rounded" />
          <p className="mt-2 text-sm text-white">कुमार सौवीर</p>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <p className="text-lg font-medium leading-relaxed">
            मैं तो एक खुली और दिलचस्प किताब की तरह हूं। कोई भी चाहे, जहां से चाहे,
            पन्ना खोलकर कुछ भी पढना शुरू कर दें। कितनी रोचक दास्तान है मेरी, इसका
            फैसला तो आप खुद कर पायेंगे। मगर सच्ची इत्ती है कि आप इस फिल्म को कहीं
            से भी कभी भी देख-पढ सकते है, मजा ले सकते हैं।
          </p>
          <p className="text-lg font-medium leading-relaxed">
            अवरोधों को खडा करने की न तो मुझे कभी जरूरत महसूस हुई और ना ही अवरोधों
            ने कभी मेरे सामने कोई अवरोध खड़ा किया। सच के सामने झूठ, प्रेम के सामने
            नफरत कब तक टिके रह सकते हैं?
          </p>
          <p className="text-lg font-medium leading-relaxed">
            मेरा मानना है कि जो भी हो, बस आमने-सामने हो। अरे भई, जब कोई बात अघोर
            के प्रकाश में पूरी सम्पूर्णता के साथ हो सकती है, तो घोर-तमस का सहारा
            क्यों लिया जाए। हां हां, आप मुझे अघोरी मान सकते हैं।
          </p>
          <a
            href="https://www.web-developer-kp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-white text-[#006680] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            वेबसाइट बनाने वाले: web-developer-kp.com
          </a>
        </div>
      </div>
    </footer>
  );
}
