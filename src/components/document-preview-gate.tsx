"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Sparkles, ArrowRight, FileText, Check, Save, Download, Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase";

interface DocumentPreviewGateProps {
  content: string;
  documentType: string;
  documentTypeSlug?: string; // e.g., "privacy-policy"
  formData?: Record<string, unknown>; // Original form data to save
}

export function DocumentPreviewGate({ 
  content, 
  documentType, 
  documentTypeSlug,
  formData 
}: DocumentPreviewGateProps) {
  const [user, setUser] = useState<{ id: string; plan: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(`${documentType} - ${new Date().toLocaleDateString()}`);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Get plan from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', authUser.id)
          .single();
        
        setUser({
          id: authUser.id,
          plan: profile?.plan || authUser.user_metadata?.plan || 'free'
        });
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const isPaidUser = user && (user.plan === 'pro' || user.plan === 'premium');

  const handleSave = async () => {
    if (!user || !isPaidUser) return;
    
    setSaving(true);
    const supabase = createClient();

    // Save document
    const { data: doc, error } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        title: documentTitle,
        document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
        content: content,
        form_data: formData || {},
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving document:', error);
      setSaving(false);
      return;
    }

    // Log activity
    await supabase.from('activity_log').insert({
      user_id: user.id,
      action: 'created',
      document_id: doc.id,
      document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
      document_title: documentTitle,
    });

    // Increment monthly count
    await supabase.rpc('increment_document_count', { user_id: user.id }).catch(() => {
      // If RPC doesn't exist, update directly
      supabase
        .from('profiles')
        .update({ 
          documents_generated_this_month: (user as any).documents_generated_this_month + 1 || 1 
        })
        .eq('id', user.id);
    });

    setSavedDocId(doc.id);
    setSaved(true);
    setSaving(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Log download activity
    if (user && isPaidUser) {
      const supabase = createClient();
      await supabase.from('activity_log').insert({
        user_id: user.id,
        action: 'downloaded',
        document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
        document_title: documentTitle,
        details: 'Copied to clipboard',
      });
    }
  };

  const handleDownload = (format: 'md' | 'html') => {
    let fileContent = content;
    let mimeType = 'text/markdown';
    let extension = 'md';

    if (format === 'html') {
      fileContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${documentTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #111; border-bottom: 2px solid #14b8a6; padding-bottom: 10px; }
    h2 { color: #222; margin-top: 30px; }
    h3 { color: #333; }
    ul, ol { padding-left: 24px; }
    li { margin-bottom: 8px; }
    p { margin-bottom: 16px; }
  </style>
</head>
<body>
${content.replace(/^# (.*$)/gm, '<h1>$1</h1>')
  .replace(/^## (.*$)/gm, '<h2>$1</h2>')
  .replace(/^### (.*$)/gm, '<h3>$1</h3>')
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/^- (.*$)/gm, '<li>$1</li>')
  .replace(/\n\n/g, '</p><p>')}
</body>
</html>`;
      mimeType = 'text/html';
      extension = 'html';
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);

    // Log download activity
    if (user && isPaidUser) {
      const supabase = createClient();
      supabase.from('activity_log').insert({
        user_id: user.id,
        action: 'downloaded',
        document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
        document_title: documentTitle,
        details: `Downloaded as ${format.toUpperCase()}`,
      });
    }
  };

  // Split content for preview (free users)
  const lines = content.split('\n');
  const previewLineCount = Math.max(Math.floor(lines.length * 0.5), 25);
  const previewContent = lines.slice(0, previewLineCount).join('\n');
  const hasMoreContent = lines.length > previewLineCount;

  // Still loading - show skeleton
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-4/6"></div>
        </div>
      </Card>
    );
  }

  // PAID USER: Show full document with save/export
  if (isPaidUser) {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold">Your {documentType}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload('md')}>
                <Download className="h-4 w-4 mr-1" /> MD
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload('html')}>
                <Download className="h-4 w-4 mr-1" /> HTML
              </Button>
            </div>
          </div>
          
          {/* Full Document Content */}
          <div className="bg-slate-50 rounded-lg p-6 max-h-[500px] overflow-y-auto mb-4">
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold text-slate-800 mt-6 mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-medium text-slate-700 mt-4 mb-2">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-600 leading-relaxed mb-3">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 mb-3 text-slate-600">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-600">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-slate-800">{children}</strong>
                  ),
                  hr: () => (
                    <hr className="my-4 border-slate-200" />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Save Section */}
          {!saved ? (
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="docTitle" className="text-sm text-muted-foreground">Document Title</Label>
                  <Input
                    id="docTitle"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="My Privacy Policy"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSave} className="btn-gradient" disabled={saving}>
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {saving ? "Saving..." : "Save to Dashboard"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Document saved to your dashboard!</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/documents/${savedDocId}`}>
                    View Document <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // FREE USER: Show preview with upgrade CTA
  return (
    <div className="space-y-4">
      <Card className="p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your {documentType}</h2>
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <Lock className="h-4 w-4" />
            Preview Only
          </div>
        </div>
        
        {/* Preview Content - Scrollable */}
        <div className="bg-slate-50 rounded-lg p-6 relative max-h-[500px] overflow-y-auto">
          <div className="prose prose-sm prose-slate max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold text-slate-800 mt-6 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-medium text-slate-700 mt-4 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-slate-600 leading-relaxed mb-3">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 mb-3 text-slate-600">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-slate-600">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-800">{children}</strong>
                ),
                hr: () => (
                  <hr className="my-4 border-slate-200" />
                ),
              }}
            >
              {previewContent}
            </ReactMarkdown>
          </div>
          
          {/* Fade Overlay */}
          {hasMoreContent && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent" />
          )}
        </div>

        {/* Locked Content Overlay */}
        {hasMoreContent && (
          <div className="mt-4 relative">
            <div className="bg-slate-100 rounded-lg p-6 relative overflow-hidden">
              <div className="blur-sm select-none pointer-events-none text-slate-400">
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Data Security</h3>
                  <p className="text-sm leading-relaxed">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
                  <h3 className="text-base font-medium">Data Retention</h3>
                  <p className="text-sm leading-relaxed">We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
                </div>
              </div>
              
              {/* Lock Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 backdrop-blur-[2px]">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-slate-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Full Document Locked</h3>
                  <p className="text-muted-foreground text-sm mb-4 max-w-xs">
                    Upgrade to Pro to unlock the complete {documentType.toLowerCase()}, export options, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Upgrade CTA Card */}
      <Card className="p-6 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-teal-600" />
              <h3 className="font-semibold text-lg">Unlock Full Document</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Get the complete {documentType.toLowerCase()} with all sections, plus:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600" />
                Full document access
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600" />
                Word & PDF export
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600" />
                No branding in docs
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600" />
                Save to dashboard
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-teal-700">$9<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              <p className="text-xs text-muted-foreground">or $79/year (save 27%)</p>
            </div>
            <Button className="btn-gradient" size="lg" asChild>
              <Link href={user ? "/dashboard/billing" : "/signup?plan=pro"}>
                {user ? "Upgrade to Pro" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link href="/pricing" className="text-sm text-center text-muted-foreground hover:text-foreground">
              Compare all plans →
            </Link>
          </div>
        </div>
      </Card>

      {/* What You'll Get */}
      <Card className="p-4 bg-slate-50 border-dashed">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">This preview shows approximately 50% of your document.</strong> The full {documentType.toLowerCase()} includes additional sections covering data security, retention policies, user rights, contact information, and more — all customized based on your selections.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
