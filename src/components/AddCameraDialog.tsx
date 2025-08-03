import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useCCTVData } from '@/hooks/useCCTVData';
import { CCTVCamera } from '@/types/cctv';

interface AddCameraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddCameraDialog = ({ open, onOpenChange }: AddCameraDialogProps) => {
  const { addCamera } = useCCTVData();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ipAddress: '',
    port: '554',
    streamUrl: '',
    networkType: 'internal' as 'internal' | 'external',
    resolution: '1920x1080',
    brand: '',
    model: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCamera: Omit<CCTVCamera, 'id' | 'lastSeen'> = {
      ...formData,
      port: parseInt(formData.port),
      isOnline: false // Will be checked after adding
    };

    addCamera(newCamera);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      ipAddress: '',
      port: '554',
      streamUrl: '',
      networkType: 'internal',
      resolution: '1920x1080',
      brand: '',
      model: '',
      description: ''
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-generate stream URL when IP and port change
  const generateStreamUrl = () => {
    if (formData.ipAddress && formData.port) {
      const url = `rtsp://${formData.ipAddress}:${formData.port}/stream`;
      updateField('streamUrl', url);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Camera</DialogTitle>
          <DialogDescription>
            Configure a new CCTV camera for monitoring.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Camera Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., Main Entrance"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="e.g., Floor 1 - Lobby"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Network Configuration */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Network Configuration</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="ipAddress">IP Address *</Label>
                  <Input
                    id="ipAddress"
                    value={formData.ipAddress}
                    onChange={(e) => updateField('ipAddress', e.target.value)}
                    placeholder="192.168.1.100"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="port">Port *</Label>
                  <Input
                    id="port"
                    value={formData.port}
                    onChange={(e) => updateField('port', e.target.value)}
                    placeholder="554"
                    type="number"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="networkType">Network Type</Label>
                <Select
                  value={formData.networkType}
                  onValueChange={(value: 'internal' | 'external') =>
                    updateField('networkType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal Network</SelectItem>
                    <SelectItem value="external">External Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="streamUrl">Stream URL</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateStreamUrl}
                  >
                    Auto Generate
                  </Button>
                </div>
                <Input
                  id="streamUrl"
                  value={formData.streamUrl}
                  onChange={(e) => updateField('streamUrl', e.target.value)}
                  placeholder="rtsp://192.168.1.100:554/stream"
                />
              </div>
            </div>
          </Card>

          {/* Camera Specifications */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Camera Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => updateField('brand', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hikvision">Hikvision</SelectItem>
                    <SelectItem value="Dahua">Dahua</SelectItem>
                    <SelectItem value="Axis">Axis</SelectItem>
                    <SelectItem value="Bosch">Bosch</SelectItem>
                    <SelectItem value="Sony">Sony</SelectItem>
                    <SelectItem value="Samsung">Samsung</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => updateField('model', e.target.value)}
                  placeholder="e.g., DS-2CD2085G1"
                />
              </div>
              <div>
                <Label htmlFor="resolution">Resolution</Label>
                <Select
                  value={formData.resolution}
                  onValueChange={(value) => updateField('resolution', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1280x720">HD (720p)</SelectItem>
                    <SelectItem value="1920x1080">Full HD (1080p)</SelectItem>
                    <SelectItem value="2560x1440">QHD (1440p)</SelectItem>
                    <SelectItem value="3840x2160">4K (2160p)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Additional notes about this camera..."
                rows={3}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Camera
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};