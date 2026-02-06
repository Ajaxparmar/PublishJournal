// src/components/admin/Topbar.tsx
"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebar } from "./MobileSidebar";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export function Topbar() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-8">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <MobileSidebar />
          </SheetContent>
        </Sheet>

        {/* Title / Breadcrumb */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>

        {/* Right side – User info */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">
                  {userName}
                </span>
              </div>

              {/* Profile / Actions button */}
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}