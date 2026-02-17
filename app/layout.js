import { Megrim } from "next/font/google";
import "./globals.css";

const megrim = Megrim({
  weight: "400",
  variable: "--font-megrim",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://jen-sanborn.vercel.app"),
  title: "Jen Sanborn",
  description: "Contemporary oil painter exploring the beauty of nature and wildlife",
  openGraph: {
    title: "Jen Sanborn - Artist",
    description: "Contemporary oil painter exploring the beauty of nature and wildlife",
    url: "https://jen-sanborn.vercel.app",
    siteName: "Jen Sanborn",
    images: [
      {
        url: "/assets/Haloed-Wanderer.jpg",
        width: 1200,
        height: 630,
        alt: "Jen Sanborn Art",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jen Sanborn - Artist",
    description: "Contemporary oil painter exploring the beauty of nature and wildlife",
    images: ["/assets/Haloed-Wanderer.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${megrim.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
