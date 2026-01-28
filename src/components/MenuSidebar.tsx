import {
  X,
  FileText,
  Search,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  Key,
  Fingerprint,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import taxEmblem from "@/assets/tax-emblem.png";

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  action?: () => void;
}

const MenuSidebar = ({ isOpen, onClose }: MenuSidebarProps) => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Hỗ trợ quyết toán thuế TNCN",
      path: "/tax-settlement",
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Tra cứu hồ sơ khai thuế",
      path: "/tax-lookup",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Nhóm chức năng nộp thuế",
      path: "/tax-payment",
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Tra cứu nghĩa vụ thuế",
      path: "/tax-obligations",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Tra cứu thông báo",
      path: "/notifications",
    },
  ];

  const utilityItems: MenuItem[] = [
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Tiện ích",
      path: "/utilities",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: "Hỗ trợ",
      path: "/support",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Thiết lập cá nhân",
      path: "/settings",
    },
    {
      icon: <Key className="w-5 h-5" />,
      label: "Đổi mật khẩu đăng nhập",
      path: "/change-password",
    },
    {
      icon: <Fingerprint className="w-5 h-5" />,
      label: "Đăng nhập bằng vân tay/FaceID",
      path: "/biometric",
    },
  ];

  const handleNavigate = (path?: string) => {
    if (path) {
      navigate(path);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-card z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-primary text-primary-foreground p-6 safe-top">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-80">Xin chào</span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full active:bg-white/10"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={taxEmblem}
              alt="Tax Emblem"
              className="w-14 h-14 rounded-full bg-white/10 p-1"
            />
            <div>
              <p className="text-sm opacity-80">MST: 0100231226-999</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="menu-item w-full text-left"
              >
                <span className="text-primary">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="my-4 border-t border-border" />

          <div className="space-y-1">
            {utilityItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="menu-item w-full text-left"
              >
                <span className="text-muted-foreground">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 safe-bottom">
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MenuSidebar;
