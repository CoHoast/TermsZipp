"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield, FileText, Cookie, AlertTriangle, RefreshCw, ScrollText, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const supabase = createClient();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

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
          {loading ? (
            <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-lg" />
          ) : user ? (
            <>
              {/* Logged In State */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                  <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span>Hi, {userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 py-2 bg-white border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors w-full text-left text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Logged Out State */}
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Button className="btn-gradient" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
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
            
            {/* Auth Section */}
            <div className="pt-4 border-t space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Hi, {userName}</span>
                  </div>
                  <Link href="/dashboard" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/settings" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button className="btn-gradient w-full" asChild>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
