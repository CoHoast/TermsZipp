import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

// Parse markdown-style text to structured content
function parseMarkdownToSections(markdown: string): Array<{type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'bullet', text: string}> {
  const lines = markdown.split('\n');
  const sections: Array<{type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'bullet', text: string}> = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    if (trimmed.startsWith('### ')) {
      sections.push({ type: 'heading3', text: trimmed.replace('### ', '') });
    } else if (trimmed.startsWith('## ')) {
      sections.push({ type: 'heading2', text: trimmed.replace('## ', '') });
    } else if (trimmed.startsWith('# ')) {
      sections.push({ type: 'heading1', text: trimmed.replace('# ', '') });
    } else if (trimmed.startsWith('- ')) {
      sections.push({ type: 'bullet', text: trimmed.replace('- ', '').replace(/\*\*/g, '') });
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      // Bold line - treat as paragraph
      sections.push({ type: 'paragraph', text: trimmed.replace(/\*\*/g, '') });
    } else if (!trimmed.startsWith('---')) {
      // Regular paragraph - clean up markdown formatting
      sections.push({ type: 'paragraph', text: trimmed.replace(/\*\*/g, '').replace(/\*/g, '') });
    }
  }
  
  return sections;
}

// Export as Word document
export async function exportToWord(content: string, filename: string): Promise<void> {
  const sections = parseMarkdownToSections(content);
  
  const children: Paragraph[] = [];
  
  for (const section of sections) {
    switch (section.type) {
      case 'heading1':
        children.push(
          new Paragraph({
            text: section.text,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        break;
      case 'heading2':
        children.push(
          new Paragraph({
            text: section.text,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 },
          })
        );
        break;
      case 'heading3':
        children.push(
          new Paragraph({
            text: section.text,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          })
        );
        break;
      case 'bullet':
        children.push(
          new Paragraph({
            children: [new TextRun({ text: '• ' + section.text, size: 24 })],
            spacing: { before: 50, after: 50 },
            indent: { left: 720 },
          })
        );
        break;
      case 'paragraph':
        children.push(
          new Paragraph({
            children: [new TextRun({ text: section.text, size: 24 })],
            spacing: { before: 100, after: 100 },
          })
        );
        break;
    }
  }
  
  // Add footer
  children.push(
    new Paragraph({
      children: [
        new TextRun({ 
          text: '---',
          size: 24,
        })
      ],
      spacing: { before: 400 },
    })
  );
  children.push(
    new Paragraph({
      children: [
        new TextRun({ 
          text: 'Generated with TermsZipp (termszipp.com) - Review by a qualified attorney recommended.',
          size: 20,
          italics: true,
          color: '666666',
        })
      ],
      spacing: { before: 100 },
    })
  );

  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
}

// Export as PDF
export function exportToPDF(content: string, filename: string): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let y = margin;
  const lineHeight = 6;

  const sections = parseMarkdownToSections(content);

  for (const section of sections) {
    // Check if we need a new page
    if (y > pageHeight - margin - 20) {
      doc.addPage();
      y = margin;
    }

    switch (section.type) {
      case 'heading1':
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        y += 8;
        doc.text(section.text, margin, y);
        y += lineHeight + 4;
        break;
      case 'heading2':
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y += 6;
        doc.text(section.text, margin, y);
        y += lineHeight + 2;
        break;
      case 'heading3':
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        y += 4;
        doc.text(section.text, margin, y);
        y += lineHeight + 1;
        break;
      case 'bullet':
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const bulletText = '• ' + section.text;
        const bulletLines = doc.splitTextToSize(bulletText, maxWidth - 10);
        for (const line of bulletLines) {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin + 5, y);
          y += lineHeight - 1;
        }
        break;
      case 'paragraph':
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(section.text, maxWidth);
        for (const line of lines) {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight - 1;
        }
        y += 2;
        break;
    }
  }

  // Add footer
  y += 10;
  if (y > pageHeight - margin - 10) {
    doc.addPage();
    y = margin;
  }
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Generated with TermsZipp (termszipp.com) - Review by a qualified attorney recommended.', margin, y);

  doc.save(`${filename}.pdf`);
}

// Export as Markdown (existing functionality)
export function exportToMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
