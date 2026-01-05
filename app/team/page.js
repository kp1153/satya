export const metadata = {
  title: "टीम | हमारा मोर्चा",
  description: "हमारा मोर्चा की संपादकीय और तकनीकी टीम",
};

export default function TeamPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            हमारी <span className="text-[#006680]">टीम</span>
          </h1>
          <div className="w-24 h-1 bg-[#006680] mx-auto"></div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Editor-in-Chief */}
          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-[#006680]">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              प्रधान संपादक
            </h2>
            <p className="text-xl text-[#006680] font-semibold mb-3">
              गीता वर्मा
            </p>
            <p className="text-gray-600 mb-2">
              ईमेल:
              <a
                href="mailto:ipugeetu@gmail.com"
                className="text-[#006680] hover:underline ml-1"
              >
                ipugeetu@gmail.com
              </a>
            </p>
          </div>

          {/* Web Development */}
          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-[#006680]">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              वेबसाइट डेवलपमेंट एवं रखरखाव
            </h2>
            <p className="text-xl text-[#006680] font-semibold mb-3">
              कामता प्रसाद
            </p>
            <p className="text-gray-600 mb-2">
              ईमेल:
              <a
                href="mailto:prasad.kamta@gmail.com"
                className="text-[#006680] hover:underline ml-1"
              >
                prasad.kamta@gmail.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
