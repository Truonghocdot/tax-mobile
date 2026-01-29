import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import MenuSidebar from "@/components/MenuSidebar";
import backgroundImage from "@/assets/background.png";

interface PageConfig {
  title: string;
  showBack?: boolean;
  showHome?: boolean;
  showMenu?: boolean;
  variant?: "primary" | "transparent";
  hideHeader?: boolean;
  hideBottomNav?: boolean;
}

const pageConfigs: Record<string, PageConfig> = {
  "/": {
    title: "Thuế Điện Tử",
    showMenu: true,
    variant: "transparent",
    hideHeader: true, // Dashboard has custom header
  },
  "/tax-payment": {
    title: "Nộp thuế",
    showBack: true,
    showHome: true,
  },
  "/tax-payment-proxy": {
    title: "Nộp thuế thay",
    showBack: true,
    showHome: true,
  },
  "/tax-lookup": {
    title: "Tra cứu hồ sơ khai thuế",
    showBack: true,
    showHome: true,
  },
  "/notifications": {
    title: "Thông báo",
    showBack: true,
    showHome: true,
  },
  "/profile": {
    title: "Cập nhật hồ sơ",
    showBack: true,
    showHome: true,
  },
  "/identification": {
    title: "Thuế Điện Tử",
    showBack: true,
    showHome: true,
  },
  "/bank-registration": {
    title: "Đăng ký ngân hàng",
    showBack: true,
    showHome: true,
  },
};

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentConfig = pageConfigs[location.pathname] || {
    title: "Thuế Điện Tử",
    showBack: true,
    showHome: true,
  };

  return (
    <div className="mobile-container relative min-h-screen bg-background pb-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 2,
        }}
      ></div>
      {/* Header - only show if not hidden */}
      {!currentConfig.hideHeader && (
        <MobileHeader
          title={currentConfig.title}
          showBack={currentConfig.showBack}
          showHome={currentConfig.showHome}
          showMenu={currentConfig.showMenu}
          onBack={() => navigate(-1)}
          onHome={() => navigate("/")}
          onMenu={() => setMenuOpen(true)}
          variant={currentConfig.variant}
        />
      )}

      {/* Page Content */}
      <Outlet context={{ menuOpen, setMenuOpen }} />

      {/* Menu Sidebar - only for pages that don't manage their own */}
      {currentConfig.hideHeader && (
        <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}

      {/* Bottom Navigation */}
      {!currentConfig.hideBottomNav && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;

// Hook to access layout context
export const useAppLayout = () => {
  return {
    // Add any shared layout state/functions here
  };
};
