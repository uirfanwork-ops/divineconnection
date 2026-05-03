export default function DocumentsPage() {
  const folderId = process.env.NEXT_PUBLIC_GDRIVE_FOLDER_ID;

  if (!folderId) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground">Documents</h1>
        <div className="mt-6 rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Google Drive folder ID not configured. Set the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              NEXT_PUBLIC_GDRIVE_FOLDER_ID
            </code>{" "}
            environment variable.
          </p>
        </div>
      </div>
    );
  }

  const embedUrl = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Documents</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Shared Google Drive documents for the retreat.
      </p>
      <div className="mt-6 overflow-hidden rounded-lg border bg-card">
        <iframe
          src={embedUrl}
          className="h-[calc(100vh-200px)] w-full border-0"
          title="Google Drive Documents"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
