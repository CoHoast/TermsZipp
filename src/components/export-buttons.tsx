"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Check, Download, FileText, FileIcon, ChevronDown } from "lucide-react";
import { exportToWord, exportToPDF, exportToMarkdown } from "@/lib/document-export";

interface ExportButtonsProps {
  content: string;
  filename: string;
}

export function ExportButtons({ content, filename }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportWord = async () => {
    setDownloading(true);
    try {
      await exportToWord(content, filename);
    } catch (error) {
      console.error('Error exporting to Word:', error);
    }
    setDownloading(false);
  };

  const handleExportPDF = () => {
    setDownloading(true);
    try {
      exportToPDF(content, filename);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
    setDownloading(false);
  };

  const handleExportMarkdown = () => {
    exportToMarkdown(content, filename);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={downloading}>
            <Download className="h-4 w-4 mr-1" />
            Download
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExportWord} className="cursor-pointer">
            <FileText className="h-4 w-4 mr-2 text-blue-600" />
            Word Document (.docx)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
            <FileIcon className="h-4 w-4 mr-2 text-red-600" />
            PDF Document (.pdf)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportMarkdown} className="cursor-pointer">
            <FileText className="h-4 w-4 mr-2 text-gray-600" />
            Markdown (.md)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
