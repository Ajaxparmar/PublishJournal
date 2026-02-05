// app/admin/layout.tsx
import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | IJIOS",
    template: "%s | Admin | IJIOS",
  },
  description: "Management dashboard for International Journal of Interdisciplinary Organizational Studies",
  keywords: ["admin panel", "journal management", "paper review", "editor dashboard"],
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}