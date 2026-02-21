"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, Mail, Lock, Save, AlertCircle, Check, Trash2, Building2, Globe, MapPin, Loader2
} from "lucide-react";
import { createClient } from "@/lib/supabase";

interface CompanyProfile {
  company_name: string;
  company_website: string;
  company_email: string;
  company_address: string;
  company_phone: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // User profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Company profile
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  
  // Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
        
        // Load company profile from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_name, company_website, company_email, company_address, company_phone')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setCompanyName(profile.company_name || "");
          setCompanyWebsite(profile.company_website || "");
          setCompanyEmail(profile.company_email || "");
          setCompanyAddress(profile.company_address || "");
          setCompanyPhone(profile.company_phone || "");
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError("Not authenticated");
      setSaving(false);
      return;
    }

    // Update user metadata
    const { error: userError } = await supabase.auth.updateUser({
      data: { full_name: name }
    });

    if (userError) {
      setError(userError.message);
      setSaving(false);
      return;
    }

    // Update or insert company profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        company_name: companyName,
        company_website: companyWebsite,
        company_email: companyEmail,
        company_address: companyAddress,
        company_phone: companyPhone,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      setError(profileError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setSuccess("Profile saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setSavingPassword(true);
    setError("");
    setSuccess("");
    
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setError(error.message);
      setSavingPassword(false);
      return;
    }

    setSavingPassword(false);
    setSuccess("Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone. All your documents and data will be permanently deleted.")) {
      return;
    }
    
    // TODO: Implement full account deletion (requires server-side admin API)
    alert("Please contact support@termszipp.com to delete your account.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and company profile</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check className="h-4 w-4" />
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Profile Settings */}
      <form onSubmit={handleSaveProfile}>
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Personal Profile</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="pl-10 bg-slate-50"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Contact support to change your email address
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Company Profile</h2>
              <p className="text-sm text-muted-foreground">
                This information will auto-fill your legal documents
              </p>
            </div>
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company / Business Name</Label>
              <div className="relative mt-1">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="pl-10"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyWebsite">Website URL</Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyWebsite"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  className="pl-10"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyEmail">Contact Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyEmail"
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="pl-10"
                  placeholder="contact@example.com"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This will appear in your legal documents as the contact email
              </p>
            </div>

            <div>
              <Label htmlFor="companyPhone">Phone Number</Label>
              <Input
                id="companyPhone"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="companyAddress">Business Address</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="pl-10 min-h-[80px]"
                  placeholder="123 Main Street&#10;Suite 100&#10;City, State 12345"
                />
              </div>
            </div>
          </div>
        </Card>

        <Button type="submit" disabled={saving} className="btn-gradient">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </form>

      {/* Password */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" variant="outline" disabled={savingPassword || !newPassword}>
            {savingPassword ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Lock className="h-4 w-4 mr-2" />}
            {savingPassword ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <h2 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. All your documents and data will be permanently deleted.
        </p>
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={handleDeleteAccount}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
