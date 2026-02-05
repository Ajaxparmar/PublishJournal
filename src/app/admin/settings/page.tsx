// app/admin/settings/page.tsx
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>Manage journal basic settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="journalName">Journal Name</Label>
                <Input id="journalName" defaultValue="International Journal of Organizational Studies" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="doiPrefix">DOI Prefix</Label>
                <Input id="doiPrefix" defaultValue="10.18848/2324-7649/CGP" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Open Access by Default</Label>
                  <p className="text-sm text-muted-foreground">
                    All new articles will be published as open access
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Save button */}
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
  );
}