import { useState, useEffect } from 'react';
import { CCTVCamera } from '@/types/cctv';

// Mock data untuk demo
const mockCameras: CCTVCamera[] = [
  {
    id: '1',
    name: 'Lobby Utama',
    location: 'Lantai 1 - Lobby',
    ipAddress: '192.168.1.100',
    port: 554,
    streamUrl: 'rtsp://192.168.1.100:554/stream',
    isOnline: true,
    networkType: 'internal',
    lastSeen: new Date(),
    resolution: '1920x1080',
    brand: 'Hikvision',
    model: 'DS-2CD2085G1'
  },
  {
    id: '2',
    name: 'Parkiran Depan',
    location: 'Area Parkir - Depan',
    ipAddress: '192.168.1.101',
    port: 554,
    streamUrl: 'rtsp://192.168.1.101:554/stream',
    isOnline: true,
    networkType: 'internal',
    lastSeen: new Date(),
    resolution: '1920x1080',
    brand: 'Dahua',
    model: 'IPC-HFW4431R-Z'
  },
  {
    id: '3',
    name: 'Gudang Belakang',
    location: 'Area Gudang',
    ipAddress: '203.45.67.89',
    port: 554,
    streamUrl: 'rtsp://203.45.67.89:554/stream',
    isOnline: false,
    networkType: 'external',
    lastSeen: new Date(Date.now() - 300000),
    resolution: '1280x720',
    brand: 'Axis',
    model: 'M3026-VE'
  },
  {
    id: '4',
    name: 'Pintu Masuk Karyawan',
    location: 'Lantai 1 - Side Entrance',
    ipAddress: '192.168.1.102',
    port: 554,
    streamUrl: 'rtsp://192.168.1.102:554/stream',
    isOnline: true,
    networkType: 'internal',
    lastSeen: new Date(),
    resolution: '1920x1080',
    brand: 'Hikvision',
    model: 'DS-2CD2T47G1-L'
  },
  {
    id: '5',
    name: 'Ruang Server',
    location: 'Lantai 2 - Server Room',
    ipAddress: '192.168.1.103',
    port: 554,
    streamUrl: 'rtsp://192.168.1.103:554/stream',
    isOnline: true,
    networkType: 'internal',
    lastSeen: new Date(),
    resolution: '1920x1080',
    brand: 'Dahua',
    model: 'IPC-HDBW4431R-ZS'
  },
  {
    id: '6',
    name: 'Kantor Cabang',
    location: 'Remote Office',
    ipAddress: '203.45.67.90',
    port: 554,
    streamUrl: 'rtsp://203.45.67.90:554/stream',
    isOnline: true,
    networkType: 'external',
    lastSeen: new Date(),
    resolution: '1280x720',
    brand: 'Axis',
    model: 'P3225-LV'
  }
];

export const useCCTVData = () => {
  const [cameras, setCameras] = useState<CCTVCamera[]>(mockCameras);
  const [loading, setLoading] = useState(false);

  const updateCameraStatus = (id: string, isOnline: boolean) => {
    setCameras(prev => prev.map(camera => 
      camera.id === id 
        ? { ...camera, isOnline, lastSeen: new Date() }
        : camera
    ));
  };

  const addCamera = (camera: Omit<CCTVCamera, 'id' | 'lastSeen'>) => {
    const newCamera: CCTVCamera = {
      ...camera,
      id: Date.now().toString(),
      lastSeen: new Date()
    };
    setCameras(prev => [...prev, newCamera]);
  };

  const removeCamera = (id: string) => {
    setCameras(prev => prev.filter(camera => camera.id !== id));
  };

  const updateCamera = (id: string, updates: Partial<CCTVCamera>) => {
    setCameras(prev => prev.map(camera => 
      camera.id === id 
        ? { ...camera, ...updates, lastSeen: new Date() }
        : camera
    ));
  };

  // Simulate periodic status checks
  useEffect(() => {
    const interval = setInterval(() => {
      setCameras(prev => prev.map(camera => ({
        ...camera,
        isOnline: Math.random() > 0.1 // 90% chance to be online
      })));
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    cameras,
    loading,
    updateCameraStatus,
    addCamera,
    removeCamera,
    updateCamera
  };
};