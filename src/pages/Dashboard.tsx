import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  FileText,
  CreditCard,
  Link2,
  ClipboardList,
  FileCheck,
  Users,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import taxEmblem from "@/assets/tax-emblem.png";
import MobileHeader from "@/components/MobileHeader";
import ServiceCard from "@/components/ServiceCard";
import { useOutletContext } from "react-router-dom";

interface DashboardContext {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { setMenuOpen } = useOutletContext<DashboardContext>();

  const quickActions = [
    {
      icon: Users,
      label: "Tra cứu thông tin người phụ thuộc",
      path: "/dependent-info",
    },
    {
      icon: Search,
      label: "Tra cứu thông tin quyết toán",
      path: "/settlement-info",
    },
    { icon: CreditCard, label: "Nộp thuế", path: "/tax-payment" },
    { icon: Link2, label: "Liên kết hủy/kết khóa", path: "/link-management" },
  ];

  const services = [
    { icon: ClipboardList, label: "Đăng ký thuế", path: "/tax-registration" },
    {
      icon: FileCheck,
      label: "Hỗ trợ quyết toán thuế TNCN",
      path: "/tax-settlement",
    },
    { icon: FileText, label: "Tra cứu hồ sơ khai thuế", path: "/tax-lookup" },
    {
      icon: CreditCard,
      label: "Nhóm chức năng nộp thuế",
      path: "/tax-payment",
    },
    { icon: Search, label: "Tra cứu nghĩa vụ thuế", path: "/tax-obligations" },
    { icon: Bell, label: "Tra cứu thông báo", path: "/notifications" },
    { icon: Settings, label: "Tiện ích", path: "/utilities" },
    { icon: HelpCircle, label: "Hỗ trợ", path: "/support" },
    { icon: Settings, label: "Thiết lập cá nhân", path: "/settings" },
  ];

  return (
    <>
      {/* Header with gradient background */}
      <div className="bg-gradient-primary text-primary-foreground">
        <MobileHeader title="Thuế Điện Tử" showMenu onMenu={() => setMenuOpen(true)} variant="transparent" />

        {/* User info card */}
        <div className="px-4 pb-6">
          <div className="card-elevated flex items-center gap-4 animate-slide-up">
            <img
              src={taxEmblem}
              alt="Logo"
              className="w-14 h-14 rounded-full bg-primary/10 p-1"
            />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                MST: 0100231226-999
              </p>
              <h2 className="font-bold text-lg text-foreground">
                Tổng cục thuế
              </h2>
            </div>
            <Link to="/profile">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mt-2 relative z-10">
        <div
          className="card-elevated animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="font-semibold mb-4 text-foreground">
            Chức năng hay dùng
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <ServiceCard key={index} icon={action.icon} label={action.label} onClick={() => navigate(action.path)} />
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="px-4 mt-4">
        <div
          className="card-elevated animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              Danh sách nhóm dịch vụ
            </h3>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                label={service.label}
                onClick={() => navigate(service.path)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
