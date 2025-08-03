import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { StreamSettings } from '@/types/cctv';

interface CCTVSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CCTVSettings = ({ open, onOpenChange }: CCTVSettingsProps) => {
  const [settings, setSettings] = useState<StreamSettings>({
    quality: 'medium',
    autoRefresh: true,
    refreshInterval: 30
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>CCTV System Settings</DialogTitle>
          <DialogDescription>
            Configure stream quality and monitoring preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Stream Quality */}
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="quality" className="text-base font-medium">
                  Stream Quality
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Higher quality requires more bandwidth
                </p>
                <Select
                  value={settings.quality}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    setSettings(prev => ({ ...prev, quality: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (480p)</SelectItem>
                    <SelectItem value="medium">Medium (720p)</SelectItem>
                    <SelectItem value="high">High (1080p)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Auto Refresh */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-refresh" className="text-base font-medium">
                    Auto Refresh
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh camera status
                  </p>
                </div>
                <Switch
                  id="auto-refresh"
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, autoRefresh: checked }))
                  }
                />
              </div>

              {settings.autoRefresh && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Refresh Interval: {settings.refreshInterval} seconds
                  </Label>
                  <Slider
                    value={[settings.refreshInterval]}
                    onValueChange={([value]) =>
                      setSettings(prev => ({ ...prev, refreshInterval: value }))
                    }
                    max={120}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5s</span>
                    <span>120s</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* System Information */}
          <Card className="p-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">System Information</Label>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Version:</span>
                  <p>v1.0.0</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Update:</span>
                  <p>2024-01-15</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Uptime:</span>
                  <p>24h 15m</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Storage:</span>
                  <p>2.5TB / 5TB</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};