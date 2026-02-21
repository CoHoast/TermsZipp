"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Sparkles, ArrowRight, FileText, Download, Check } from "lucide-react";
import Link from "next/link";

interface DocumentPreviewGateProps {
  content: string;
  documentType: string;
}

export function DocumentPreviewGate({ content, documentType }: DocumentPreviewGateProps) {
  // Split content into lines and show first ~25%
  const lines = content.split('\n');
  const previewLineCount = Math.max(Math.floor(lines.length * 0.25), 15); // At least 15 lines
  const previewContent = lines.slice(0, previewLineCount).join('\n');
  const hasMoreContent = lines.length > previewLineCount;

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
        
        {/* Preview Content */}
        <div className="bg-slate-50 rounded-lg p-6 relative">
          <div className="legal-document whitespace-pre-wrap font-mono text-sm">
            {previewContent}
          </div>
          
          {/* Fade Overlay */}
          {hasMoreContent && (
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent" />
          )}
        </div>

        {/* Locked Content Overlay */}
        {hasMoreContent && (
          <div className="mt-4 relative">
            {/* Blurred placeholder text */}
            <div className="bg-slate-100 rounded-lg p-6 relative overflow-hidden">
              <div className="blur-sm select-none pointer-events-none text-slate-400 font-mono text-sm leading-relaxed">
                <p>## Data Security</p>
                <p className="mt-2">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
                <p className="mt-4">## Data Retention</p>
                <p className="mt-2">We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
                <p className="mt-4">## Changes to This Policy</p>
                <p className="mt-2">We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page...</p>
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
              <Link href="/signup?plan=pro">
                Upgrade to Pro <ArrowRight className="ml-2 h-4 w-4" />
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
              <strong className="text-foreground">This preview shows approximately 25% of your document.</strong> The full {documentType.toLowerCase()} includes additional sections covering data security, retention policies, user rights, contact information, and more — all customized based on your selections.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
