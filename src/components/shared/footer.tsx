import Link from "next/link";
import Image from "next/image";

const zippProducts = [
  { name: "QRZipp", href: "https://qrzipp.com" },
  { name: "PDFZipp", href: "https://pdfzipp.com" },
  { name: "PIXZipp", href: "https://pixzipp.com" },
  { name: "CalcZipp", href: "https://calczipp.com" },
  { name: "HueZipp", href: "https://huezipp.com" },
];

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
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
            <h4 className="font-semibold mb-4">Generators</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Zipp Family */}
          <div>
            <h4 className="font-semibold mb-4">Zipp Family</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {zippProducts.map((product) => (
                <li key={product.name}>
                  <a href={product.href} className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t mt-8 pt-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> TermsZipp provides legal document templates for informational purposes only. 
              These templates do not constitute legal advice. We strongly recommend having all legal documents reviewed 
              by a qualified attorney before use on your website or application.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TermsZipp. Part of the Zipp family.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/our-privacy" className="hover:text-foreground transition-colors">Our Privacy Policy</Link>
            <Link href="/our-terms" className="hover:text-foreground transition-colors">Our Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
