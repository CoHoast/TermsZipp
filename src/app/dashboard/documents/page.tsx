"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, Shield, Cookie, AlertTriangle, RefreshCw, ScrollText,
  Plus, Search, Filter, Clock, Download, Star, MoreVertical, Trash2, Edit, Eye, Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase";

interface Document {
  id: string;
  title: string;
  document_type: string;
  is_favorite: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}

const documentTypes = [
  { type: "privacy-policy", name: "Privacy Policy", icon: Shield },
  { type: "terms-of-service", name: "Terms of Service", icon: FileText },
  { type: "cookie-policy", name: "Cookie Policy", icon: Cookie },
  { type: "disclaimer", name: "Disclaimer", icon: AlertTriangle },
  { type: "refund-policy", name: "Refund Policy", icon: RefreshCw },
  { type: "eula", name: "EULA", icon: ScrollText },
];

const getTypeIcon = (type: string) => {
  const docType = documentTypes.find(d => d.type === type);
  return docType?.icon || FileText;
};

const getTypeName = (type: string) => {
  const docType = documentTypes.find(d => d.type === type);
  return docType?.name || type;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocuments() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (data) {
        setDocuments(data);
      }
      setLoading(false);
    }

    loadDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || doc.document_type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage your saved legal documents</p>
        </div>
        <Button className="btn-gradient" asChild>
          <Link href="/">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Link>
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {filterType ? getTypeName(filterType) : "All Types"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterType(null)}>
              All Types
            </DropdownMenuItem>
            {documentTypes.map((type) => (
              <DropdownMenuItem key={type.type} onClick={() => setFilterType(type.type)}>
                <type.icon className="h-4 w-4 mr-2" />
                {type.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Documents List */}
      {filteredDocuments.length > 0 ? (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => {
            const Icon = getTypeIcon(doc.document_type);
            return (
              <Card key={doc.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{doc.title}</span>
                      {doc.is_favorite && <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{getTypeName(doc.document_type)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {doc.download_count || 0} downloads
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(doc.updated_at || doc.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/documents/${doc.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/documents/${doc.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          {doc.is_favorite ? "Unfavorite" : "Favorite"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">
            {searchQuery || filterType ? "No documents found" : "No documents yet"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery || filterType 
              ? "Try adjusting your search or filter criteria."
              : "Generate your first legal document to get started."
            }
          </p>
          {!searchQuery && !filterType && (
            <Button className="btn-gradient" asChild>
              <Link href="/">
                <Plus className="h-4 w-4 mr-2" />
                Create Document
              </Link>
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
