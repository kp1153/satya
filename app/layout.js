// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "मैं कीचड़ में लोटने वाला वही सूअर हूँ, जिसने वेब डेवलपर का मेहनताना नहीं दिया",
  description:
    "मैं इतना घिनहा हूँ कि जबरी हर दिन 4 हजार लोगों के ईमेल पर अपनी सड़ियल लेखनी घुसेड़ता रहता हूँ।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
