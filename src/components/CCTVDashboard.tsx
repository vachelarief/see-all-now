import { useState } from 'react';
import { Grid, List, Camera, Settings, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CCTVGrid } from './CCTVGrid';
import { CCTVList } from './CCTVList';
import { CCTVSettings } from './CCTVSettings';
import { AddCameraDialog } from './AddCameraDialog';
import { useCCTVData } from '@/hooks/useCCTVData';
import { ViewMode } from '@/types/cctv';

export const CCTVDashboard = () => {
  const { cameras } = useCCTVData();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAddCamera, setShowAddCamera] = useState(false);

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineCameras = cameras.filter(camera => camera.isOnline).length;
  const internalCameras = cameras.filter(camera => camera.networkType === 'internal').length;
  const externalCameras = cameras.filter(camera => camera.networkType === 'external').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Camera className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">CCTV Monitor</h1>
                <p className="text-sm text-muted-foreground">
                  {onlineCameras}/{cameras.length} cameras online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Status Badges */}
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                  {onlineCameras} Online
                </Badge>
                <Badge variant="outline" className="border-primary/30">
                  {internalCameras} Internal
                </Badge>
                <Badge variant="outline" className="border-warning/30">
                  {externalCameras} External
                </Badge>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowAddCamera(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Camera
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cameras by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {viewMode === 'grid' ? (
          <CCTVGrid cameras={filteredCameras} />
        ) : (
          <CCTVList cameras={filteredCameras} />
        )}
      </main>

      {/* Dialogs */}
      <CCTVSettings 
        open={showSettings} 
        onOpenChange={setShowSettings} 
      />
      <AddCameraDialog 
        open={showAddCamera} 
        onOpenChange={setShowAddCamera} 
      />
    </div>
  );
};