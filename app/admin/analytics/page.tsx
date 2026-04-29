import { BarChart2 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-8">Analytics</h1>
      <div className="flex flex-col items-center justify-center py-24 bg-muted/30 rounded-lg border border-border border-dashed">
        <BarChart2 className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-medium">Analytics coming soon</p>
        <p className="text-sm text-muted-foreground mt-1">
          Traffic and engagement data will appear here.
        </p>
      </div>
    </div>
  );
}
