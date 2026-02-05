// app/admin/issues/page.tsx
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
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface Volume {
  id: string;
  name: string;
  years: string;
}

interface Issue {
  id: string;
  volumeId: string;
  issueNumber: string;
  year?: number;
  period?: string;
  description?: string;
  imageUrl?: string | null;
  isVisible: boolean;
  volume?: { name: string; years: string };
  _count?: { papers: number };
}

export default function IssuesAdminPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [loading, setLoading] = useState(true);

  // Add modal
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    volumeId: "",
    issueNumber: "",
    year: "",
    period: "",
    description: "",
  });
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string | null>(null);

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [editForm, setEditForm] = useState({
    issueNumber: "",
    year: "",
    period: "",
    description: "",
    isVisible: true,
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [imageCleared, setImageCleared] = useState(false);

  // Delete confirmation
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  const addImageRef = useRef<HTMLInputElement>(null);
  const editImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const issuesRes = await fetch("/api/admin/issues");
      const issuesJson = await issuesRes.json();
      if (issuesJson.success) setIssues(issuesJson.data);

      const volumesRes = await fetch("/api/admin/volumes");
      const volumesJson = await volumesRes.json();
      if (volumesJson.success) setVolumes(volumesJson.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ── ADD: Image preview ──────────────────────────────────────────────
  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddImageFile(file);
      setAddImagePreview(URL.createObjectURL(file));
    }
  };

  // ── EDIT: Image preview + clear ─────────────────────────────────────
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

  // ── ADD ISSUE ────────────────────────────────────────────────────────
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.volumeId) {
      toast.error("Please select a volume");
      return;
    }

    const loadingToast = toast.loading("Creating issue...");

    try {
      const formData = new FormData();
      formData.append("volumeId", addForm.volumeId);
      formData.append("issueNumber", addForm.issueNumber);
      if (addForm.year) formData.append("year", addForm.year);
      if (addForm.period) formData.append("period", addForm.period);
      if (addForm.description) formData.append("description", addForm.description);
      if (addImageFile) formData.append("image", addImageFile);

      const res = await fetch("/api/admin/issues", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Issue created", {
          description: `Issue ${json.data.issueNumber} added`,
          id: loadingToast,
        });
        setAddOpen(false);
        setAddForm({ volumeId: "", issueNumber: "", year: "", period: "", description: "" });
        setAddImageFile(null);
        setAddImagePreview(null);
        if (addImageRef.current) addImageRef.current.value = "";
        fetchData();
      } else {
        toast.error("Failed to create issue", {
          description: json.error,
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Creation failed", { id: loadingToast });
    }
  };

  // ── EDIT ISSUE ───────────────────────────────────────────────────────
  const handleEditClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setEditForm({
      issueNumber: issue.issueNumber,
      year: issue.year?.toString() || "",
      period: issue.period || "",
      description: issue.description || "",
      isVisible: issue.isVisible,
    });
    setEditImageFile(null);
    setEditImagePreview(issue.imageUrl || null);
    setImageCleared(false);
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    const loadingToast = toast.loading("Updating issue...");

    try {
      const formData = new FormData();
      formData.append("id", selectedIssue.id);
      formData.append("issueNumber", editForm.issueNumber);
      if (editForm.year) formData.append("year", editForm.year);
      if (editForm.period) formData.append("period", editForm.period);
      if (editForm.description) formData.append("description", editForm.description);
      formData.append("isVisible", editForm.isVisible.toString());

      // Image handling
      if (editImageFile) {
        formData.append("image", editImageFile);
      } else if (imageCleared) {
        formData.append("imageUrl", "null");
      }
      // If neither → do NOT send image keys → backend keeps existing

      const res = await fetch("/api/admin/issues", {
        method: "PATCH",
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Issue updated", { id: loadingToast });
        setEditOpen(false);
        setSelectedIssue(null);
        fetchData();
      } else {
        toast.error("Update failed", { description: json.error, id: loadingToast });
      }
    } catch (err) {
      toast.error("Update failed", { id: loadingToast });
    }
  };

  // ── DELETE ISSUE ─────────────────────────────────────────────────────
  const handleDeleteClick = (issue: Issue) => {
    setIssueToDelete(issue);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!issueToDelete) return;

    const loadingToast = toast.loading("Deleting issue...");

    try {
      const res = await fetch(`/api/admin/issues?id=${issueToDelete.id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Issue deleted", {
          description: `Issue ${issueToDelete.issueNumber} removed`,
          id: loadingToast,
        });
        setDeleteOpen(false);
        setIssueToDelete(null);
        fetchData();
      } else {
        toast.error("Delete failed", {
          description: json.error || "Issue may contain papers",
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Delete failed", { id: loadingToast });
    }
  };

  return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Issues Management</h2>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Issue
          </Button>
        </div>

        {/* Add Issue Dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-5">
              <div className="grid gap-2">
                <Label>Select Volume</Label>
                <Select
                  value={addForm.volumeId}
                  onValueChange={(value) => setAddForm({ ...addForm, volumeId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a volume" />
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
                <Label>Issue Number</Label>
                <Input
                  value={addForm.issueNumber}
                  onChange={(e) => setAddForm({ ...addForm, issueNumber: e.target.value })}
                  placeholder="1, 2, Jan-Feb, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Year (optional)</Label>
                  <Input
                    type="number"
                    value={addForm.year}
                    onChange={(e) => setAddForm({ ...addForm, year: e.target.value })}
                    placeholder="2026"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Period (optional)</Label>
                  <Input
                    value={addForm.period}
                    onChange={(e) => setAddForm({ ...addForm, period: e.target.value })}
                    placeholder="Jan-Jun"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Issue Cover Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAddImageChange}
                  ref={addImageRef}
                />
                {addImagePreview && (
                  <div className="mt-2">
                    <img
                      src={addImagePreview}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded border shadow-sm"
                    />
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Issue</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Issues Table */}
        {loading ? (
          <div className="text-center py-12">Loading issues...</div>
        ) : issues.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/30">
            No issues found. Create your first issue.
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Issue Number</TableHead>
                  <TableHead>Year / Period</TableHead>
                  <TableHead>Papers</TableHead>
                  <TableHead>Visible</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-muted/50">
                    <TableCell>
                      {issue.imageUrl ? (
                        <img
                          src={issue.imageUrl}
                          alt="Issue cover"
                          className="h-12 w-12 object-cover rounded border shadow-sm"
                          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                        />
                      ) : (
                        <div className="h-12 w-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="font-medium">
                      {issue.volume?.name || "—"} ({issue.volume?.years || "—"})
                    </TableCell>

                    <TableCell>{issue.issueNumber}</TableCell>

                    <TableCell>
                      {issue.year || "—"} {issue.period ? `(${issue.period})` : ""}
                    </TableCell>

                    <TableCell>{issue._count?.papers || 0}</TableCell>

                    <TableCell>
                      <Badge variant={issue.isVisible ? "default" : "secondary"}>
                        {issue.isVisible ? "Yes" : "No"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(issue)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDeleteClick(issue)}
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
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Issue</DialogTitle>
            </DialogHeader>
            {selectedIssue && (
              <form onSubmit={handleEditSubmit} className="space-y-5">
                <div className="grid gap-2">
                  <Label>Issue Number</Label>
                  <Input
                    value={editForm.issueNumber}
                    onChange={(e) => setEditForm({ ...editForm, issueNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Year (optional)</Label>
                    <Input
                      type="number"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                      placeholder="2026"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Period (optional)</Label>
                    <Input
                      value={editForm.period}
                      onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                      placeholder="Jan-Jun"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Description (optional)</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Issue Cover Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    ref={editImageRef}
                  />

                  {/* Preview area */}
                  <div className="mt-2">
                    {editImagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={editImagePreview}
                          alt="Preview"
                          className="h-32 w-full object-cover rounded border shadow-sm"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={handleClearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : selectedIssue.imageUrl ? (
                      <div className="relative inline-block">
                        <img
                          src={selectedIssue.imageUrl}
                          alt="Current cover"
                          className="h-32 w-full object-cover rounded border shadow-sm"
                          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={handleClearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="h-32 w-full bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Visible</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this issue in public archives
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
              <DialogTitle>Delete Issue</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">Issue {issueToDelete?.issueNumber}</span> from{" "}
                {issueToDelete?.volume?.name}?
                <br />
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Issue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}