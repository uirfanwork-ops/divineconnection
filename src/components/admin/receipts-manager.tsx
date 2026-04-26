"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle2, XCircle, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCents } from "@/lib/utils";
import {
  uploadReceipt,
  updateReceiptStatus,
  getReceiptFileUrl,
} from "@/app/admin/receipts/actions";
import type { Database, ReceiptStatus } from "@/types/database";

type Receipt = Database["public"]["Tables"]["receipts"]["Row"];

interface ReceiptsManagerProps {
  receipts: Receipt[];
}

export function ReceiptsManager({ receipts }: ReceiptsManagerProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setIsUploading(true);
      setUploadError(null);

      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.set("file", file);
        const result = await uploadReceipt(fd);
        if (result.error) {
          setUploadError(result.error);
          break;
        }
      }

      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    },
    [router]
  );

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  }

  async function handleStatusChange(id: string, status: ReceiptStatus) {
    await updateReceiptStatus(id, status);
    router.refresh();
  }

  async function handleViewFile(storagePath: string) {
    const result = await getReceiptFileUrl(storagePath);
    if (result.url) {
      window.open(result.url, "_blank");
    }
  }

  const statusIcon: Record<string, React.ReactNode> = {
    processing: <Clock className="h-4 w-4 text-amber-500" />,
    processed: <FileText className="h-4 w-4 text-blue-500" />,
    approved: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    rejected: <XCircle className="h-4 w-4 text-red-500" />,
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
      >
        <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">
          {isUploading ? "Uploading..." : "Drag and drop receipts here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          JPEG, PNG, WebP, or PDF (max 10MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={isUploading}
        />
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          Browse Files
        </Button>
        {uploadError && (
          <p className="mt-3 text-sm text-destructive">{uploadError}</p>
        )}
      </div>

      {/* Receipts Table */}
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">File</th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Sender</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No receipts uploaded yet.
                </td>
              </tr>
            ) : (
              receipts.map((receipt) => (
                <tr key={receipt.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {statusIcon[receipt.status]}
                      <Badge
                        variant={receipt.status === "approved" ? "default" : receipt.status === "rejected" ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {receipt.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleViewFile(receipt.storage_path)}
                      className="text-left hover:underline"
                    >
                      <p className="max-w-[200px] truncate font-medium text-foreground">
                        {receipt.original_filename}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(receipt.created_at).toLocaleDateString()}
                      </p>
                    </button>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    {receipt.sender_name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {receipt.amount_cents
                      ? formatCents(receipt.amount_cents, receipt.currency)
                      : "-"}
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                    {receipt.category ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewFile(receipt.storage_path)}
                        title="View file"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {receipt.status !== "approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(receipt.id, "approved")}
                          className="text-green-600 hover:text-green-700"
                        >
                          Approve
                        </Button>
                      )}
                      {receipt.status !== "rejected" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(receipt.id, "rejected")}
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
