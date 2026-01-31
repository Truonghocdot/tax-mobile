import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import trongDong from "@/assets/trongdong.png";

const QrPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 120)); // Reset to 120 (2 mins) or loop
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#8B0000] flex flex-col relative overflow-hidden">
      {/* Background Pattern (Optional) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url(${trongDong})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-4 px-6 relative z-10 text-white">
        {/* Logo Section */}
        <h2 className="text-xl font-bold text-yellow-400 uppercase mb-8 tracking-wide text-center">
          MÃ ĐỊNH DANH ĐIỆN TỬ
        </h2>
        {/* QR Card */}
        <div className="bg-[#FFFBE6] w-full max-w-sm rounded-[2rem] p-8 flex flex-col items-center shadow-xl">
          <div className="bg-white p-2 rounded-xl shadow-inner mb-4">
            {/* QR Code Placeholder - using an API for visual */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ElectronicTaxIdentificationVerified"
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
            {/* Center Logo in QR (optional visual trick) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Overlay logo if needed, skipped for simplicity */}
            </div>
          </div>

          <p className="text-red-600 font-semibold text-sm animate-pulse">
            Hiệu lực của QR code còn {formatTime(timeLeft)}
          </p>
        </div>
        {/* Download Button */}
        <div className="w-full max-w-sm mb-8 mt-6">
          <Button
            className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-red-900 font-bold text-lg h-14 rounded-full shadow-lg flex items-center justify-center gap-2"
            onClick={() => {
              // Download logic or Toast
            }}
          >
            <Download className="w-5 h-5" />
            Tải về máy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QrPage;
