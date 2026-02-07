// app/admin/volumes/page.tsx
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Volume {
  id: string;
  name: string;
  years: string;
  description?: string;
  issues?: { id: string }[];
  isVisible: boolean;
  Archive: boolean;
}

export default function VolumesAdminPage() {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [loading, setLoading] = useState(true);

  // Add modal
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    years: "",
    description: "",
  });

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    years: "",
    description: "",
    isVisible: true,
    Archive: false,
  });

  useEffect(() => {
    fetchVolumes();
  }, []);

  const fetchVolumes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/volumes");
      const json = await res.json();
      if (json.success) {
        setVolumes(json.data);
      } else {
        toast.error("Failed to load volumes", {
          description: json.error || "Unknown error",
        });
      }
    } catch (err) {
      toast.error("Network error", {
        description: "Could not fetch volumes from server",
      });
    } finally {
      setLoading(false);
    }
  };

  // ── Add new volume ────────────────────────────────────────────────
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/volumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Volume created", {
          description: `${json.data.name} has been added successfully`,
        });
        setAddOpen(false);
        setAddForm({ name: "", years: "", description: "" });
        fetchVolumes();
      } else {
        toast.error("Failed to create volume", {
          description: json.error || "Please check your input",
        });
      }
    } catch (err) {
      toast.error("Creation failed", {
        description: "Something went wrong on the server",
      });
    }
  };

  // ── Open edit dialog with current values ──────────────────────────
  const handleEditClick = (vol: Volume) => {
    setSelectedVolume(vol);
    setEditForm({
      name: vol.name,
      years: vol.years,
      description: vol.description || "",
      isVisible: vol.isVisible,
      Archive: vol.Archive,
    });
    setEditOpen(true);
  };

  // ── Update volume (PATCH) ─────────────────────────────────────────
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVolume) return;

    const loadingToast = toast.loading("Updating volume...");

    try {
      const res = await fetch("/api/admin/volumes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedVolume.id,
          ...editForm,
        }),
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Volume updated", {
          description: `${json.data.name} has been saved`,
          id: loadingToast, // dismiss loading toast
        });
        setEditOpen(false);
        setSelectedVolume(null);
        fetchVolumes();
      } else {
        toast.error("Update failed", {
          description: json.error || "Validation error",
          id: loadingToast,
        });
      }
    } catch (err) {
      toast.error("Server error", {
        description: "Could not update volume",
        id: loadingToast,
      });
    }
  };

  // add delete handler here
  const handleDelete = async (id: string, volumeName?: string) => {
    // Optional: Ask for confirmation here (or rely on AlertDialog already doing it)
    // If you want extra safety: if (!confirm(`Delete volume ${volumeName || id}?`)) return;

    const loadingToast = toast.loading("Deleting volume...");

    try {
      const res = await fetch(`/api/admin/volumes?id=${id}`, {
        method: "DELETE",
        // Optional: credentials: "include"   // ← add if using cookies/session auth
        // headers: { "Content-Type": "application/json" }  // not needed for DELETE without body
      });

      // Optional but useful during development
      // console.log("Delete response status:", res.status, res.statusText);

      if (!res.ok) {
        // Handle non-2xx responses early
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(
          errorJson.error || `Server responded with ${res.status} ${res.statusText}`
        );
      }

      const json = await res.json();

      if (json.success) {
        toast.success("Volume deleted", {
          description: volumeName
            ? `${volumeName} has been removed`
            : "The volume has been removed",
          id: loadingToast,
        });
        fetchVolumes();
      } else {
        toast.error("Delete failed", {
          description: json.error || "Unexpected response from server",
          id: loadingToast,
        });
      }
    } catch (err: any) {
      console.error("[handleDelete]", err);

      toast.error("Failed to delete volume", {
        description: err.message || "Server or network error",
        id: loadingToast,
      });
    }
  };

  return (
    <>
      <div className="space-y-6 p-6">
        {/* Header + Add Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Volumes Management</h2>

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Volume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Volume</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-5">
                <div>
                  <Label>Volume Name (e.g. Volume 21)</Label>
                  <Input
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    placeholder="Volume 22"
                    required
                  />
                </div>
                <div>
                  <Label>Year(s)</Label>
                  <Input
                    value={addForm.years}
                    onChange={(e) => setAddForm({ ...addForm, years: e.target.value })}
                    placeholder="2026-2027"
                    required
                  />
                </div>
                <div>
                  <Label>Description (optional)</Label>
                  <Textarea
                    value={addForm.description}
                    onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                    placeholder="Annual volume covering organizational studies..."
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create Volume</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading volumes...</div>
        ) : volumes.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/40">
            No volumes found. Start by creating your first volume.
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Year(s)</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Visible</TableHead>
                  <TableHead>Archived</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volumes.map((vol) => (
                  <TableRow key={vol.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{vol.name}</TableCell>
                    <TableCell>{vol.years}</TableCell>
                    <TableCell>{vol.issues?.length || 0}</TableCell>
                    <TableCell>
                      <Badge variant={vol.isVisible ? "default" : "secondary"}>
                        {vol.isVisible ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vol.Archive ? "destructive" : "outline"}>
                        {vol.Archive ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(vol)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(vol.id, vol.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Volume</DialogTitle>
          </DialogHeader>
          {selectedVolume && (
            <form onSubmit={handleEditSubmit} className="space-y-5 pt-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Volume Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-years">Year(s)</Label>
                <Input
                  id="edit-years"
                  value={editForm.years}
                  onChange={(e) => setEditForm({ ...editForm, years: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-desc">Description</Label>
                <Textarea
                  id="edit-desc"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Visible to Public</Label>
                  <p className="text-sm text-muted-foreground">
                    If disabled, volume wont appear in public archives
                  </p>
                </div>
                <Switch
                  checked={editForm.isVisible}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, isVisible: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Archived</Label>
                  <p className="text-sm text-muted-foreground">
                    Archived volumes are hidden from current listings
                  </p>
                </div>
                <Switch
                  checked={editForm.Archive}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, Archive: checked })}
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
        

    </>
  );
}