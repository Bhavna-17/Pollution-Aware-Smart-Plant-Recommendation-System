import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File, preview: string) => void;
  currentImage?: string;
  onClear?: () => void;
  className?: string;
}

const ImageUploader = ({
  onImageUpload,
  currentImage,
  onClear,
  className,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          processFile(file);
        }
      }
    },
    [onImageUpload]
  );

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageUpload(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onClear?.();
  };

  if (preview) {
    return (
      <Card variant="nature" className={cn("overflow-hidden", className)}>
        <div className="relative">
          <img
            src={preview}
            alt="Uploaded space"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Success indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-sage/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Image uploaded
          </div>

          {/* Clear button */}
          <button
            onClick={handleClear}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-eco"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          {/* Change image button */}
          <div className="absolute bottom-4 left-4 right-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button variant="soft" size="sm" className="w-full" asChild>
                <span>
                  <Camera className="w-4 h-4 mr-2" />
                  Change Image
                </span>
              </Button>
            </label>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="nature"
      className={cn(
        "relative border-2 border-dashed transition-all duration-300 cursor-pointer",
        isDragging ? "border-sage bg-sage/5 scale-[1.02]" : "border-border/50 hover:border-sage/50",
        className
      )}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label className="cursor-pointer block p-8">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sage/10 flex items-center justify-center">
            {isDragging ? (
              <Upload className="w-8 h-8 text-sage animate-bounce-soft" />
            ) : (
              <ImageIcon className="w-8 h-8 text-sage" />
            )}
          </div>
          
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Upload Your Space
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop an image, or click to browse
          </p>
          
          <Button variant="eco" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Choose Image
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Supports JPG, PNG, WEBP (max 10MB)
          </p>
        </div>
      </label>
    </Card>
  );
};

export default ImageUploader;
