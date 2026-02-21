"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, User, MessageSquare, Send, Check, AlertCircle,
  HelpCircle, FileText, CreditCard
} from "lucide-react";

const topics = [
  { id: "general", name: "General Inquiry", icon: MessageSquare },
  { id: "support", name: "Technical Support", icon: HelpCircle },
  { id: "billing", name: "Billing Question", icon: CreditCard },
  { id: "feature", name: "Feature Request", icon: FileText },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const getTopicName = (id: string) => {
    return topics.find(t => t.id === id)?.name || "General Inquiry";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: getTopicName(topic),
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTopic("general");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Message Sent!</h1>
          <p className="text-muted-foreground mb-2">
            Thanks for reaching out! We've sent you a confirmation email.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We'll get back to you within 24-48 hours.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button className="btn-gradient" onClick={() => setSubmitted(false)}>
              Send Another
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-muted-foreground">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <Card className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Selection */}
              <div>
                <Label className="mb-3 block">What can we help you with?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {topics.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                          topic === t.id
                            ? "border-teal-500 bg-teal-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${topic === t.id ? "text-teal-600" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Your Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="mt-1 min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-gradient" disabled={loading}>
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* FAQ Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Looking for quick answers?{" "}
            <Link href="/faq" className="text-teal-600 hover:text-teal-700">
              Check our FAQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
