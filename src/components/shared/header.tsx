"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield, FileText, Cookie, AlertTriangle, RefreshCw, ScrollText } from "lucide-react";
import { useState } from "react";

const generators = [
  { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
  { name: "Terms of Service", href: "/terms-of-service", icon: FileText },
  { name: "Cookie Policy", href: "/cookie-policy", icon: Cookie },
  { name: "Disclaimer", href: "/disclaimer", icon: AlertTriangle },
  { name: "Refund Policy", href: "/refund-policy", icon: RefreshCw },
  { name: "EULA", href: "/eula", icon: ScrollText },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-0.5">
          <Image 
            src="/logo.svg" 
            alt="TermsZipp" 
            width={28} 
            height={36}
            className="w-7 h-9"
          />
          <span className="text-2xl font-bold">
            Terms<span className="brand-gradient-text font-extrabold">Zipp</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Generators Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              All Generators
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-white border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {generators.map((gen) => (
                <Link
                  key={gen.href}
                  href={gen.href}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                >
                  <div className="w-6 h-6 rounded-md brand-gradient flex items-center justify-center">
                    <gen.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{gen.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/#how-it-works" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            How It Works
          </Link>
          <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            Pricing
          </Link>
          <Link href="/faq" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            FAQ
          </Link>
          <Link href="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Button className="btn-gradient" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {/* Generators Section */}
            <div className="pb-2 mb-2 border-b">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Generators</p>
              {generators.map((gen) => (
                <Link
                  key={gen.href}
                  href={gen.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-6 h-6 rounded-md brand-gradient flex items-center justify-center">
                    <gen.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  {gen.name}
                </Link>
              ))}
            </div>
            
            {/* Other Links */}
            <Link href="/#how-it-works" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/faq" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            
            {/* Auth Buttons */}
            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="btn-gradient w-full" asChild>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
