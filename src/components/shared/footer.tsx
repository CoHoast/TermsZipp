import Link from "next/link";
import Image from "next/image";

const zippFamily = [
  { name: "QRZipp", href: "https://qrzipp.com", prefix: "QR", gradient: "from-emerald-600 to-teal-500", boltColor: "#10b981", desc: "QR Codes" },
  { name: "PDFZipp", href: "https://pdfzipp.com", prefix: "PDF", gradient: "from-blue-800 via-blue-500 to-cyan-500", boltColor: "#3b82f6", desc: "PDF Tools" },
  { name: "CalcZipp", href: "https://calczipp.com", prefix: "Calc", gradient: "from-amber-500 via-orange-500 to-red-500", boltColor: "#f97316", desc: "Calculators" },
  { name: "PIXZipp", href: "https://pixzipp.com", prefix: "PIX", gradient: "from-purple-600 via-pink-500 to-rose-500", boltColor: "#a855f7", desc: "Image Tools" },
  { name: "TermsZipp", href: "/", prefix: "Terms", gradient: "from-cyan-500 via-teal-500 to-emerald-500", boltColor: "#0d9488", desc: "Legal Docs", current: true },
];

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-0.5 mb-4">
                <Image 
                  src="/logo.svg" 
                  alt="TermsZipp" 
                  width={24} 
                  height={32}
                  className="w-6 h-8"
                />
                <span className="text-2xl font-bold">
                  Terms<span className="brand-gradient-text font-extrabold">Zipp</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Generate professional legal documents for your website in seconds. Free, fast, and easy to customize.
              </p>
            </div>

            {/* Generators */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Generators</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
                <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
                <li><Link href="/eula" className="hover:text-foreground transition-colors">EULA</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/our-privacy" className="hover:text-foreground transition-colors">Our Privacy Policy</Link></li>
                <li><Link href="/our-terms" className="hover:text-foreground transition-colors">Our Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t py-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> TermsZipp provides legal document templates for informational purposes only. 
              These templates do not constitute legal advice. We strongly recommend having all legal documents reviewed 
              by a qualified attorney before use on your website or application.
            </p>
          </div>
        </div>

        {/* ZIPP Family Section */}
        <div className="border-t py-8">
          <p className="text-center text-xs tracking-widest text-muted-foreground mb-6">
            PART OF THE ZIPP FAMILY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {zippFamily.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                target={product.current ? undefined : "_blank"}
                rel={product.current ? undefined : "noopener noreferrer"}
                className="flex flex-col items-center text-center group"
              >
                <div className="flex items-center gap-0.5 mb-1 group-hover:opacity-70 transition-opacity">
                  <svg viewBox="0 0 24 32" className="w-5 h-7" fill="none">
                    <path d="M5 2H20L11 14H19L4 30L9 16H2L5 2Z" fill={product.boltColor} />
                  </svg>
                  <span className="text-xl font-bold text-gray-900">
                    {product.prefix}<span className={`bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent font-extrabold`}>Zipp</span>
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{product.desc}</span>
                {product.current && (
                  <span className="text-xs text-teal-600 mt-0.5">● You are here</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-0.5">
              <Image 
                src="/logo.svg" 
                alt="TermsZipp" 
                width={20} 
                height={26}
                className="w-5 h-6"
              />
              <span className="font-bold">
                Terms<span className="brand-gradient-text font-extrabold">Zipp</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TermsZipp. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/our-privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/our-terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
