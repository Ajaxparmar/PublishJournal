// src/components/admin/MobileSidebar.tsx
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="text-xl font-bold">Admin Panel</div>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <Sidebar />
      </div>
    </div>
  );
}