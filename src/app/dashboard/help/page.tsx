"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HelpCircle, Mail, MessageSquare, ChevronDown, ChevronUp,
  FileText, Shield, CreditCard, Users, Send, Loader2, Check,
  ExternalLink
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    icon: FileText,
    questions: [
      {
        q: "How do I generate a legal document?",
        a: "From your dashboard, click 'New Document' or choose a document type from the Quick Generate section. Fill out the form wizard with your business details, and your document will be generated instantly. Pro and Premium users can access the full document and export it in multiple formats."
      },
      {
        q: "What information do I need to create a document?",
        a: "You'll typically need your company name, website URL, contact email, and business address. For specific documents like Privacy Policy, you may also need to specify what data you collect and how you use it. Saving your company profile in Settings will auto-fill most of this information."
      },
      {
        q: "Can I edit documents after they're generated?",
        a: "Yes! All generated documents can be edited from your Documents page. Click 'Edit' on any document to modify the content. Changes are saved automatically when you click Save."
      },
    ]
  },
  {
    category: "Documents & Legal",
    icon: Shield,
    questions: [
      {
        q: "Are these documents legally binding?",
        a: "Our documents are templates designed to help you get started with essential legal pages. While they cover common scenarios and follow best practices, we recommend having a lawyer review them for your specific situation, especially for complex businesses or specific jurisdictions."
      },
      {
        q: "What documents do I need for my website?",
        a: "At minimum, most websites need a Privacy Policy (required by law if you collect any user data) and Terms of Service. If you use cookies, you'll also need a Cookie Policy. E-commerce sites should add a Refund Policy, and software products typically need an EULA."
      },
      {
        q: "How often should I update my legal documents?",
        a: "We recommend reviewing your legal documents at least annually, or whenever you make significant changes to your business practices, data collection, or services. TermsZipp makes it easy to update and re-export your documents anytime."
      },
    ]
  },
  {
    category: "Billing & Plans",
    icon: CreditCard,
    questions: [
      {
        q: "What's the difference between Free, Pro, and Premium?",
        a: "Free users can preview documents but can't access the full content or export. Pro ($9/mo) gives you full access to all documents, exports, and up to 25 documents per month. Premium ($19/mo) includes unlimited documents, bulk generation, and team features for up to 5 members."
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, you can cancel anytime from the Billing page. You'll continue to have access until the end of your current billing period. Your saved documents remain accessible even after downgrading."
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact us within 7 days of your purchase for a full refund."
      },
    ]
  },
  {
    category: "Team Features",
    icon: Users,
    questions: [
      {
        q: "How do team invites work?",
        a: "Premium users can invite up to 5 team members. Go to the Team page, enter their email, and select their role. They'll receive an invitation email to join your team. Team members share your document library but have their own login credentials."
      },
      {
        q: "What are the different team roles?",
        a: "View Only: Can view documents but not edit or create. View & Edit: Can view and edit existing documents, but can't delete or manage team. Full Admin: Full access including creating, deleting documents, and managing team members."
      },
      {
        q: "Can team members have their own company profiles?",
        a: "Team members share the organization's company profile for document generation. Only admins can modify the company profile in Settings."
      },
    ]
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // TODO: Implement actual email sending via API
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setContactSubject("");
      setContactMessage("");
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Find answers or get in touch with our team</p>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4 hover:border-teal-200 transition-colors cursor-pointer" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="font-medium">FAQ</div>
              <div className="text-xs text-muted-foreground">Common questions</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:border-teal-200 transition-colors cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Contact Us</div>
              <div className="text-xs text-muted-foreground">Get in touch</div>
            </div>
          </div>
        </Card>
        
        <a href="mailto:support@termszipp.com">
          <Card className="p-4 hover:border-teal-200 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">Email Support</div>
                <div className="text-xs text-muted-foreground">support@termszipp.com</div>
              </div>
            </div>
          </Card>
        </a>
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category} className="overflow-hidden">
                <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
                  <Icon className="h-5 w-5 text-slate-600" />
                  <h3 className="font-medium">{category.category}</h3>
                </div>
                <div className="divide-y">
                  {category.questions.map((faq, idx) => {
                    const faqId = `${category.category}-${idx}`;
                    const isOpen = openFaq === faqId;
                    return (
                      <div key={idx}>
                        <button
                          onClick={() => toggleFaq(faqId)}
                          className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-medium pr-4">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact">
        <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
        <Card className="p-6">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground text-sm">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="What can we help you with?"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Describe your question or issue in detail..."
                  className="mt-1 min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="btn-gradient" disabled={sending}>
                {sending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </Card>
      </div>

      {/* Additional Resources */}
      <Card className="p-6 bg-slate-50">
        <h3 className="font-semibold mb-3">Additional Resources</h3>
        <div className="space-y-2 text-sm">
          <a href="/our-terms" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
            <ExternalLink className="h-4 w-4" />
            Terms of Service
          </a>
          <a href="/our-privacy" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
            <ExternalLink className="h-4 w-4" />
            Privacy Policy
          </a>
          <a href="/refund-policy" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
            <ExternalLink className="h-4 w-4" />
            Refund Policy
          </a>
        </div>
      </Card>
    </div>
  );
}
