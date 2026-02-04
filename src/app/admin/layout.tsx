// app/admin/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import { AdminLayout } from "@/components/admin/AdminLayout";
import { Toaster } from "@/components/ui/sonner";

// If you want a different font just for admin → or keep the same as main app
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - IJOS Journal",
  description: "Management dashboard for International Journal of Organizational Studies",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrap all admin pages with your custom admin layout */}
        <AdminLayout>
          {children}
        </AdminLayout>

        {/* Global toaster for notifications */}
        <Toaster />

        {/* Optional: admin-specific scripts or providers can go here */}
      </body>
    </html>
  );
}