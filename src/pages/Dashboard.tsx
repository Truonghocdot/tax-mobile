import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  FileEdit,
  Search,
  Link as LinkIcon,
  FileText,
  Building2,
  Bell,
  Layers,
  Fingerprint,
  Settings,
  Lock,
  Smartphone,
  Compass,
  IdCard,
  FolderOpen,
  ClipboardList,
  ShieldCheck,
  User2,
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import MenuSidebar from "@/components/MenuSidebar";
import taxEmblem from "@/assets/thuedinetu.png";
import trongDong from "@/assets/trongdong.png";
import trongDongImage from "@/assets/trong.png";
import { cn } from "@/lib/utils";

interface ServiceItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  color?: string;
}

const quickActions: ServiceItem[] = [
  {
    icon: FileEdit,
    label: "Cập nhật hồ sơ",
    path: "/profile/update",
    color: "text-primary",
  },
  {
    icon: Search,
    label: "Tra cứu thông tin",
    path: "/tax-lookup",
    color: "text-primary",
  },
  {
    icon: Fingerprint,
    label: "Mã định danh",
    path: "/identification",
    color: "text-primary",
  },
  {
    icon: LinkIcon,
    label: "Liên kết tài khoản",
    path: "/link-account",
    color: "text-primary",
  },
];

const serviceGroups: ServiceItem[] = [
  { icon: FileText, label: "Đăng ký thuế", path: "/tax-registration" },
  {
    icon: Building2,
    label: "Hỗ trợ quyết toán thuế TNCN",
    path: "/tax-settlement",
  },
  { icon: Search, label: "Tra cứu hồ sơ khai thuế", path: "/tax-lookup" },
  { icon: Layers, label: "Nhóm chức năng nộp thuế", path: "/tax-payment" },
  {
    icon: IdCard,
    label: "Đăng ký tài khoản doanh nghiệp trực tuyến",
    path: "/business-registration",
  },
  { icon: Bell, label: "Tra cứu thông báo", path: "/notifications" },
  { icon: Compass, label: "Tiện ích", path: "/utilities" },
  { icon: Settings, label: "Hỗ trợ", path: "/support" },
  { icon: User, label: "Thiết lập cá nhân", path: "/profile" },
  { icon: Lock, label: "Đổi mật khẩu", path: "/change-password" },
  { icon: Smartphone, label: "Đăng nhập bằng vân tay", path: "/biometric" },
  { icon: Compass, label: "Khám phá", path: "/explore" },
  { icon: Fingerprint, label: "Định danh", path: "/identification" },
  { icon: FolderOpen, label: "Giấy tờ", path: "/documents" },
  { icon: ClipboardList, label: "Tích hợp thông tin", path: "/integration" },
  { icon: User, label: "Người phụ thuộc", path: "/dependents" },
  { icon: User, label: "Cá nhân", path: "/profile" },
  { icon: ShieldCheck, label: "Bảo hiểm xã hội", path: "/insurance" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <MobileHeader showMenu onMenu={() => setMenuOpen(true)} onBell={() => navigate("/notifications")} />

      {/* Decorative background */}
      <div className="relative">
        {/* User Info Card */}
        <div className="relative z-10 mx-4 mt-4">
          <div
            className="bg-card rounded-2xl p-4 shadow-lg flex items-center gap-4"
            style={{
              backgroundImage: `url(${trongDong})`,
              opacity: 2,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-14 h-14 rounded-full bg-transparent flex items-center justify-center border-2 border-red-800">
              <User size={38} className="text-black" />
            </div>

            <div className="flex-1">
              <p className="text-md text-muted-foreground text-black font-semibold">
                Mã Số Thuế: <span className="font-semibold text-foreground">Chưa có MST</span>
              </p>
              <p className="text-md text-muted-foreground text-black font-semibold">
                Doanh Nghiệp: <span className="font-semibold text-foreground">Chưa cập nhật thông tin</span>
              </p>
              <p className="text-primary font-semibold">0909234023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6 relative">
        <div
          className="bg-card rounded-2xl p-4 shadow-lg flex-col items-center gap-4"
          style={{
            backgroundImage: `url(${trongDongImage})`,
            opacity: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">Chức năng hay dùng</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => item.path && navigate(item.path)}
                  className="service-card bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <Icon size={20} className={item.color || "text-primary"} />
                  </div>
                  <span className="text-xs text-center text-foreground font-medium leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Groups */}
      <div className="px-4 mt-5">
        {/* Decorative background with emblem */}
        <div
          className="relative bg-card rounded-2xl p-4 border border-border overflow-hidden"
          style={{
            backgroundImage: `url(${trongDongImage})`,
            opacity: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">Danh sách nhóm dịch vụ</h2>
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="w-48 h-48 rounded-full border-8 border-current">
              <img src={taxEmblem} alt="" className="w-full h-full" />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 ">
            {serviceGroups.slice(0, 18).map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => item.path && navigate(item.path)}
                  className="flex flex-col items-center gap-2 p-2 bg-card rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-xs text-center text-foreground font-medium leading-tight line-clamp-2">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Sidebar */}
      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default Dashboard;
