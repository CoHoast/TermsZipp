"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1">
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
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            All Generators
          </Link>
          <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms-of-service" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button className="btn-gradient" asChild>
            <Link href="/">Generate Documents</Link>
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
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Generators
            </Link>
            <Link href="/privacy-policy" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Cookie Policy
            </Link>
            <div className="pt-4 border-t">
              <Button className="btn-gradient w-full" asChild>
                <Link href="/">Generate Documents</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
