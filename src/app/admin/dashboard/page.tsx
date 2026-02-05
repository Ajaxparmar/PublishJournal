// app/admin/dashboard/page.tsx
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function DashboardPage() {
  return (

      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Cards, stats, tables... */}
          <div className="rounded-xl border bg-card p-6">
            <div className="text-sm font-medium text-muted-foreground">Total Users</div>
            <div className="text-3xl font-bold">2,834</div>
          </div>
          {/* ... more cards */}
        </div>
      </div>
    
  );
}