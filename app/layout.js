import { Megrim } from "next/font/google";
import "./globals.css";

const megrim = Megrim({
  weight: "400",
  variable: "--font-megrim",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jen Sanborn",
  description: "Artist Portfolio",
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
