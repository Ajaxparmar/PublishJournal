// app/admin/papers/page.tsx
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
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Eye, Edit, Trash2, Plus } from "lucide-react";
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

interface Paper {
  id: string;
  title: string;
  Abstract?: string;
  keywords: string[];
  pdfUrl: string;
  imageUrl?: string | null;
  createdAt: string;
  isVisible: boolean;
  volumeId: string;
  issueId?: string | null;
  volume?: { name: string; years: string };
  issue?: { issueNumber: string; period?: string };
}

export default function PapersAdminPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Add modal states
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

  // Edit modal states
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    volumeId: "",
    issueId: "",
    isVisible: true,
  });
  const [editPdfFile, setEditPdfFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPdfPreview, setEditPdfPreview] = useState<string | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [imageCleared, setImageCleared] = useState(false);

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

  // ── ADD FILE HANDLERS ───────────────────────────────────────────────
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

  // ── EDIT FILE HANDLERS ──────────────────────────────────────────────
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

  // ── ADD PAPER ───────────────────────────────────────────────────────
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
        toast.success("Paper created", { id: loadingToast });
        setAddOpen(false);
        resetAddForm();
        fetchAllData();
      } else {
        toast.error("Failed to create", { description: json.error, id: loadingToast });
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

  // ── EDIT PAPER ──────────────────────────────────────────────────────
  const handleEditClick = (paper: Paper) => {
    setSelectedPaper(paper);
    setEditForm({
      title: paper.title,
      abstract: paper.Abstract || "",
      keywords: paper.keywords.join(", "),
      volumeId: paper.volumeId,
      issueId: paper.issueId || "",
      isVisible: paper.isVisible,
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

      if (editPdfFile) formData.append("pdf", editPdfFile);
      if (editImageFile) {
        formData.append("image", editImageFile);
      } else if (imageCleared) {
        formData.append("imageUrl", "null");
      }

      const res = await fetch("/api/admin/papers", { method: "PATCH", body: formData });
      const json = await res.json();

      if (json.success) {
        toast.success("Paper updated", { id: loadingToast });
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

  // ── DELETE PAPER ────────────────────────────────────────────────────
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

  return (
      <div className="space-y-6 p-6 w-full">
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
              {/* Title & PDF */}
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAddPdfFile(file);
                        setAddPdfPreview(URL.createObjectURL(file));
                      }
                    }}
                    required
                    ref={addPdfRef}
                  />
                  {addPdfPreview && (
                    <p className="text-xs text-green-600">Selected: {addPdfFile?.name}</p>
                  )}
                </div>
              </div>

              {/* Image & Volume */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Cover Image (optional)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAddImageFile(file);
                        setAddImagePreview(URL.createObjectURL(file));
                      }
                    }}
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

              {/* Abstract */}
              <div className="grid gap-2">
                <Label>Abstract</Label>
                <Textarea
                  value={addForm.abstract}
                  onChange={(e) => setAddForm({ ...addForm, abstract: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Keywords */}
              <div className="grid gap-2">
                <Label>Keywords (comma separated)</Label>
                <Input
                  value={addForm.keywords}
                  onChange={(e) => setAddForm({ ...addForm, keywords: e.target.value })}
                />
              </div>

              {/* Issue */}
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

        {/* Papers Table - Optimized for long titles */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading papers...</div>
        ) : papers.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/30 text-muted-foreground">
            No papers found. Add your first paper.
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Image</TableHead>
                  <TableHead className="min-w-[200px] max-w-[400px]">Title</TableHead>
                  <TableHead className="w-40">Volume / Issue</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                  <TableHead className="w-32">Created</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((paper) => (
                  <TableRow key={paper.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      {paper.imageUrl ? (
                        <img
                          src={paper.imageUrl}
                          alt="Cover"
                          className="h-12 w-12 object-cover rounded border shadow-sm"
                          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                        />
                      ) : (
                        <div className="h-12 w-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          No img
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="font-medium">
                      <div
                        className="max-w-[350px] truncate"
                        title={paper.title} // full title on hover
                      >
                        {paper.title}
                      </div>
                    </TableCell>

                    <TableCell className="text-sm">
                      {paper.volume?.name || "—"}
                      {paper.issue ? ` — ${paper.issue.issueNumber}` : ""}
                    </TableCell>

                    <TableCell>
                      <Badge variant={paper.isVisible ? "default" : "secondary"}>
                        {paper.isVisible ? "Visible" : "Hidden"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(paper.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon">
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

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Paper</DialogTitle>
            </DialogHeader>
            {selectedPaper && (
              <form onSubmit={handleEditSubmit} className="space-y-5">
                {/* Title + PDF */}
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

                {/* Image + Volume */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="flex items-center gap-3">
                          <img
                            src={editImagePreview}
                            alt="Preview"
                            className="h-24 w-24 object-cover rounded border shadow-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setEditImageFile(null);
                              setEditImagePreview(null);
                              setImageCleared(true);
                              if (editImageRef.current) editImageRef.current.value = "";
                            }}
                          >
                            Clear Image
                          </Button>
                        </div>
                      ) : selectedPaper.imageUrl ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedPaper.imageUrl}
                            alt="Current cover"
                            className="h-24 w-24 object-cover rounded border shadow-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setEditImagePreview(null);
                              setImageCleared(true);
                            }}
                          >
                            Remove Current
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
                </div>

                {/* Abstract */}
                <div className="grid gap-2">
                  <Label>Abstract</Label>
                  <Textarea
                    value={editForm.abstract}
                    onChange={(e) => setEditForm({ ...editForm, abstract: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Keywords */}
                <div className="grid gap-2">
                  <Label>Keywords (comma separated)</Label>
                  <Input
                    value={editForm.keywords}
                    onChange={(e) => setEditForm({ ...editForm, keywords: e.target.value })}
                  />
                </div>

                {/* Issue */}
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

                {/* Visibility */}
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