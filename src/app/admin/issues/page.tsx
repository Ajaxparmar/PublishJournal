// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Edit, Trash2, X } from "lucide-react";
// import { toast } from "sonner";

// interface Volume {
//   id: string;
//   name: string;
//   years: string;
// }

// interface Issue {
//   id: string;
//   volumeId: string;
//   issueNumber: string;
//   year?: number;
//   period?: string;
//   description?: string;
//   imageUrl?: string | null;
//   isVisible: boolean;
//   volume?: { name: string; years: string };
//   _count?: { papers: number };
// }

// export default function IssuesAdminPage() {
//   const [issues, setIssues] = useState<Issue[]>([]);
//   const [volumes, setVolumes] = useState<Volume[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Add modal
//   const [addOpen, setAddOpen] = useState(false);
//   const [addForm, setAddForm] = useState({
//     volumeId: "",
//     issueNumber: "",
//     year: "",
//     period: "",
//     description: "",
//   });
//   const [addImageFile, setAddImageFile] = useState<File | null>(null);
//   const [addImagePreview, setAddImagePreview] = useState<string | null>(null);
//   const [existingNumbersInVolume, setExistingNumbersInVolume] = useState<Set<string>>(new Set());
//   const [checkingDuplicate, setCheckingDuplicate] = useState(false);

//   // Edit modal
//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
//   const [editForm, setEditForm] = useState({
//     issueNumber: "",
//     year: "",
//     period: "",
//     description: "",
//     isVisible: true,
//   });
//   const [editImageFile, setEditImageFile] = useState<File | null>(null);
//   const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
//   const [imageCleared, setImageCleared] = useState(false);

//   // Delete modal
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

//   const addImageInputRef = useRef<HTMLInputElement>(null);
//   const editImageInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [issuesRes, volumesRes] = await Promise.all([
//         fetch("/api/admin/issues"),
//         fetch("/api/admin/volumes"),
//       ]);

//       const issuesData = await issuesRes.json();
//       const volumesData = await volumesRes.json();

//       if (issuesData.success) setIssues(issuesData.data || []);
//       if (volumesData.success) setVolumes(volumesData.data || []);
//     } catch {
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check existing issue numbers for the selected volume
//   useEffect(() => {
//     if (!addForm.volumeId || !addOpen) {
//       setExistingNumbersInVolume(new Set());
//       return;
//     }

//     let active = true;
//     setCheckingDuplicate(true);

//     fetch(`/api/admin/issues?volumeId=${addForm.volumeId}&only=issueNumber`)
//       .then(r => r.json())
//       .then(data => {
//         if (active && data.success) {
//           const numbers = data.data.map((item: { issueNumber: string }) => item.issueNumber);
//           setExistingNumbersInVolume(new Set(numbers));
//         }
//       })
//       .catch(() => {}) // silent – database will still block
//       .finally(() => {
//         if (active) setCheckingDuplicate(false);
//       });

//     return () => { active = false; };
//   }, [addForm.volumeId, addOpen]);

//   const issueNumberTrimmed = addForm.issueNumber.trim();
//   const isDuplicateInThisVolume = issueNumberTrimmed !== "" && existingNumbersInVolume.has(issueNumberTrimmed);

//   const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAddImageFile(file);
//       setAddImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setEditImageFile(file);
//       setEditImagePreview(URL.createObjectURL(file));
//       setImageCleared(false);
//     }
//   };

//   const clearEditImage = () => {
//     setEditImageFile(null);
//     setEditImagePreview(null);
//     setImageCleared(true);
//     if (editImageInputRef.current) editImageInputRef.current.value = "";
//   };

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!addForm.volumeId) return toast.error("Select a volume");
//     if (!issueNumberTrimmed) return toast.error("Issue number is required");
//     if (isDuplicateInThisVolume) {
//       return toast.error(`Issue ${issueNumberTrimmed} already exists in this volume`);
//     }

//     const toastId = toast.loading("Creating issue...");

//     try {
//       const fd = new FormData();
//       fd.append("volumeId", addForm.volumeId);
//       fd.append("issueNumber", issueNumberTrimmed);
//       if (addForm.year) fd.append("year", addForm.year);
//       if (addForm.period?.trim()) fd.append("period", addForm.period.trim());
//       if (addForm.description?.trim()) fd.append("description", addForm.description.trim());
//       if (addImageFile) fd.append("image", addImageFile);

//       const res = await fetch("/api/admin/issues", { method: "POST", body: fd });
//       const json = await res.json();

//       if (json.success) {
//         toast.success(`Issue ${json.data.issueNumber} created`, { id: toastId });
//         setAddOpen(false);
//         setAddForm({ volumeId: "", issueNumber: "", year: "", period: "", description: "" });
//         setAddImageFile(null);
//         setAddImagePreview(null);
//         if (addImageInputRef.current) addImageInputRef.current.value = "";
//         fetchData();
//       } else {
//         toast.error(json.error || "Failed to create issue", { id: toastId });
//       }
//     } catch {
//       toast.error("Connection error", { id: toastId });
//     }
//   };

//   const startEdit = (issue: Issue) => {
//     setSelectedIssue(issue);
//     setEditForm({
//       issueNumber: issue.issueNumber,
//       year: issue.year?.toString() ?? "",
//       period: issue.period ?? "",
//       description: issue.description ?? "",
//       isVisible: issue.isVisible,
//     });
//     setEditImageFile(null);
//     setEditImagePreview(issue.imageUrl ?? null);
//     setImageCleared(false);
//     setEditOpen(true);
//   };

//   const handleEdit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedIssue) return;

//     const toastId = toast.loading("Updating...");

//     try {
//       const fd = new FormData();
//       fd.append("id", selectedIssue.id);
//       fd.append("issueNumber", editForm.issueNumber.trim());
//       if (editForm.year) fd.append("year", editForm.year);
//       if (editForm.period?.trim()) fd.append("period", editForm.period.trim());
//       if (editForm.description?.trim()) fd.append("description", editForm.description.trim());
//       fd.append("isVisible", editForm.isVisible.toString());

//       if (editImageFile) {
//         fd.append("image", editImageFile);
//       } else if (imageCleared) {
//         fd.append("imageUrl", "null");
//       }

//       const res = await fetch("/api/admin/issues", { method: "PATCH", body: fd });
//       const json = await res.json();

//       if (json.success) {
//         toast.success("Issue updated", { id: toastId });
//         setEditOpen(false);
//         setSelectedIssue(null);
//         fetchData();
//       } else {
//         toast.error(json.error || "Update failed", { id: toastId });
//       }
//     } catch {
//       toast.error("Connection error", { id: toastId });
//     }
//   };

//   const requestDelete = (issue: Issue) => {
//     setIssueToDelete(issue);
//     setDeleteOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!issueToDelete) return;
//     const toastId = toast.loading("Deleting...");

//     try {
//       const res = await fetch(`/api/admin/issues?id=${issueToDelete.id}`, { method: "DELETE" });
//       const json = await res.json();

//       if (json.success) {
//         toast.success("Issue deleted", { id: toastId });
//         setDeleteOpen(false);
//         setIssueToDelete(null);
//         fetchData();
//       } else {
//         toast.error(json.error || "Cannot delete (maybe has papers?)", { id: toastId });
//       }
//     } catch {
//       toast.error("Connection error", { id: toastId });
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold tracking-tight">Manage Issues</h2>
//         <Button onClick={() => setAddOpen(true)}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Issue
//         </Button>
//       </div>

//       {/* Add Dialog */}
//       <Dialog open={addOpen} onOpenChange={setAddOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>New Issue</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleAdd} className="space-y-5">
//             <div className="grid gap-2">
//               <Label>Volume</Label>
//               <Select
//                 value={addForm.volumeId}
//                 onValueChange={v => setAddForm({ ...addForm, volumeId: v })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select volume..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {volumes.map(v => (
//                     <SelectItem key={v.id} value={v.id}>
//                       {v.name} ({v.years})
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid gap-2">
//               <Label>Issue Number</Label>
//               <Input
//                 value={addForm.issueNumber}
//                 onChange={e => setAddForm({ ...addForm, issueNumber: e.target.value })}
//                 placeholder="1, 2, Special, Jan–Jun..."
//                 required
//               />
//               {addForm.volumeId && issueNumberTrimmed && (
//                 <p className={`text-sm mt-1 ${checkingDuplicate ? "text-muted-foreground" : isDuplicateInThisVolume ? "text-destructive" : "text-green-600"}`}>
//                   {checkingDuplicate
//                     ? "Checking..."
//                     : isDuplicateInThisVolume
//                     ? `Issue ${issueNumberTrimmed} already exists in this volume`
//                     : "✓ Available"}
//                 </p>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label>Year (optional)</Label>
//                 <Input
//                   type="number"
//                   value={addForm.year}
//                   onChange={e => setAddForm({ ...addForm, year: e.target.value })}
//                   placeholder="2025"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label>Period (optional)</Label>
//                 <Input
//                   value={addForm.period}
//                   onChange={e => setAddForm({ ...addForm, period: e.target.value })}
//                   placeholder="Jan–Jun"
//                 />
//               </div>
//             </div>

//             <div className="grid gap-2">
//               <Label>Description (optional)</Label>
//               <Textarea
//                 value={addForm.description}
//                 onChange={e => setAddForm({ ...addForm, description: e.target.value })}
//               />
//             </div>

//             <div className="grid gap-2">
//               <Label>Cover Image (optional)</Label>
//               <Input type="file" accept="image/*" onChange={handleAddImage} ref={addImageInputRef} />
//               {addImagePreview && (
//                 <img src={addImagePreview} alt="preview" className="mt-2 h-32 w-full object-cover rounded border" />
//               )}
//             </div>

//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={!addForm.volumeId || !issueNumberTrimmed || isDuplicateInThisVolume || checkingDuplicate}
//               >
//                 Create
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Table */}
//       {loading ? (
//         <div className="text-center py-12">Loading...</div>
//       ) : issues.length === 0 ? (
//         <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/30">
//           No issues yet
//         </div>
//       ) : (
//         <div className="rounded-lg border overflow-hidden">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Cover</TableHead>
//                 <TableHead>Volume</TableHead>
//                 <TableHead>Issue</TableHead>
//                 <TableHead>Year / Period</TableHead>
//                 <TableHead>Papers</TableHead>
//                 <TableHead>Visible</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {issues.map(issue => (
//                 <TableRow key={issue.id} className="hover:bg-muted/50">
//                   <TableCell>
//                     {issue.imageUrl ? (
//                       <img
//                         src={issue.imageUrl}
//                         alt="cover"
//                         className="h-12 w-12 object-cover rounded border"
//                         onError={e => (e.currentTarget.src = "/placeholder.png")}
//                       />
//                     ) : (
//                       <div className="h-12 w-12 bg-muted rounded flex center text-xs text-muted-foreground">
//                         No img
//                       </div>
//                     )}
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {issue.volume?.name} ({issue.volume?.years})
//                   </TableCell>
//                   <TableCell>{issue.issueNumber}</TableCell>
//                   <TableCell>
//                     {issue.year || "—"} {issue.period ? `(${issue.period})` : ""}
//                   </TableCell>
//                   <TableCell>{issue._count?.papers ?? 0}</TableCell>
//                   <TableCell>
//                     <Badge variant={issue.isVisible ? "default" : "secondary"}>
//                       {issue.isVisible ? "Yes" : "No"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right space-x-1">
//                     <Button variant="ghost" size="icon" onClick={() => startEdit(issue)}>
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon" className="text-destructive" onClick={() => requestDelete(issue)}>
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Edit Issue</DialogTitle>
//           </DialogHeader>
//           {selectedIssue && (
//             <form onSubmit={handleEdit} className="space-y-5">
//               {/* similar fields as add – omitted for brevity, copy from add form if needed */}
//               <DialogFooter>
//                 <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="submit">Save</Button>
//               </DialogFooter>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Issue</DialogTitle>
//             <DialogDescription>
//               Delete issue <strong>{issueToDelete?.issueNumber}</strong>?
//               <br />This cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
//             <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


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
  const [existingNumbersInVolume, setExistingNumbersInVolume] = useState<Set<string>>(new Set());
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);

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

  // Delete modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  const addImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [issuesRes, volumesRes] = await Promise.all([
        fetch("/api/admin/issues"),
        fetch("/api/admin/volumes"),
      ]);

      const issuesData = await issuesRes.json();
      const volumesData = await volumesRes.json();

      if (issuesData.success) setIssues(issuesData.data || []);
      if (volumesData.success) setVolumes(volumesData.data || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ── Duplicate prevention: load issue numbers for selected volume ───────
  useEffect(() => {
    if (!addForm.volumeId || !addOpen) {
      setExistingNumbersInVolume(new Set());
      return;
    }

    let active = true;
    setCheckingDuplicate(true);

    fetch(`/api/admin/issues?volumeId=${addForm.volumeId}&only=issueNumber`)
      .then(r => r.json())
      .then(data => {
        if (active && data.success) {
          const numbers = data.data.map((item: { issueNumber: string }) => item.issueNumber);
          setExistingNumbersInVolume(new Set(numbers));
        }
      })
      .catch(() => {}) // silent fail — Prisma unique constraint protects anyway
      .finally(() => {
        if (active) setCheckingDuplicate(false);
      });

    return () => { active = false; };
  }, [addForm.volumeId, addOpen]);

  const issueNumberTrimmed = addForm.issueNumber.trim();
  const isDuplicateInThisVolume = issueNumberTrimmed !== "" && existingNumbersInVolume.has(issueNumberTrimmed);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddImageFile(file);
      setAddImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
      setImageCleared(false);
    }
  };

  const clearEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview(null);
    setImageCleared(true);
    if (editImageInputRef.current) editImageInputRef.current.value = "";
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addForm.volumeId) return toast.error("Select a volume");
    if (!issueNumberTrimmed) return toast.error("Issue number is required");
    if (isDuplicateInThisVolume) {
      return toast.error(`Issue ${issueNumberTrimmed} already exists in this volume`);
    }

    const toastId = toast.loading("Creating issue...");

    try {
      const fd = new FormData();
      fd.append("volumeId", addForm.volumeId);
      fd.append("issueNumber", issueNumberTrimmed);
      if (addForm.year) fd.append("year", addForm.year);
      if (addForm.period?.trim()) fd.append("period", addForm.period.trim());
      if (addForm.description?.trim()) fd.append("description", addForm.description.trim());
      if (addImageFile) fd.append("image", addImageFile);

      const res = await fetch("/api/admin/issues", { method: "POST", body: fd });
      const json = await res.json();

      if (json.success) {
        toast.success(`Issue ${json.data.issueNumber} created`, { id: toastId });
        setAddOpen(false);
        resetAddForm();
        fetchData();
      } else {
        toast.error(json.error || "Failed to create issue", { id: toastId });
      }
    } catch {
      toast.error("Connection error", { id: toastId });
    }
  };

  const resetAddForm = () => {
    setAddForm({ volumeId: "", issueNumber: "", year: "", period: "", description: "" });
    setAddImageFile(null);
    setAddImagePreview(null);
    if (addImageInputRef.current) addImageInputRef.current.value = "";
    setExistingNumbersInVolume(new Set());
  };

  const startEdit = (issue: Issue) => {
    setSelectedIssue(issue);
    setEditForm({
      issueNumber: issue.issueNumber,
      year: issue.year?.toString() ?? "",
      period: issue.period ?? "",
      description: issue.description ?? "",
      isVisible: issue.isVisible,
    });
    setEditImageFile(null);
    setEditImagePreview(issue.imageUrl ?? null);
    setImageCleared(false);
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    const toastId = toast.loading("Updating issue...");

    try {
      const fd = new FormData();
      fd.append("id", selectedIssue.id);
      fd.append("issueNumber", editForm.issueNumber.trim());
      if (editForm.year) fd.append("year", editForm.year);
      if (editForm.period?.trim()) fd.append("period", editForm.period.trim());
      if (editForm.description?.trim()) fd.append("description", editForm.description.trim());
      fd.append("isVisible", editForm.isVisible.toString());

      if (editImageFile) {
        fd.append("image", editImageFile);
      } else if (imageCleared) {
        fd.append("imageUrl", "null");
      }

      const res = await fetch("/api/admin/issues", { method: "PATCH", body: fd });
      const json = await res.json();

      if (json.success) {
        toast.success("Issue updated", { id: toastId });
        setEditOpen(false);
        setSelectedIssue(null);
        fetchData();
      } else {
        toast.error(json.error || "Update failed", { id: toastId });
      }
    } catch {
      toast.error("Connection error", { id: toastId });
    }
  };

  const requestDelete = (issue: Issue) => {
    setIssueToDelete(issue);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!issueToDelete) return;
    const toastId = toast.loading("Deleting...");

    try {
      const res = await fetch(`/api/admin/issues?id=${issueToDelete.id}`, { method: "DELETE" });
      const json = await res.json();

      if (json.success) {
        toast.success("Issue deleted", { id: toastId });
        setDeleteOpen(false);
        setIssueToDelete(null);
        fetchData();
      } else {
        toast.error(json.error || "Cannot delete — issue may contain papers", { id: toastId });
      }
    } catch {
      toast.error("Connection error", { id: toastId });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Issues</h2>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Issue
        </Button>
      </div>

      {/* Add Issue Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Issue</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-5">
            <div className="grid gap-2">
              <Label>Volume</Label>
              <Select
                value={addForm.volumeId}
                onValueChange={v => setAddForm({ ...addForm, volumeId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select volume..." />
                </SelectTrigger>
                <SelectContent>
                  {volumes.map(v => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name} ({v.years})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Issue Number</Label>
              <Input
                value={addForm.issueNumber}
                onChange={e => setAddForm({ ...addForm, issueNumber: e.target.value })}
                placeholder="1, 2, Special, Jan–Jun..."
                required
              />
              {addForm.volumeId && issueNumberTrimmed && (
                <p className={`text-sm mt-1 ${checkingDuplicate ? "text-muted-foreground" : isDuplicateInThisVolume ? "text-destructive" : "text-green-600"}`}>
                  {checkingDuplicate
                    ? "Checking..."
                    : isDuplicateInThisVolume
                    ? `Issue ${issueNumberTrimmed} already exists in this volume`
                    : "✓ Available"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Year (optional)</Label>
                <Input
                  type="number"
                  value={addForm.year}
                  onChange={e => setAddForm({ ...addForm, year: e.target.value })}
                  placeholder="2025"
                />
              </div>
              <div className="grid gap-2">
                <Label>Period (optional)</Label>
                <Input
                  value={addForm.period}
                  onChange={e => setAddForm({ ...addForm, period: e.target.value })}
                  placeholder="Jan–Jun"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description (optional)</Label>
              <Textarea
                value={addForm.description}
                onChange={e => setAddForm({ ...addForm, description: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Cover Image (optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                ref={addImageInputRef}
              />
              {addImagePreview && (
                <img
                  src={addImagePreview}
                  alt="preview"
                  className="mt-2 h-32 w-full object-cover rounded border"
                />
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!addForm.volumeId || !issueNumberTrimmed || isDuplicateInThisVolume || checkingDuplicate}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Issues Table */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : issues.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/30">
          No issues yet
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Year / Period</TableHead>
                <TableHead>Papers</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map(issue => (
                <TableRow key={issue.id} className="hover:bg-muted/50">
                  <TableCell>
                    {issue.imageUrl ? (
                      <img
                        src={issue.imageUrl}
                        alt="cover"
                        className="h-12 w-12 object-cover rounded border"
                        onError={e => (e.currentTarget.src = "/placeholder.png")}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No img
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
                  <TableCell>{issue._count?.papers ?? 0}</TableCell>
                  <TableCell>
                    <Badge variant={issue.isVisible ? "default" : "secondary"}>
                      {issue.isVisible ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(issue)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => requestDelete(issue)}
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

      {/* Edit Issue Dialog */}
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
                  onChange={e => setEditForm({ ...editForm, issueNumber: e.target.value })}
                  required readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Year (optional)</Label>
                  <Input
                    type="number"
                    value={editForm.year}
                    onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                    placeholder="2025"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Period (optional)</Label>
                  <Input
                    value={editForm.period}
                    onChange={e => setEditForm({ ...editForm, period: e.target.value })}
                    placeholder="Jan–Jun"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={editForm.description}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Cover Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImage}
                  ref={editImageInputRef}
                />
                <div className="mt-2">
                  {editImagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={editImagePreview}
                        alt="Preview"
                        className="h-32 w-full object-cover rounded border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={clearEditImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : selectedIssue.imageUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={selectedIssue.imageUrl}
                        alt="Current cover"
                        className="h-32 w-full object-cover rounded border"
                        onError={e => (e.currentTarget.src = "/placeholder.png")}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={clearEditImage}
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
                  <p className="text-sm text-muted-foreground">Show this issue publicly</p>
                </div>
                <Switch
                  checked={editForm.isVisible}
                  onCheckedChange={checked => setEditForm({ ...editForm, isVisible: checked })}
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
              Are you sure you want to delete issue{" "}
              <span className="font-semibold">{issueToDelete?.issueNumber}</span>?
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