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
import { Plus, Edit, Trash2 } from "lucide-react";
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

  // Delete confirmation
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch issues
      const issuesRes = await fetch("/api/admin/issues");
      const issuesJson = await issuesRes.json();
      if (issuesJson.success) setIssues(issuesJson.data);

      // Fetch volumes for dropdown
      const volumesRes = await fetch("/api/admin/volumes");
      const volumesJson = await volumesRes.json();
      if (volumesJson.success) setVolumes(volumesJson.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
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
      const res = await fetch("/api/admin/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          year: addForm.year ? Number(addForm.year) : undefined,
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Issue created", {
          description: `Issue ${json.data.issueNumber} added to ${json.data.volume.name}`,
          id: loadingToast,
        });
        setAddOpen(false);
        setAddForm({ volumeId: "", issueNumber: "", year: "", period: "", description: "" });
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
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    const loadingToast = toast.loading("Updating issue...");

    try {
      const res = await fetch("/api/admin/issues", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedIssue.id,
          ...editForm,
          year: editForm.year ? Number(editForm.year) : undefined,
        }),
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
          <DialogContent>
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
                    <Label>Year</Label>
                    <Input
                      type="number"
                      value={editForm.year}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Period</Label>
                    <Input
                      value={editForm.period}
                      onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
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
