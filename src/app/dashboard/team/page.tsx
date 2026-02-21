"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { 
  Users, UserPlus, Mail, Shield, Eye, Edit, Crown, 
  MoreVertical, Trash2, Loader2, Check, AlertCircle,
  Send
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase";

type Role = "view" | "edit" | "admin";

interface TeamMember {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  status: "pending" | "active";
  invited_at: string;
  joined_at: string | null;
}

const roles = [
  { value: "view", label: "View Only", description: "Can view documents", icon: Eye },
  { value: "edit", label: "View & Edit", description: "Can view and edit documents", icon: Edit },
  { value: "admin", label: "Full Admin", description: "Full access including team management", icon: Shield },
];

const getRoleInfo = (role: Role) => {
  return roles.find(r => r.value === role) || roles[0];
};

export default function TeamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [plan, setPlan] = useState<string>("free");
  const [isOwner, setIsOwner] = useState(false);
  
  // Invite form
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("edit");
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    async function loadTeam() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      // Check user's plan
      const userPlan = user.user_metadata?.plan || "free";
      setPlan(userPlan);

      if (userPlan !== "premium") {
        setLoading(false);
        return;
      }

      // Check if user is team owner
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_team_owner, team_id')
        .eq('id', user.id)
        .single();

      setIsOwner(profile?.is_team_owner || true); // Default to true for account owner

      // Load team members
      const { data: teamMembers } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_owner_id', user.id)
        .order('invited_at', { ascending: false });

      if (teamMembers) {
        setMembers(teamMembers);
      }

      setLoading(false);
    }

    loadTeam();
  }, [router]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError("");
    setInviteSuccess(false);

    if (!inviteEmail.trim()) {
      setInviteError("Please enter an email address");
      return;
    }

    if (members.length >= 5) {
      setInviteError("Maximum team size reached (5 members)");
      return;
    }

    if (members.some(m => m.email.toLowerCase() === inviteEmail.toLowerCase())) {
      setInviteError("This email has already been invited");
      return;
    }

    setInviting(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setInviteError("Not authenticated");
      setInviting(false);
      return;
    }

    // Create team member invite
    const { error } = await supabase
      .from('team_members')
      .insert({
        team_owner_id: user.id,
        email: inviteEmail.toLowerCase(),
        role: inviteRole,
        status: 'pending',
        invited_at: new Date().toISOString(),
      });

    if (error) {
      setInviteError(error.message);
      setInviting(false);
      return;
    }

    // TODO: Send actual invite email via API

    // Add to local state
    setMembers([
      {
        id: Date.now().toString(),
        email: inviteEmail.toLowerCase(),
        name: null,
        role: inviteRole,
        status: 'pending',
        invited_at: new Date().toISOString(),
        joined_at: null,
      },
      ...members,
    ]);

    setInviteEmail("");
    setInviteRole("edit");
    setInviteSuccess(true);
    setInviting(false);
    setTimeout(() => setInviteSuccess(false), 3000);
  };

  const handleRemoveMember = async (memberId: string) => {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (!error) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const handleChangeRole = async (memberId: string, newRole: Role) => {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('team_members')
      .update({ role: newRole })
      .eq('id', memberId);

    if (!error) {
      setMembers(members.map(m => 
        m.id === memberId ? { ...m, role: newRole } : m
      ));
    }
  };

  const handleResendInvite = async (email: string) => {
    // TODO: Implement resend invite email
    alert(`Invite resent to ${email}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  // Not on Premium plan
  if (plan !== "premium") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground">Collaborate with your team members</p>
        </div>

        <Card className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Team collaboration is available on the Premium plan. Invite up to 5 team members 
            to view, edit, and manage your legal documents together.
          </p>
          <Button className="btn-gradient" asChild>
            <a href="/dashboard/billing">Upgrade to Premium</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Team</h1>
        <p className="text-muted-foreground">
          Manage your team members ({members.length}/5 seats used)
        </p>
      </div>

      {/* Invite Form */}
      {isOwner && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </h2>

          {inviteSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
              <Check className="h-4 w-4" />
              Invitation sent successfully!
            </div>
          )}

          {inviteError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4" />
              {inviteError}
            </div>
          )}

          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="pl-10"
                    disabled={members.length >= 5}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <role.icon className="h-4 w-4" />
                          <span>{role.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {getRoleInfo(inviteRole).description}
              </p>
              <Button type="submit" disabled={inviting || members.length >= 5}>
                {inviting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {inviting ? "Sending..." : "Send Invite"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Team Members List */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Members
        </h2>

        {members.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No team members yet</h3>
            <p className="text-sm text-muted-foreground">
              Invite colleagues to collaborate on your legal documents.
            </p>
          </Card>
        ) : (
          <Card className="divide-y">
            {members.map((member) => {
              const roleInfo = getRoleInfo(member.role);
              const RoleIcon = roleInfo.icon;
              
              return (
                <div key={member.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    {member.name ? (
                      <span className="font-medium text-slate-600">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <Mail className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {member.name || member.email}
                      </span>
                      {member.status === "pending" && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {member.name && <span className="truncate">{member.email}</span>}
                      {!member.name && (
                        <span>Invited {new Date(member.invited_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <RoleIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{roleInfo.label}</span>
                  </div>
                  {isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {roles.map((role) => (
                          <DropdownMenuItem
                            key={role.value}
                            onClick={() => handleChangeRole(member.id, role.value as Role)}
                            className={member.role === role.value ? "bg-slate-100" : ""}
                          >
                            <role.icon className="h-4 w-4 mr-2" />
                            {role.label}
                            {member.role === role.value && (
                              <Check className="h-4 w-4 ml-auto" />
                            )}
                          </DropdownMenuItem>
                        ))}
                        {member.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleResendInvite(member.email)}>
                            <Send className="h-4 w-4 mr-2" />
                            Resend Invite
                          </DropdownMenuItem>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove {member.name || member.email} from your team. 
                                They will lose access to all shared documents.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleRemoveMember(member.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              );
            })}
          </Card>
        )}
      </div>

      {/* Role Permissions Info */}
      <Card className="p-6 bg-slate-50">
        <h3 className="font-semibold mb-4">Role Permissions</h3>
        <div className="space-y-3">
          {roles.map((role) => (
            <div key={role.value} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center shrink-0">
                <role.icon className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <div className="font-medium text-sm">{role.label}</div>
                <div className="text-xs text-muted-foreground">{role.description}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
