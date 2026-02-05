"use client";

import { useState, useEffect, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
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
  Abstract?: string;
  keywords: string[];
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

  // Add modal
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    volumeId: "",
    issueId: "",
  });
  const [addPdfFile, setAddPdfFile] = useState<File | null>(null);
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addPdfPreview, setAddPdfPreview] = useState<string | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string | null>(null);

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editForm, setEditForm] = useState<{
    title: string;
    abstract: string;
    keywords: string;
    volumeId: string;
    issueId: string;
    isVisible: boolean;
    status: string;
    newPassword?: string;
  }>({
    title: "",
    abstract: "",
    keywords: "",
    volumeId: "",
    issueId: "",
    isVisible: true,
    status: "SUBMITTED",
  });
  const [editPdfFile, setEditPdfFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPdfPreview, setEditPdfPreview] = useState<string | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [imageCleared, setImageCleared] = useState(false);

  // View Details popup
  const [viewOpen, setViewOpen] = useState(false);
  const [viewPaper, setViewPaper] = useState<Paper | null>(null);

  // Delete confirmation
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
    try {
      setLoading(true);
      const [papersRes, volRes, issueRes] = await Promise.all([
        fetch("/api/admin/papers"),
        fetch("/api/admin/volumes"),
        fetch("/api/admin/issues"),
      ]);

      const papersJson = await papersRes.json();
      const volJson = await volRes.json();
      const issueJson = await issueRes.json();

      if (papersJson.success) setPapers(papersJson.data);
      if (volJson.success) setVolumes(volJson.data);
      if (issueJson.success) setIssues(issueJson.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (paper: Paper) => {
    setViewPaper(paper);
    setViewOpen(true);
  };

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

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.volumeId) return toast.error("Volume is required");
    if (!addPdfFile) return toast.error("PDF file is required");

    const loadingToast = toast.loading("Creating paper...");

    try {
      const formData = new FormData();
      formData.append("title", addForm.title);
      formData.append("abstract", addForm.abstract);
      formData.append("keywords", addForm.keywords);
      formData.append("volumeId", addForm.volumeId);
      if (addForm.issueId) formData.append("issueId", addForm.issueId);
      formData.append("pdf", addPdfFile);
      if (addImageFile) formData.append("image", addImageFile);

      const res = await fetch("/api/admin/papers", { method: "POST", body: formData });
      const json = await res.json();

      if (json.success) {
        toast.success("Paper created successfully", { id: loadingToast });
        setAddOpen(false);
        resetAddForm();
        fetchAllData();
      } else {
        toast.error("Failed to create paper", { description: json.error, id: loadingToast });
      }
    } catch (err) {
      toast.error("Creation failed", { id: loadingToast });
    }
  };

  const resetAddForm = () => {
    setAddForm({ title: "", abstract: "", keywords: "", volumeId: "", issueId: "" });
    setAddPdfFile(null);
    setAddImageFile(null);
    setAddPdfPreview(null);
    setAddImagePreview(null);
    if (addPdfRef.current) addPdfRef.current.value = "";
    if (addImageRef.current) addImageRef.current.value = "";
  };

  const handleEditClick = (paper: Paper) => {
    setSelectedPaper(paper);
    setEditForm({
      title: paper.title,
      abstract: paper.Abstract || "",
      keywords: paper.keywords.join(", "),
      volumeId: paper.volumeId,
      issueId: paper.issueId || "",
      isVisible: paper.isVisible,
      status: paper.status,
    });
    setEditPdfFile(null);
    setEditImageFile(null);
    setEditPdfPreview(null);
    setEditImagePreview(paper.imageUrl || null);
    setImageCleared(false);
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaper) return;

    const loadingToast = toast.loading("Updating paper...");

    try {
      const formData = new FormData();
      formData.append("id", selectedPaper.id);
      formData.append("title", editForm.title);
      formData.append("abstract", editForm.abstract);
      formData.append("keywords", editForm.keywords);
      formData.append("volumeId", editForm.volumeId);
      if (editForm.issueId) formData.append("issueId", editForm.issueId);
      formData.append("isVisible", editForm.isVisible.toString());
      formData.append("status", editForm.status);

      if (editForm.newPassword) {
        formData.append("newPassword", editForm.newPassword);
      }

      if (editPdfFile) formData.append("pdf", editPdfFile);
      if (editImageFile) {
        formData.append("image", editImageFile);
      } else if (imageCleared) {
        formData.append("imageUrl", "null");
      }

      const res = await fetch("/api/admin/papers", { method: "PATCH", body: formData });
      const json = await res.json();

      if (json.success) {
        toast.success("Paper updated successfully", { id: loadingToast });
        setEditOpen(false);
        setSelectedPaper(null);
        fetchAllData();
      } else {
        toast.error("Update failed", { description: json.error, id: loadingToast });
      }
    } catch (err) {
      toast.error("Update failed", { id: loadingToast });
    }
  };

  const handleDeleteClick = (paper: Paper) => {
    setPaperToDelete(paper);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!paperToDelete) return;

    const loadingToast = toast.loading("Deleting paper...");

    try {
      const res = await fetch(`/api/admin/papers?id=${paperToDelete.id}`, { method: "DELETE" });
      const json = await res.json();

      if (json.success) {
        toast.success("Paper deleted", { id: loadingToast });
        setDeleteOpen(false);
        setPaperToDelete(null);
        fetchAllData();
      } else {
        toast.error("Delete failed", { description: json.error, id: loadingToast });
      }
    } catch (err) {
      toast.error("Delete failed", { id: loadingToast });
    }
  };

  const publishedPapers = papers.filter((paper) => paper.status === "PUBLISHED");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Papers Management</h2>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Paper
        </Button>
      </div>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Paper</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Title *</Label>
                <Input
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>PDF File *</Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handleAddPdfChange}
                  required
                  ref={addPdfRef}
                />
                {addPdfPreview && (
                  <p className="text-xs text-green-600">Selected: {addPdfFile?.name}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
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
                    className="h-20 w-20 object-cover rounded border mt-2"
                  />
                )}
              </div>

              <div className="grid gap-2">
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

            <div className="grid gap-2">
              <Label>Abstract</Label>
              <Textarea
                value={addForm.abstract}
                onChange={(e) => setAddForm({ ...addForm, abstract: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Keywords (comma separated)</Label>
              <Input
                value={addForm.keywords}
                onChange={(e) => setAddForm({ ...addForm, keywords: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
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

      {/* Papers Table – only showing PUBLISHED papers */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading papers...</div>
      ) : publishedPapers.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/30 text-muted-foreground">
          No published papers found.
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead className="min-w-[220px] max-w-[380px]">Title</TableHead>
                <TableHead className="w-44">Volume / Issue</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-32">Created</TableHead>
                <TableHead className="w-36 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publishedPapers.map((paper) => (
                <TableRow key={paper.id} className="hover:bg-muted/60 transition-colors">
                  <TableCell>
                    {paper.imageUrl ? (
                      <img
                        src={paper.imageUrl}
                        alt="Cover"
                        className="h-10 w-10 object-cover rounded border shadow-sm"
                        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                      />
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-[10px]">
                        No img
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-medium">
                    <div className="line-clamp-2 max-w-[360px] text-sm" title={paper.title}>
                      {paper.title}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    {paper.volume?.name || "—"}
                    {paper.issue ? ` — ${paper.issue.issueNumber}` : ""}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        "px-3 py-1 text-xs font-medium",
                        statusColors[paper.status] || "bg-gray-500 hover:bg-gray-600"
                      )}
                    >
                      {paper.status.replace("_", " ")}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(paper.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Details"
                      onClick={() => handleViewClick(paper)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(paper)}
                    >
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

      {/* View Details Popup */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="w-[95vw] max-w-7xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-2xl font-bold">
              {viewPaper?.title}
            </DialogTitle>
          </DialogHeader>

          {viewPaper && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Cover Image</h4>
                  {viewPaper.imageUrl ? (
                    <img
                      src={viewPaper.imageUrl}
                      alt="Cover"
                      className="w-full max-h-64 object-contain rounded-lg border shadow-sm"
                      onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                      No cover image
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">PDF Document</h4>
                    <a
                      href={viewPaper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <FileText className="h-5 w-5" />
                      Open / Download PDF
                    </a>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Status</h4>
                    <Badge
                      className={cn(
                        "mt-1 px-4 py-1 text-base",
                        statusColors[viewPaper.status] || "bg-gray-500"
                      )}
                    >
                      {viewPaper.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Uploaded By</h4>
                    <div className="mt-1 text-sm space-y-1">
                      {viewPaper.uploadedBy ? (
                        <>
                          <p className="font-medium">{viewPaper.uploadedBy.username}</p>
                          <p className="text-muted-foreground">{viewPaper.uploadedBy.email}</p>
                        </>
                      ) : (
                        <p className="text-muted-foreground italic">Unknown / System upload</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Created</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(viewPaper.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              {viewPaper.Abstract && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Abstract</h4>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap border-l-4 border-muted pl-4">
                    {viewPaper.Abstract}
                  </p>
                </div>
              )}

              {viewPaper.keywords?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewPaper.keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Volume</h4>
                  <p>
                    {viewPaper.volume?.name || "—"} ({viewPaper.volume?.years || "—"})
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Issue</h4>
                  <p>
                    {viewPaper.issue
                      ? `${viewPaper.issue.issueNumber}${
                          viewPaper.issue.period ? ` (${viewPaper.issue.period})` : ""
                        }`
                      : "Not assigned"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t p-4">
            <Button onClick={() => setViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="w-[125vw] max-w-12xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Paper</DialogTitle>
          </DialogHeader>
          {selectedPaper && (
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Title *</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>PDF File</Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={handleEditPdfChange}
                      ref={editPdfRef}
                    />
                    {editPdfPreview ? (
                      <p className="text-xs text-green-600">New PDF selected</p>
                    ) : selectedPaper.pdfUrl ? (
                      <a
                        href={selectedPaper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline hover:text-blue-800"
                      >
                        View current PDF
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Cover Image</Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                      ref={editImageRef}
                    />
                    {editImagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={editImagePreview}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded border shadow-sm"
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
                      </div>
                    ) : selectedPaper.imageUrl ? (
                      <div className="relative inline-block">
                        <img
                          src={selectedPaper.imageUrl}
                          alt="Current cover"
                          className="h-24 w-24 object-cover rounded border shadow-sm"
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
                      </div>
                    ) : (
                      <div className="h-24 w-24 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Volume *</Label>
                  <Select
                    value={editForm.volumeId}
                    onValueChange={(v) => setEditForm({ ...editForm, volumeId: v })}
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

                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
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

              <div className="border-t pt-5 mt-3">
                <div className="bg-muted/40 p-4 rounded-lg border text-sm">
                  <div className="font-medium mb-1">Uploaded by</div>
                  {selectedPaper.uploadedBy ? (
                    <div className="space-y-0.5 text-muted-foreground">
                      <div className="font-semibold text-foreground">
                        {selectedPaper.uploadedBy.username}
                      </div>
                      <div>{selectedPaper.uploadedBy.email}</div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground italic">
                      Unknown / System upload
                    </div>
                  )}
                </div>
                <Label className="text-base font-medium">Change User Password</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Leave blank to keep current password. New password must be at least 6 characters.
                </p>
                <div className="grid gap-2">
                  <Input
                    type="password"
                    placeholder="New password (optional)"
                    value={editForm.newPassword ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                    minLength={6}
                  />
                  {editForm.newPassword && editForm.newPassword.length > 0 && editForm.newPassword.length < 6 && (
                    <p className="text-xs text-red-600">Password must be at least 6 characters</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Abstract</Label>
                <Textarea
                  value={editForm.abstract}
                  onChange={(e) => setEditForm({ ...editForm, abstract: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label>Keywords (comma separated)</Label>
                <Input
                  value={editForm.keywords}
                  onChange={(e) => setEditForm({ ...editForm, keywords: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Issue (optional)</Label>
                <Select
                  value={editForm.issueId ?? ""}
                  onValueChange={(v) => setEditForm({ ...editForm, issueId: v })}
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

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label>Visible to Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Controls whether this paper appears in public view
                  </p>
                </div>
                <Switch
                  checked={editForm.isVisible}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, isVisible: checked })}
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
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
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold">{paperToDelete?.title}</span>?
              <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Paper
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}