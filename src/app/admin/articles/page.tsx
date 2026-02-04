// app/admin/papers/page.tsx
"use client";

import { useState, useEffect } from "react";
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

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    pdfUrl: "",
    volumeId: "",
    issueId: "",
  });

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    pdfUrl: "",
    volumeId: "",
    issueId: "",
    isVisible: true,
  });

  // Delete confirmation
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<Paper | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch papers
      const papersRes = await fetch("/api/admin/papers");
      const papersJson = await papersRes.json();
      if (papersJson.success) setPapers(papersJson.data);

      // Fetch volumes
      const volRes = await fetch("/api/admin/volumes");
      const volJson = await volRes.json();
      if (volJson.success) setVolumes(volJson.data);

      // Fetch issues
      const issueRes = await fetch("/api/admin/issues");
      const issueJson = await issueRes.json();
      if (issueJson.success) setIssues(issueJson.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // CREATE PAPER
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.volumeId) {
      toast.error("Volume is required");
      return;
    }

    const loadingToast = toast.loading("Creating paper...");

    try {
      const res = await fetch("/api/admin/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          keywords: addForm.keywords.split(",").map(k => k.trim()).filter(Boolean),
          issueId: addForm.issueId || null,
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Paper created", { id: loadingToast });
        setAddOpen(false);
        setAddForm({
          title: "",
          abstract: "",
          keywords: "",
          pdfUrl: "",
          volumeId: "",
          issueId: "",
        });
        fetchAllData();
      } else {
        toast.error("Failed to create paper", {
          description: json.error,
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Creation failed", { id: loadingToast });
    }
  };

  // EDIT PAPER - open dialog
  const handleEditClick = (paper: Paper) => {
    setSelectedPaper(paper);
    setEditForm({
      title: paper.title,
      abstract: paper.Abstract || "",
      keywords: paper.keywords.join(", "),
      pdfUrl: paper.pdfUrl,
      volumeId: paper.volumeId,
      issueId: paper.issueId || "",
      isVisible: paper.isVisible,
    });
    setEditOpen(true);
  };

  // SAVE EDIT
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaper) return;

    const loadingToast = toast.loading("Updating paper...");

    try {
      const res = await fetch("/api/admin/papers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPaper.id,
          ...editForm,
          keywords: editForm.keywords.split(",").map(k => k.trim()).filter(Boolean),
          issueId: editForm.issueId || null,
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Paper updated", { id: loadingToast });
        setEditOpen(false);
        setSelectedPaper(null);
        fetchAllData();
      } else {
        toast.error("Update failed", {
          description: json.error,
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Update failed", { id: loadingToast });
    }
  };

  // DELETE
  const handleDeleteClick = (paper: Paper) => {
    setPaperToDelete(paper);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!paperToDelete) return;

    const loadingToast = toast.loading("Deleting paper...");

    try {
      const res = await fetch(`/api/admin/papers?id=${paperToDelete.id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Paper deleted", { id: loadingToast });
        setDeleteOpen(false);
        setPaperToDelete(null);
        fetchAllData();
      } else {
        toast.error("Delete failed", {
          description: json.error || "Unknown error",
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
          <h2 className="text-3xl font-bold tracking-tight">Papers / Articles</h2>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Paper
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
                  <Label>PDF URL *</Label>
                  <Input
                    value={addForm.pdfUrl}
                    onChange={(e) => setAddForm({ ...addForm, pdfUrl: e.target.value })}
                    required
                    placeholder="https://example.com/paper.pdf"
                  />
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
                  placeholder="emotional intelligence, employee engagement"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Table */}
        {loading ? (
          <div className="text-center py-10">Loading papers...</div>
        ) : papers.length === 0 ? (
          <div className="text-center py-10 border rounded-lg bg-muted/30 text-muted-foreground">
            No papers found. Add your first paper.
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Volume / Issue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[180px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>
                      {paper.volume?.name || "—"}
                      {paper.issue ? ` — ${paper.issue.issueNumber}` : ""}
                    </TableCell>
                    <TableCell>
                      <Badge variant={paper.isVisible ? "default" : "secondary"}>
                        {paper.isVisible ? "Visible" : "Hidden"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(paper.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(paper)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
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
                    <Label>PDF URL *</Label>
                    <Input
                      value={editForm.pdfUrl}
                      onChange={(e) => setEditForm({ ...editForm, pdfUrl: e.target.value })}
                      required
                    />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label>Visible to Public</Label>
                    <p className="text-sm text-muted-foreground">
                      If disabled, this paper will not be visible publicly
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
                Are you sure you want to delete{" "}
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