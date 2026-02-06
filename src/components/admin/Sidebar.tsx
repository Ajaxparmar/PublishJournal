// src/components/admin/Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Newspaper,
  BookOpen,
  Settings,
  LogOut,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Articles",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    title: "Volumes",
    href: "/admin/volumes",
    icon: BookOpen,
  },
  {
    title: "Published Articles",
    href: "/admin/published",
    icon: Newspaper,
  },
  {
    title: "Issues",
    href: "/admin/issues",
    icon: BookOpen,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const adminName = session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r lg:bg-card lg:fixed lg:inset-y-0 lg:z-30">
      <div className="flex h-full flex-col">
        {/* Header / Admin Info */}
        <div className="flex h-16 items-center border-b px-6 gap-3 bg-muted/40">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCog className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-20 mt-1" />
              </>
            ) : (
              <>
                <span className="font-semibold text-base">{adminName}</span>
                <span className="text-xs text-muted-foreground">Administrator</span>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Logout Section */}
        <div className="border-t p-4 mt-auto bg-muted/30">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}