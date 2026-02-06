"use client";

import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Plus, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Volume {
  id: string;
  name: string;
  years: string;
}

interface Issue {
  id: string;
  issueNumber: string;
  period?: string;
}

interface UploadedBy {
  id: string;
  username: string;
  email: string;
}

interface Paper {
  id: string;
  title: string;
  Abstract?: string | null;
  keywords: string[];
  otherAuthors: string[];
  pdfUrl: string;
  imageUrl?: string | null;
  status: string;
  createdAt: string;
  isVisible: boolean;
  volumeId: string;
  issueId?: string | null;
  volume?: { name: string; years: string };
  issue?: { issueNumber: string; period?: string };
  uploadedBy?: UploadedBy;
}

const statusColors: Record<string, string> = {
  SUBMITTED: "bg-gray-500 hover:bg-gray-600",
  UNDER_REVIEW: "bg-blue-500 hover:bg-blue-600",
  IN_PROCESS: "bg-yellow-500 hover:bg-yellow-600",
  ACCEPTED: "bg-green-500 hover:bg-green-600",
  PUBLISHED: "bg-emerald-600 hover:bg-emerald-700",
  REJECTED: "bg-red-600 hover:bg-red-700",
};

export default function PapersAdminPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    otherAuthors: "",
    volumeId: "",
    issueId: "",
  });
  const [addPdfFile, setAddPdfFile] = useState<File | null>(null);
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addPdfPreview, setAddPdfPreview] = useState<string | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string | null>(null);

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    otherAuthors: "",
    volumeId: "",
    issueId: "",
    isVisible: true,
    status: "SUBMITTED",
    newPassword: "",
  });
  const [editPdfFile, setEditPdfFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPdfPreview, setEditPdfPreview] = useState<string | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [imageCleared, setImageCleared] = useState(false);

  // View & Delete modals
  const [viewOpen, setViewOpen] = useState(false);
  const [viewPaper, setViewPaper] = useState<Paper | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<Paper | null>(null);

  const addPdfRef = useRef<HTMLInputElement>(null);
  const addImageRef = useRef<HTMLInputElement>(null);
  const editPdfRef = useRef<HTMLInputElement>(null);
  const editImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [papersRes, volumesRes, issuesRes] = await Promise.all([
        fetch("/api/admin/papers"),
        fetch("/api/admin/volumes"),
        fetch("/api/admin/issues"),
      ]);

      if (papersRes.ok) {
        const json = await papersRes.json();
        if (json.success) setPapers(json.data || []);
      }
      if (volumesRes.ok) {
        const json = await volumesRes.json();
        if (json.success) setVolumes(json.data || []);
      }
      if (issuesRes.ok) {
        const json = await issuesRes.json();
        if (json.success) setIssues(json.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ── Add Handlers ───────────────────────────────────────

  const handleAddPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddPdfFile(file);
      setAddPdfPreview(URL.createObjectURL(file));
    }
  };

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddImageFile(file);
      setAddImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.title.trim()) return toast.error("Title is required");
    if (!addForm.volumeId) return toast.error("Volume is required");
    if (!addPdfFile) return toast.error("PDF file is required");

    const toastId = toast.loading("Creating paper...");

    try {
      const formData = new FormData();
      formData.append("title", addForm.title.trim());
      formData.append("abstract", addForm.abstract.trim());
      formData.append("keywords", addForm.keywords.trim());
      formData.append("otherAuthors", addForm.otherAuthors.trim());
      formData.append("volumeId", addForm.volumeId);
      if (addForm.issueId) formData.append("issueId", addForm.issueId);
      formData.append("pdf", addPdfFile!);
      if (addImageFile) formData.append("image", addImageFile);

      const res = await fetch("/api/admin/papers", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Paper created successfully", { id: toastId });
        setAddOpen(false);
        resetAddForm();
        fetchAllData();
      } else {
        toast.error(json.error || "Failed to create paper", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const resetAddForm = () => {
    setAddForm({
      title: "",
      abstract: "",
      keywords: "",
      otherAuthors: "",
      volumeId: "",
      issueId: "",
    });
    setAddPdfFile(null);
    setAddImageFile(null);
    setAddPdfPreview(null);
    setAddImagePreview(null);
    if (addPdfRef.current) addPdfRef.current.value = "";
    if (addImageRef.current) addImageRef.current.value = "";
  };

  // ── Edit Handlers ──────────────────────────────────────

  const handleEditClick = (paper: Paper) => {
    setSelectedPaper(paper);
    setEditForm({
      title: paper.title,
      abstract: paper.Abstract || "",
      keywords: paper.keywords.join(", "),
      otherAuthors: paper.otherAuthors.join(", "),
      volumeId: paper.volumeId,
      issueId: paper.issueId || "",
      isVisible: paper.isVisible,
      status: paper.status,
      newPassword: "",
    });
    setEditPdfFile(null);
    setEditImageFile(null);
    setEditPdfPreview(null);
    setEditImagePreview(paper.imageUrl || null);
    setImageCleared(false);
    setEditOpen(true);
  };

  const handleEditPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditPdfFile(file);
      setEditPdfPreview(URL.createObjectURL(file));
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
      setImageCleared(false);
    }
  };

  const handleClearImage = () => {
    setEditImageFile(null);
    setEditImagePreview(null);
    setImageCleared(true);
    if (editImageRef.current) editImageRef.current.value = "";
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaper) return;

    const toastId = toast.loading("Updating paper...");

    try {
      const formData = new FormData();
      formData.append("id", selectedPaper.id);
      formData.append("title", editForm.title.trim());
      formData.append("abstract", editForm.abstract.trim());
      formData.append("keywords", editForm.keywords.trim());
      formData.append("otherAuthors", editForm.otherAuthors.trim());
      formData.append("volumeId", editForm.volumeId);
      if (editForm.issueId) formData.append("issueId", editForm.issueId);
      formData.append("isVisible", editForm.isVisible.toString());
      formData.append("status", editForm.status);
      if (editForm.newPassword.trim().length >= 6) {
        formData.append("newPassword", editForm.newPassword.trim());
      }

      if (editPdfFile) formData.append("pdf", editPdfFile);
      if (editImageFile) formData.append("image", editImageFile);
      else if (imageCleared) formData.append("imageUrl", "null");

      const res = await fetch("/api/admin/papers", {
        method: "PATCH",
        body: formData,
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Paper updated successfully", { id: toastId });
        setEditOpen(false);
        setSelectedPaper(null);
        fetchAllData();
      } else {
        toast.error(json.error || "Update failed", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // ── Delete ─────────────────────────────────────────────

  const handleDeleteClick = (paper: Paper) => {
    setPaperToDelete(paper);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!paperToDelete) return;
    const toastId = toast.loading("Deleting paper...");

    try {
      const res = await fetch(`/api/admin/papers?id=${paperToDelete.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Paper deleted", { id: toastId });
        setDeleteOpen(false);
        setPaperToDelete(null);
        fetchAllData();
      } else {
        toast.error(json.error || "Delete failed", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const publishedPapers = papers.filter((p) => p.status === "PUBLISHED");

  // ── Render ─────────────────────────────────────────────

  if (loading) {
    return <div className="p-8 text-center">Loading papers...</div>;
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Papers Management</h1>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Paper
        </Button>
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Paper</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>PDF File *</Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handleAddPdfChange}
                  required
                  ref={addPdfRef}
                />
                {addPdfPreview && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {addPdfFile?.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Cover Image (optional)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAddImageChange}
                  ref={addImageRef}
                />
                {addImagePreview && (
                  <img
                    src={addImagePreview}
                    alt="Preview"
                    className="mt-2 h-24 w-24 object-cover rounded border"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Volume *</Label>
                <Select
                  value={addForm.volumeId}
                  onValueChange={(v) => setAddForm({ ...addForm, volumeId: v })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                  <SelectContent>
                    {volumes.map((vol) => (
                      <SelectItem key={vol.id} value={vol.id}>
                        {vol.name} ({vol.years})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Abstract</Label>
              <Textarea
                value={addForm.abstract}
                onChange={(e) => setAddForm({ ...addForm, abstract: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Keywords (comma separated)</Label>
                <Input
                  value={addForm.keywords}
                  onChange={(e) => setAddForm({ ...addForm, keywords: e.target.value })}
                  placeholder="machine learning, neural networks, ..."
                />
              </div>

              <div className="space-y-2">
                <Label>Other Authors (comma separated)</Label>
                <Input
                  value={addForm.otherAuthors}
                  onChange={(e) => setAddForm({ ...addForm, otherAuthors: e.target.value })}
                  placeholder="Jane Doe, John Smith, ..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Issue (optional)</Label>
              <Select
                value={addForm.issueId ?? ""}
                onValueChange={(v) => setAddForm({ ...addForm, issueId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {issues.map((iss) => (
                    <SelectItem key={iss.id} value={iss.id}>
                      {iss.issueNumber} {iss.period ? `(${iss.period})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Paper</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Papers Table */}
      {publishedPapers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          No published papers found.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-44">Volume / Issue</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-32">Created</TableHead>
                <TableHead className="w-36 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publishedPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>
                    {paper.imageUrl ? (
                      <img
                        src={paper.imageUrl}
                        alt="Cover"
                        className="h-12 w-12 object-cover rounded"
                        onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-muted rounded flex items-center justify-center text-xs">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium line-clamp-2">{paper.title}</TableCell>
                  <TableCell>
                    {paper.volume?.name || "—"}
                    {paper.issue && ` — ${paper.issue.issueNumber}`}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(statusColors[paper.status], "text-xs")}>
                      {paper.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(paper.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => { setViewPaper(paper); setViewOpen(true); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(paper)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(paper)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {viewPaper && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{viewPaper.title}</DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-8 py-6">
                <div>
                  {viewPaper.imageUrl ? (
                    <img
                      src={viewPaper.imageUrl}
                      alt="Cover"
                      className="w-full rounded-lg border object-contain"
                      onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                      No cover image
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-1">PDF</h3>
                    <a
                      href={viewPaper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
                    >
                      <FileText className="h-5 w-5" />
                      Open PDF
                    </a>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Status</h3>
                    <Badge className={cn(statusColors[viewPaper.status], "px-4 py-1 text-sm")}>
                      {viewPaper.status.replace("_", " ")}
                    </Badge>
                  </div>

                  {viewPaper.uploadedBy && (
                    <div>
                      <h3 className="font-medium mb-1">Uploaded by</h3>
                      <p className="font-medium">{viewPaper.uploadedBy.username}</p>
                      <p className="text-sm text-muted-foreground">{viewPaper.uploadedBy.email}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium mb-1">Created</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(viewPaper.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {viewPaper.Abstract && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-2">Abstract</h3>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {viewPaper.Abstract}
                  </p>
                </div>
              )}

              {viewPaper.keywords.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewPaper.keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {viewPaper.otherAuthors.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-2">Other Authors</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewPaper.otherAuthors.map((author, i) => (
                      <Badge key={i} variant="outline">
                        {author}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <h3 className="font-medium mb-1">Volume</h3>
                  <p>
                    {viewPaper.volume?.name} ({viewPaper.volume?.years})
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Issue</h3>
                  <p>
                    {viewPaper.issue
                      ? `${viewPaper.issue.issueNumber}${viewPaper.issue.period ? ` (${viewPaper.issue.period})` : ""}`
                      : "Not assigned"}
                  </p>
                </div>
              </div>

              <DialogFooter className="pt-6 border-t">
                <Button onClick={() => setViewOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Paper</DialogTitle>
          </DialogHeader>

          {selectedPaper && (
            <form onSubmit={handleEditSubmit} className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>PDF (leave blank to keep current)</Label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={handleEditPdfChange}
                    ref={editPdfRef}
                  />
                  {editPdfPreview ? (
                    <p className="text-sm text-green-600">New file selected</p>
                  ) : (
                    selectedPaper.pdfUrl && (
                      <a
                        href={selectedPaper.pdfUrl}
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View current PDF
                      </a>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    ref={editImageRef}
                  />

                  <div className="relative mt-2 inline-block">
                    {editImagePreview ? (
                      <>
                        <img
                          src={editImagePreview}
                          alt="Preview"
                          className="h-28 w-28 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={handleClearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : selectedPaper.imageUrl ? (
                      <>
                        <img
                          src={selectedPaper.imageUrl}
                          alt="Current"
                          className="h-28 w-28 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={handleClearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="h-28 w-28 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Volume *</Label>
                  <Select
                    value={editForm.volumeId}
                    onValueChange={(v) => setEditForm({ ...editForm, volumeId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {volumes.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.name} ({v.years})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(v) => setEditForm({ ...editForm, status: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUBMITTED">Submitted</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                      <SelectItem value="IN_PROCESS">In Process</SelectItem>
                      <SelectItem value="ACCEPTED">Accepted</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedPaper.uploadedBy && (
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <div className="font-medium mb-2">Uploaded by</div>
                  <div className="text-sm">
                    <div className="font-semibold">{selectedPaper.uploadedBy.username}</div>
                    <div className="text-muted-foreground">{selectedPaper.uploadedBy.email}</div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>New Password for author (optional)</Label>
                <Input
                  type="password"
                  value={editForm.newPassword}
                  onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                  placeholder="Leave blank to keep current"
                />
                {editForm.newPassword && editForm.newPassword.length > 0 && editForm.newPassword.length < 6 && (
                  <p className="text-xs text-destructive">Minimum 6 characters</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Abstract</Label>
                <Textarea
                  value={editForm.abstract}
                  onChange={(e) => setEditForm({ ...editForm, abstract: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label>Keywords (comma separated)</Label>
                  <Input
                    value={editForm.keywords}
                    onChange={(e) => setEditForm({ ...editForm, keywords: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Other Authors (comma separated)</Label>
                  <Input
                    value={editForm.otherAuthors}
                    onChange={(e) => setEditForm({ ...editForm, otherAuthors: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Issue (optional)</Label>
                <Select
                  value={editForm.issueId ?? ""}
                  onValueChange={(v) => setEditForm({ ...editForm, issueId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {issues.map((iss) => (
                      <SelectItem key={iss.id} value={iss.id}>
                        {iss.issueNumber} {iss.period ? `(${iss.period})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Visible to Public</Label>
                  <p className="text-sm text-muted-foreground">
                    If disabled, paper wont appear on public pages
                  </p>
                </div>
                <Switch
                  checked={editForm.isVisible}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, isVisible: checked })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Paper</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{paperToDelete?.title}</strong>?<br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}