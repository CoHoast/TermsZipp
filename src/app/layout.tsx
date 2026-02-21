import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TermsZipp - Free Privacy Policy & Terms Generator",
  description: "Generate professional privacy policies, terms of service, cookie policies, and other legal documents for your website in seconds. Free and easy to use.",
  keywords: "privacy policy generator, terms of service generator, terms and conditions, cookie policy, GDPR, legal documents, website policy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
