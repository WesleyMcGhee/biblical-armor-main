import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>
      <div className="flex flex-col items-center justify-center py-24 bg-muted/30 rounded-lg border border-border border-dashed">
        <Settings className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-medium">Settings coming soon</p>
        <p className="text-sm text-muted-foreground mt-1">
          Global site configuration will appear here.
        </p>
      </div>
    </div>
  );
}
