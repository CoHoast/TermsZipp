"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Save, Download, Copy, Trash2, FileText, Shield, Cookie, 
  AlertTriangle, RefreshCw, ScrollText, Check, Loader2, Eye, Edit3
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createClient } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

const documentTypes = [
  { type: "privacy-policy", name: "Privacy Policy", icon: Shield },
  { type: "terms-of-service", name: "Terms of Service", icon: FileText },
  { type: "cookie-policy", name: "Cookie Policy", icon: Cookie },
  { type: "disclaimer", name: "Disclaimer", icon: AlertTriangle },
  { type: "refund-policy", name: "Refund Policy", icon: RefreshCw },
  { type: "eula", name: "EULA", icon: ScrollText },
];

const getTypeInfo = (type: string) => {
  return documentTypes.find(d => d.type === type) || { name: type, icon: FileText };
};

interface Document {
  id: string;
  user_id: string;
  title: string;
  document_type: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function DocumentEditPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;

  const [savedDoc, setSavedDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Editable fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadDocument() {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        setError("Document not found");
        setLoading(false);
        return;
      }

      setSavedDoc(data);
      setTitle(data.title);
      setContent(data.content || "");
      setLoading(false);
    }

    loadDocument();
  }, [documentId, router]);

  const handleSave = async () => {
    if (!savedDoc) return;
    
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('documents')
      .update({
        title,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', savedDoc.id);

    if (error) {
      setError("Failed to save document");
      setSaving(false);
      return;
    }

    setSavedDoc({ ...savedDoc, title, content, updated_at: new Date().toISOString() });
    setSaving(false);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!savedDoc) return;
    
    setDeleting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', savedDoc.id);

    if (error) {
      setError("Failed to delete document");
      setDeleting(false);
      return;
    }

    router.push("/dashboard/documents");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
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
${content.replace(/^# /gm, '<h1>').replace(/^## /gm, '<h2>').replace(/^### /gm, '<h3>')
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/\n\n/g, '</p><p>')
  .replace(/^- /gm, '<li>')
  .replace(/\n/g, '<br>')}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (error || !savedDoc) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/documents" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Documents
        </Link>
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="font-medium mb-2">Document Not Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error || "This document doesn't exist or you don't have access to it."}
          </p>
          <Button asChild>
            <Link href="/dashboard/documents">Go to Documents</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const typeInfo = getTypeInfo(savedDoc.document_type);
  const Icon = typeInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/documents" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Icon className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">{typeInfo.name}</span>
              {!editMode ? (
                <h1 className="text-xl font-bold">{title}</h1>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => { setEditMode(false); setTitle(savedDoc.title); setContent(savedDoc.content || ""); }}>
                Cancel
              </Button>
              <Button className="btn-gradient" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setEditMode(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{title}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete} 
                      className="bg-red-600 hover:bg-red-700"
                      disabled={deleting}
                    >
                      {deleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {/* Edit Mode */}
      {editMode && (
        <Card className="p-6 space-y-4">
          <div>
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="content">Document Content (Markdown)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 min-h-[400px] font-mono text-sm"
            />
          </div>
        </Card>
      )}

      {/* View Mode */}
      {!editMode && (
        <>
          {/* Export Actions */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
                <Download className="h-4 w-4 mr-2" />
                Markdown
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadHTML}>
                <Download className="h-4 w-4 mr-2" />
                HTML
              </Button>
              <div className="flex-1" />
              <span className="text-xs text-muted-foreground self-center">
                Last updated: {new Date(savedDoc.updated_at || savedDoc.created_at).toLocaleDateString()}
              </span>
            </div>
          </Card>

          {/* Document Content */}
          <Card className="p-6 md:p-8">
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3">{children}</h3>,
                  p: ({ children }) => <p className="text-slate-600 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-slate-600">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
