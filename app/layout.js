// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "पंजाब जन संदेश | Punjab Jan Sandesh - समाचार और विश्लेषण",
  description:
    "पंजाब और देश की प्रमुख खबरें, गहन विश्लेषण, राजनीतिक समाचार, और जनता की आवाज। सच्ची और निष्पक्ष पत्रकारिता का मंच।",
  keywords: [
    "पंजाब समाचार",
    "Punjab news",
    "जन संदेश",
    "राजनीतिक खबरें",
    "पंजाब की खबरें",
    "हिंदी समाचार",
    "भारतीय समाचार",
    "निष्पक्ष पत्रकारिता",
  ],
  authors: [{ name: "पंजाब जन संदेश" }],
  creator: "पंजाब जन संदेश",
  publisher: "पंजाब जन संदेश",
  metadataBase: new URL('https://www.punjabjansandesh.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "पंजाब जन संदेश | Punjab Jan Sandesh",
    description: "पंजाब और देश की प्रमुख खबरें, गहन विश्लेषण और निष्पक्ष पत्रकारिता",
    url: "https://www.punjabjansandesh.com",
    siteName: "पंजाब जन संदेश",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'पंजाब जन संदेश - समाचार और विश्लेषण',
      }
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "पंजाब जन संदेश | Punjab Jan Sandesh",
    description: "पंजाब और देश की प्रमुख खबरें और निष्पक्ष पत्रकारिता",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification code यहाँ add करें
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
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