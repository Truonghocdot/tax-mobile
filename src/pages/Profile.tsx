import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  User,
  Bell,
  Shield,
  Key,
  Fingerprint,
  HelpCircle,
  FileText,
  LogOut,
} from "lucide-react";
import taxEmblem from "@/assets/tax-emblem.png";

interface SettingItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  danger?: boolean;
}

const Profile = () => {
  const navigate = useNavigate();

  const settingsGroups: { title: string; items: SettingItem[] }[] = [
    {
      title: "Tài khoản",
      items: [
        {
          icon: <User className="w-5 h-5" />,
          label: "Thông tin cá nhân",
          path: "/profile/info",
        },
        {
          icon: <Bell className="w-5 h-5" />,
          label: "Cài đặt thông báo",
          path: "/profile/notifications",
        },
        {
          icon: <Shield className="w-5 h-5" />,
          label: "Bảo mật",
          path: "/profile/security",
        },
      ],
    },
    {
      title: "Đăng nhập",
      items: [
        {
          icon: <Key className="w-5 h-5" />,
          label: "Đổi mật khẩu",
          path: "/change-password",
        },
        {
          icon: <Fingerprint className="w-5 h-5" />,
          label: "Đăng nhập sinh trắc học",
          path: "/biometric",
        },
      ],
    },
    {
      title: "Hỗ trợ",
      items: [
        {
          icon: <HelpCircle className="w-5 h-5" />,
          label: "Trung tâm hỗ trợ",
          path: "/support",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          label: "Điều khoản sử dụng",
          path: "/terms",
        },
      ],
    },
  ];

  return (
    <>
      {/* Profile card */}
      <div className="px-4 py-4 animate-fade-in">
        <div className="card-elevated flex items-center gap-4">
          <img
            src={taxEmblem}
            alt="Avatar"
            className="w-16 h-16 rounded-full bg-primary/10 p-1"
          />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">MST: 0100231226-999</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Settings groups */}
      <div className="px-4 space-y-6 animate-slide-up">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              {group.title}
            </h3>
            <div className="card-elevated divide-y divide-border">
              {group.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => item.path && navigate(item.path)}
                  className="w-full flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        item.danger ? "text-destructive" : "text-primary"
                      }
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`font-medium ${item.danger ? "text-destructive" : "text-foreground"}`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full card-elevated flex items-center justify-center gap-2 py-3 text-destructive font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </>
  );
};

export default Profile;
