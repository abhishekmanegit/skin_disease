
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Check, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageCapture: (image: string) => void;
}

const ImageUpload = ({ onImageCapture }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setSelectedImage(imageDataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const acceptImage = useCallback(() => {
    if (selectedImage) {
      onImageCapture(selectedImage);
      setSelectedImage(null);
    }
  }, [selectedImage, onImageCapture]);

  const retakeImage = useCallback(() => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-6">
            <Image className="h-20 w-20 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center mb-2">Upload a photo of the affected skin area</p>
            <p className="text-gray-400 text-sm text-center">For better results, ensure good lighting and a clear view of the condition</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-center space-x-4">
            {!selectedImage ? (
              <>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <Button
                  variant="outline"
                  className="bg-white text-black hover:bg-gray-100 rounded-full"
                  onClick={triggerFileInput}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Image
                </Button>
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

export default ImageUpload;
