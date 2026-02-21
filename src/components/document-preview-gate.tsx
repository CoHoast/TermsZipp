"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Sparkles, ArrowRight, Check, Save, Download, Copy, Loader2, FileDown, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

interface DocumentPreviewGateProps {
  content: string;
  documentType: string;
  documentTypeSlug?: string;
  formData?: Record<string, unknown>;
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

    await supabase.from('activity_log').insert({
      user_id: user.id,
      action: 'created',
      document_id: doc.id,
      document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
      document_title: documentTitle,
    });

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('documents_generated_this_month')
        .eq('id', user.id)
        .single();
      
      await supabase
        .from('profiles')
        .update({ 
          documents_generated_this_month: (profile?.documents_generated_this_month || 0) + 1 
        })
        .eq('id', user.id);
    } catch (e) {
      // Ignore increment errors
    }

    setSavedDocId(doc.id);
    setSaved(true);
    setSaving(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const lines = content.split('\n');
    
    for (const line of lines) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      if (line.startsWith('# ')) {
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const text = line.replace('# ', '');
        doc.text(text, margin, y);
        y += 12;
      } else if (line.startsWith('## ')) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        const text = line.replace('## ', '');
        y += 4;
        doc.text(text, margin, y);
        y += 10;
      } else if (line.startsWith('### ')) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        const text = line.replace('### ', '');
        y += 2;
        doc.text(text, margin, y);
        y += 8;
      } else if (line.startsWith('- ')) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const text = '• ' + line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1');
        const splitText = doc.splitTextToSize(text, maxWidth - 5);
        doc.text(splitText, margin + 5, y);
        y += splitText.length * 5;
      } else if (line.trim()) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const text = line.replace(/\*\*(.*?)\*\*/g, '$1');
        const splitText = doc.splitTextToSize(text, maxWidth);
        doc.text(splitText, margin, y);
        y += splitText.length * 5;
      } else {
        y += 3;
      }
    }

    doc.save(`${documentTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`);

    if (user && isPaidUser) {
      const supabase = createClient();
      supabase.from('activity_log').insert({
        user_id: user.id,
        action: 'downloaded',
        document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
        document_title: documentTitle,
        details: 'Downloaded as PDF',
      });
    }
  };

  const handleDownloadWord = async () => {
    const paragraphs: Paragraph[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      if (line.startsWith('# ')) {
        paragraphs.push(new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1,
        }));
      } else if (line.startsWith('## ')) {
        paragraphs.push(new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2,
        }));
      } else if (line.startsWith('### ')) {
        paragraphs.push(new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3,
        }));
      } else if (line.startsWith('- ')) {
        paragraphs.push(new Paragraph({
          children: [new TextRun({ text: line.replace('- ', ''), })],
          bullet: { level: 0 },
        }));
      } else if (line.trim()) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const children = parts.map(part => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return new TextRun({ text: part.slice(2, -2), bold: true });
          }
          return new TextRun({ text: part });
        });
        paragraphs.push(new Paragraph({ children }));
      } else {
        paragraphs.push(new Paragraph({ text: '' }));
      }
    }

    const doc = new Document({
      sections: [{ children: paragraphs }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.docx`;
    a.click();
    URL.revokeObjectURL(url);

    if (user && isPaidUser) {
      const supabase = createClient();
      supabase.from('activity_log').insert({
        user_id: user.id,
        action: 'downloaded',
        document_type: documentTypeSlug || documentType.toLowerCase().replace(/\s+/g, '-'),
        document_title: documentTitle,
        details: 'Downloaded as Word',
      });
    }
  };

  // Split content for preview (free users)
  const lines = content.split('\n');
  const previewLineCount = Math.max(Math.floor(lines.length * 0.5), 25);
  const previewContent = lines.slice(0, previewLineCount).join('\n');

  // Loading skeleton
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

  // PAID USER: Full document with save/export
  if (isPaidUser) {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold">Your {documentType}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <FileDown className="h-4 w-4 mr-1" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadWord}>
                <FileDown className="h-4 w-4 mr-1" /> Word
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload('md')}>
                <Download className="h-4 w-4 mr-1" /> MD
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload('html')}>
                <Download className="h-4 w-4 mr-1" /> HTML
              </Button>
            </div>
          </div>
          
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

        {/* Legal Disclaimer for paid users */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground px-1">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <p>This document is a template and may not cover all legal requirements. We recommend having it reviewed by a qualified attorney.</p>
        </div>
      </div>
    );
  }

  // FREE USER: Preview with fade + inline upgrade
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your {documentType}</h2>
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <Lock className="h-4 w-4" />
            Preview
          </div>
        </div>
        
        {/* Preview Content with Fade */}
        <div className="relative">
          <div className="bg-slate-50 rounded-lg p-6 max-h-[450px] overflow-y-auto">
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
          </div>
          
          {/* Strong fade gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent rounded-b-lg pointer-events-none" />
        </div>

        {/* Inline Upgrade CTA - Inside the document area */}
        <div className="relative -mt-24 pt-8 pb-2">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 mx-2 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-3 shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Upgrade to See Full Document</h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-md">
                You&apos;re viewing ~50% of your {documentType.toLowerCase()}. Unlock the complete document with all sections, plus export to PDF & Word.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link href={user ? "/dashboard/billing" : "/signup?plan=pro"}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Unlock Full Document
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Starting at <strong className="text-foreground">$9/mo</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Compact Benefits + Disclaimer */}
      <div className="bg-gradient-to-br from-teal-50/50 to-cyan-50/50 border border-teal-100 rounded-xl p-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Benefits */}
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-3 text-teal-800">What you get with Pro:</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600 shrink-0" />
                <span>Full document access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600 shrink-0" />
                <span>PDF & Word export</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600 shrink-0" />
                <span>Save to dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-600 shrink-0" />
                <span>10 docs per month</span>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="hidden md:block w-px bg-teal-200" />
          
          {/* Pricing + CTA */}
          <div className="flex flex-col items-center justify-center text-center md:px-4">
            <div className="text-2xl font-bold text-teal-700">$9<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <p className="text-xs text-muted-foreground mb-2">or $79/year (save 27%)</p>
            <Link href="/pricing" className="text-xs text-teal-600 hover:underline">
              Compare plans →
            </Link>
          </div>
        </div>
        
        {/* Compact Legal Disclaimer */}
        <div className="mt-4 pt-4 border-t border-teal-100">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
            <span><strong>Disclaimer:</strong> This is a template for informational purposes. We recommend having legal documents reviewed by a qualified attorney before use.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
