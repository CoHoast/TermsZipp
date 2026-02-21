"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, FileText, Download, Edit, Trash2, Plus, Eye, 
  Shield, Cookie, AlertTriangle, RefreshCw, ScrollText,
  Loader2, Calendar
} from "lucide-react";
import { createClient } from "@/lib/supabase";

interface ActivityItem {
  id: string;
  action: string;
  document_type: string | null;
  document_title: string | null;
  details: string | null;
  created_at: string;
}

const documentTypes = [
  { type: "privacy-policy", name: "Privacy Policy", icon: Shield },
  { type: "terms-of-service", name: "Terms of Service", icon: FileText },
  { type: "cookie-policy", name: "Cookie Policy", icon: Cookie },
  { type: "disclaimer", name: "Disclaimer", icon: AlertTriangle },
  { type: "refund-policy", name: "Refund Policy", icon: RefreshCw },
  { type: "eula", name: "EULA", icon: ScrollText },
];

const getTypeIcon = (type: string | null) => {
  if (!type) return FileText;
  const docType = documentTypes.find(d => d.type === type);
  return docType?.icon || FileText;
};

const getActionIcon = (action: string) => {
  switch (action) {
    case "created": return Plus;
    case "edited": return Edit;
    case "viewed": return Eye;
    case "downloaded": return Download;
    case "deleted": return Trash2;
    default: return Activity;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case "created": return "text-green-600 bg-green-50";
    case "edited": return "text-blue-600 bg-blue-50";
    case "viewed": return "text-slate-600 bg-slate-50";
    case "downloaded": return "text-purple-600 bg-purple-50";
    case "deleted": return "text-red-600 bg-red-50";
    default: return "text-slate-600 bg-slate-50";
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

const formatFullDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function loadActivity() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Try to load from activity_log table
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data && !error) {
        setActivities(data);
      }
      
      setLoading(false);
    }
    
    loadActivity();
  }, []);

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(a => a.action === filter);

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, ActivityItem[]>);

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
          <h1 className="text-2xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">Track your document history and actions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["all", "created", "edited", "downloaded", "deleted"].map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption)}
            className={filter === filterOption ? "btn-gradient" : ""}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </Button>
        ))}
      </div>

      {/* Activity List */}
      {activities.length === 0 ? (
        <Card className="p-8 text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No activity yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your document actions will appear here once you start creating and editing documents.
          </p>
          <Button className="btn-gradient" asChild>
            <a href="/">Create Your First Document</a>
          </Button>
        </Card>
      ) : filteredActivities.length === 0 ? (
        <Card className="p-8 text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No {filter} activities</h3>
          <p className="text-sm text-muted-foreground">
            Try selecting a different filter.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">
                  {new Date(date).toDateString() === new Date().toDateString() 
                    ? "Today" 
                    : new Date(date).toDateString() === new Date(Date.now() - 86400000).toDateString()
                      ? "Yesterday"
                      : new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                  }
                </h3>
              </div>
              <Card className="divide-y">
                {dayActivities.map((activity) => {
                  const ActionIcon = getActionIcon(activity.action);
                  const DocIcon = getTypeIcon(activity.document_type);
                  const actionColor = getActionColor(activity.action);
                  
                  return (
                    <div key={activity.id} className="p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${actionColor}`}>
                        <ActionIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">{activity.action}</span>
                          {activity.document_title && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <DocIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate">{activity.document_title}</span>
                            </>
                          )}
                        </div>
                        {activity.details && (
                          <p className="text-sm text-muted-foreground truncate">{activity.details}</p>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground shrink-0" title={formatFullDate(activity.created_at)}>
                        {formatDate(activity.created_at)}
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Activity className="h-5 w-5 text-blue-600 shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Activity tracking:</strong> We automatically log when you create, edit, download, 
            or delete documents. This helps you keep track of changes and maintain version history.
          </div>
        </div>
      </Card>
    </div>
  );
}
