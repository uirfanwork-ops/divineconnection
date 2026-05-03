import { ExternalLink } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Documents</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Shared Google Drive documents for the retreat.
      </p>
      <div className="mt-6 rounded-lg border bg-card p-8">
        <a
          href="https://drive.google.com/drive/folders/1k5PAuWS8js0B7TNXUjwBXcyTYzRRVbfj?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          Open Retreat Documents Folder
        </a>
      </div>
    </div>
  );
}
