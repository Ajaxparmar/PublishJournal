// Example: app/admin/users/page.tsx (simplified)
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// ... other imports
type User = {
    id: string;
    username: string;
    email: string;
    role: "ADMIN" | "USER";
    createdAt: string;
    updatedAt: string;
};


export default function UsersAdminPage() {

    const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "USER" });
    const [open, setOpen] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const res = await fetch("/api/admin/users");
        const json = await res.json();
        console.log(json);

        if (json.success) setUsers(json.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers();
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const res = await fetch("/api/admin/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        console.log(res);

        if (res.ok) {
            setOpen(false);
            fetchUsers();
            // reset form...
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Users Management</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Add User</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Username</Label>
                                <Input
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Role</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(v) => setFormData({ ...formData, role: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="USER">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">Create User</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="p-3 text-left">Username</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Created</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                    No users found
                                </td>
                            </tr>
                        )}

                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${user.role === "ADMIN"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-right space-x-2">
                                    <Button size="sm" variant="outline">
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}