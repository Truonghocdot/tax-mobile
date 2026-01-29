import { useState, useRef } from "react";
import { Info, Upload, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import trongDongImage from "@/assets/trong.png";

interface UploadSection {
  id: string;
  label: string;
  type: "image" | "video";
  file: File | null;
  preview: string | null;
}

const Identification = () => {
  const { toast } = useToast();
  const [uploads, setUploads] = useState<UploadSection[]>([
    {
      id: "front",
      label: "Tải lên CCCD mặt trước:",
      type: "image",
      file: null,
      preview: null,
    },
    {
      id: "back",
      label: "Tải lên CCCD mặt sau:",
      type: "image",
      file: null,
      preview: null,
    },
    {
      id: "video",
      label: "Tải video từ 3-5 giây",
      type: "video",
      file: null,
      preview: null,
    },
    {
      id: "selfie",
      label: "Tải lên ảnh cầm CCCD:",
      type: "image",
      file: null,
      preview: null,
    },
  ]);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileSelect = (id: string, file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    const section = uploads.find((u) => u.id === id);

    if (section?.type === "video" && !isVideo) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file video",
        variant: "destructive",
      });
      return;
    }

    if (section?.type === "image" && !isImage) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file ảnh",
        variant: "destructive",
      });
      return;
    }

    const preview = URL.createObjectURL(file);
    setUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, file, preview } : u)),
    );
  };

  const handleRemove = (id: string) => {
    setUploads((prev) =>
      prev.map((u) => {
        if (u.id === id && u.preview) {
          URL.revokeObjectURL(u.preview);
        }
        return u.id === id ? { ...u, file: null, preview: null } : u;
      }),
    );
  };

  const handleSubmit = () => {
    const missingUploads = uploads.filter((u) => !u.file);
    if (missingUploads.length > 0) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng tải lên đầy đủ các file yêu cầu",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Đã gửi thông tin định danh. Vui lòng chờ xác minh.",
    });
  };

  return (
    <div className="min-h-screen relative z-10">
      <div className="px-4 pt-4 pb-8">
        {/* Instructions */}
        <div
          className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
          style={{
            backgroundImage: `url(${trongDongImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Hướng dẫn:</span> Vui lòng tải lên
              ảnh CCCD mặt trước, mặt sau, ảnh cầm CCCD và video xác thực (3-5
              giây) để hoàn tất quá trình định danh.
            </p>
          </div>
        </div>

        {/* Upload Sections */}
        <div className="space-y-4">
          {uploads.map((section) => (
            <div
              key={section.id}
              className="bg-card rounded-xl p-4 shadow-sm border border-border"
              style={{
                backgroundImage: `url(${trongDongImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <label className="text-sm font-medium text-foreground mb-3 block">
                {section.label}
              </label>

              <div className="flex flex-col items-center gap-3">
                {section.preview ? (
                  <div className="relative w-full max-w-xs">
                    {section.type === "image" ? (
                      <img
                        src={section.preview}
                        alt={section.label}
                        className="w-full h-40 object-cover rounded-lg border border-border"
                      />
                    ) : (
                      <video
                        src={section.preview}
                        controls
                        className="w-full h-40 object-cover rounded-lg border border-border"
                      />
                    )}
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => fileInputRefs.current[section.id]?.click()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6"
                  >
                    {section.type === "video" ? (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Chọn video
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Chọn ảnh
                      </>
                    )}
                  </Button>
                )}

                <input
                  ref={(el) => (fileInputRefs.current[section.id] = el)}
                  type="file"
                  accept={section.type === "video" ? "video/*" : "image/*"}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(section.id, file);
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (section.preview) {
                      handleRemove(section.id);
                    } else {
                      fileInputRefs.current[section.id]?.click();
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                >
                  <X className="w-5 h-5 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-12 mt-6 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          <Upload className="w-5 h-5 mr-2" />
          Hoàn Tất Định Danh
        </Button>
      </div>
    </div>
  );
};

export default Identification;
