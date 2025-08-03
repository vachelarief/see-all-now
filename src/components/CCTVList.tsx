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
  Eye,
  Settings,
  Trash2,
  Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CCTVListProps {
  cameras: CCTVCamera[];
}

export const CCTVList = ({ cameras }: CCTVListProps) => {
  return (
    <div className="space-y-4">
      {cameras.length === 0 ? (
        <Card className="p-8">
          <div className="text-center text-muted-foreground">
            <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No cameras found</h3>
            <p>Try adjusting your search or add a new camera.</p>
          </div>
        </Card>
      ) : (
        cameras.map((camera) => (
          <Card key={camera.id} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
              {/* Camera Preview */}
              <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Monitor className="h-6 w-6 text-muted-foreground" />
              </div>

              {/* Camera Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground truncate">{camera.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{camera.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={camera.isOnline ? 'default' : 'destructive'}
                      className={`${
                        camera.isOnline 
                          ? 'bg-success/90 text-white' 
                          : 'bg-destructive/90 text-white'
                      }`}
                    >
                      {camera.isOnline ? (
                        <>
                          <Wifi className="h-3 w-3 mr-1" />
                          Online
                        </>
                      ) : (
                        <>
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">IP Address:</span>
                    <p className="font-mono">{camera.ipAddress}:{camera.port}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolution:</span>
                    <p>{camera.resolution}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <p>{camera.brand} {camera.model}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Network:</span>
                    <div className="flex items-center gap-1">
                      {camera.networkType === 'internal' ? (
                        <>
                          <Home className="h-3 w-3 text-primary" />
                          <span className="text-primary">Internal</span>
                        </>
                      ) : (
                        <>
                          <Globe className="h-3 w-3 text-warning" />
                          <span className="text-warning">External</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Last seen: {formatDistanceToNow(camera.lastSeen, { addSuffix: true })}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};