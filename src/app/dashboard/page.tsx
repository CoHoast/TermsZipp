"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Shield, Cookie, AlertTriangle, RefreshCw, ScrollText,
  Plus, ArrowRight, Clock, Download, Star
} from "lucide-react";
import { createClient } from "@/lib/supabase";

const documentTypes = [
  { type: "privacy-policy", name: "Privacy Policy", icon: Shield, href: "/privacy-policy" },
  { type: "terms-of-service", name: "Terms of Service", icon: FileText, href: "/terms-of-service" },
  { type: "cookie-policy", name: "Cookie Policy", icon: Cookie, href: "/cookie-policy" },
  { type: "disclaimer", name: "Disclaimer", icon: AlertTriangle, href: "/disclaimer" },
  { type: "refund-policy", name: "Refund Policy", icon: RefreshCw, href: "/refund-policy" },
  { type: "eula", name: "EULA", icon: ScrollText, href: "/eula" },
];

const getTypeIcon = (type: string) => {
  const docType = documentTypes.find(d => d.type === type);
  return docType?.icon || FileText;
};

const getTypeName = (type: string) => {
  const docType = documentTypes.find(d => d.type === type);
  return docType?.name || type;
};

interface Profile {
  plan: string;
  documents_generated_this_month: number;
  documents_limit: number;
}

interface Document {
  id: string;
  title: string;
  document_type: string;
  created_at: string;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      } else {
        // Fallback to user metadata if profile doesn't exist yet
        setProfile({
          plan: user.user_metadata?.plan || 'free',
          documents_generated_this_month: 0,
          documents_limit: 3,
        });
      }

      // Get recent documents
      const { data: docsData } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (docsData) {
        setDocuments(docsData);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const plan = profile?.plan || 'free';
  const documentsThisMonth = profile?.documents_generated_this_month || 0;
  const documentsLimit = plan === 'premium' ? -1 : plan === 'pro' ? 25 : 3;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-64"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <Card key={i} className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-slate-200 rounded w-16"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your documents.</p>
        </div>
        <Button className="btn-gradient" asChild>
          <Link href="/">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Documents This Month</div>
          <div className="text-2xl font-bold mt-1">
            {documentsThisMonth}
            {plan !== "premium" && (
              <span className="text-sm font-normal text-muted-foreground"> / {documentsLimit}</span>
            )}
          </div>
          {plan !== "premium" && documentsLimit > 0 && (
            <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full" 
                style={{ width: `${Math.min((documentsThisMonth / documentsLimit) * 100, 100)}%` }}
              />
            </div>
          )}
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Generated</div>
          <div className="text-2xl font-bold mt-1">{documents.length}</div>
          <div className="text-xs text-muted-foreground mt-1">All time</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Saved Documents</div>
          <div className="text-2xl font-bold mt-1">{documents.length}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {plan === "pro" ? "50 max" : plan === "premium" ? "Unlimited" : "Upgrade to save"}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Current Plan</div>
          <div className="text-2xl font-bold mt-1 capitalize">{plan}</div>
          {plan !== "premium" && (
            <Link href="/dashboard/billing" className="text-xs text-teal-600 hover:text-teal-700 mt-1 inline-block">
              Upgrade →
            </Link>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Generate</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.map((doc) => {
            const Icon = doc.icon;
            return (
              <Link key={doc.type} href={doc.href}>
                <Card className="p-4 hover:border-teal-200 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <Icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-teal-600 transition-colors">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">Generate new</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-teal-600 transition-colors" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Documents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Documents</h2>
          {documents.length > 0 && (
            <Link href="/dashboard/documents" className="text-sm text-teal-600 hover:text-teal-700">
              View all →
            </Link>
          )}
        </div>

        {documents.length > 0 ? (
          <div className="space-y-3">
            {documents.map((doc) => {
              const Icon = getTypeIcon(doc.document_type);
              return (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{doc.title}</div>
                      <div className="text-sm text-muted-foreground">{getTypeName(doc.document_type)}</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(doc.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/documents/${doc.id}`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No documents yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate your first legal document to get started.
            </p>
            <Button className="btn-gradient" asChild>
              <Link href="/">
                <Plus className="h-4 w-4 mr-2" />
                Create Document
              </Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
