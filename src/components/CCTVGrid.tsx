import { useState } from 'react';
import { CCTVCamera } from '@/types/cctv';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Wifi, 
  WifiOff, 
  Globe, 
  Home, 
  Maximize2,
  Settings,
  Play,
  Pause
} from 'lucide-react';

interface CCTVGridProps {
  cameras: CCTVCamera[];
}

export const CCTVGrid = ({ cameras }: CCTVGridProps) => {
  const [gridSize, setGridSize] = useState({ rows: 2, cols: 2 });
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const gridSizes = [
    { rows: 2, cols: 2, label: '2x2' },
    { rows: 2, cols: 3, label: '2x3' },
    { rows: 3, cols: 3, label: '3x3' },
    { rows: 3, cols: 4, label: '3x4' },
    { rows: 4, cols: 4, label: '4x4' }
  ];

  const maxCameras = gridSize.rows * gridSize.cols;
  const displayCameras = cameras.slice(0, maxCameras);

  return (
    <div className="space-y-6">
      {/* Grid Size Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Grid Size:</span>
          {gridSizes.map((size) => (
            <Button
              key={size.label}
              variant={gridSize.rows === size.rows && gridSize.cols === size.cols ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGridSize(size)}
            >
              {size.label}
            </Button>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {displayCameras.length} of {cameras.length} cameras
        </div>
      </div>

      {/* Camera Grid */}
      <div 
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
        }}
      >
        {Array.from({ length: maxCameras }).map((_, index) => {
          const camera = displayCameras[index];
          
          if (!camera) {
            return (
              <Card key={index} className="aspect-video bg-muted/20 border-dashed border-muted-foreground/30">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Monitor className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No Camera</p>
                  </div>
                </div>
              </Card>
            );
          }

          return (
            <Card 
              key={camera.id} 
              className={`aspect-video relative overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-primary/50 ${
                selectedCamera === camera.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCamera(camera.id)}
            >
              {/* Video Stream Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/80">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Monitor className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">Live Stream</p>
                    <p className="text-xs text-muted-foreground/70">{camera.resolution}</p>
                  </div>
                </div>
              </div>

              {/* Camera Info Overlay */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white text-sm truncate">{camera.name}</h3>
                    <p className="text-xs text-white/80 truncate">{camera.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge 
                      variant={camera.isOnline ? 'default' : 'destructive'}
                      className={`px-1.5 py-0.5 text-xs ${
                        camera.isOnline 
                          ? 'bg-success/90 text-white' 
                          : 'bg-destructive/90 text-white'
                      }`}
                    >
                      {camera.isOnline ? (
                        <Wifi className="h-3 w-3" />
                      ) : (
                        <WifiOff className="h-3 w-3" />
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {camera.networkType === 'internal' ? (
                      <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary text-xs">
                        <Home className="h-3 w-3 mr-1" />
                        Internal
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-warning/20 border-warning/30 text-warning text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        External
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-white hover:bg-white/20"
                    >
                      {camera.isOnline ? (
                        <Play className="h-3 w-3" />
                      ) : (
                        <Pause className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-white hover:bg-white/20"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-white hover:bg-white/20"
                    >
                      <Maximize2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Grid Summary */}
      {cameras.length > maxCameras && (
        <Card className="p-4 bg-muted/30">
          <p className="text-center text-sm text-muted-foreground">
            {cameras.length - maxCameras} more cameras available. 
            <Button variant="link" className="px-2 h-auto py-0 text-primary">
              Expand grid or switch to list view
            </Button>
          </p>
        </Card>
      )}
    </div>
  );
};