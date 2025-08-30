
import React, { useState, useRef, useCallback } from 'react';
import { Camera, FlipCamera, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraCaptureProps {
  onImageCapture: (image: string) => void;
}

const CameraCapture = ({ onImageCapture }: CameraCaptureProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access the camera. Please ensure you have granted permission.');
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  }, []);

  const toggleCamera = useCallback(() => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [isCameraActive, startCamera, stopCamera]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (isCameraActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 300);
    }
  }, [isCameraActive, startCamera, stopCamera]);

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  }, [stopCamera]);

  const acceptImage = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
      setCapturedImage(null);
    }
  }, [capturedImage, onImageCapture]);

  const retakeImage = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] shadow-lg">
        {isCameraActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className={cn(
              "w-full h-full object-cover",
              facingMode === 'user' ? 'transform scale-x-[-1]' : ''
            )}
          />
        ) : capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className={cn(
              "w-full h-full object-cover",
              facingMode === 'user' ? 'transform scale-x-[-1]' : ''
            )}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <Camera className="h-20 w-20 text-gray-400" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-center space-x-4">
            {!capturedImage ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-black hover:bg-gray-100 rounded-full"
                  onClick={toggleCamera}
                >
                  <Camera className="h-5 w-5" />
                </Button>
                
                {isCameraActive && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white text-black hover:bg-gray-100 rounded-full"
                      onClick={switchCamera}
                    >
                      <FlipCamera className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      variant="default"
                      size="icon"
                      className="bg-skin-primary hover:bg-skin-primary/90 rounded-full"
                      onClick={captureImage}
                    >
                      <div className="h-10 w-10 rounded-full border-2 border-white" />
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-red-500 hover:bg-gray-100 rounded-full"
                  onClick={retakeImage}
                >
                  <X className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-green-500 hover:bg-gray-100 rounded-full"
                  onClick={acceptImage}
                >
                  <Check className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
