import { ChevronLeft, Home, Menu, Wifi, Battery, Signal } from "lucide-react";

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  showHome?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  variant?: "primary" | "transparent";
}

const MobileHeader = ({
  title,
  showBack = false,
  showHome = false,
  showMenu = false,
  onBack,
  onHome,
  onMenu,
  variant = "primary",
}: MobileHeaderProps) => {
  const isPrimary = variant === "primary";

  return (
    <header
      className={`sticky top-0 z-40 safe-top ${
        isPrimary ? "bg-gradient-primary text-primary-foreground" : "bg-transparent text-foreground"
      }`}
    >
      {/* Navigation bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="w-10">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full transition-colors active:bg-white/10"
              aria-label="Quay lại"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {showMenu && (
            <button
              onClick={onMenu}
              className="p-2 -ml-2 rounded-full transition-colors active:bg-white/10"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>

        <h1 className="font-semibold text-lg">{title}</h1>

        <div className="w-10 flex justify-end">
          {showHome && (
            <button
              onClick={onHome}
              className="p-2 -mr-2 rounded-full transition-colors active:bg-white/10"
              aria-label="Trang chủ"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
