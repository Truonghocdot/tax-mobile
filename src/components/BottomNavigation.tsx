import { Home, FileText, Bell, User, MoreHorizontal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { icon: <Home className="w-5 h-5" />, label: 'Trang chủ', path: '/' },
    { icon: <FileText className="w-5 h-5" />, label: 'Nộp thuế', path: '/tax-payment' },
    { icon: <Bell className="w-5 h-5" />, label: 'Thông báo', path: '/notifications' },
    { icon: <User className="w-5 h-5" />, label: 'Cá nhân', path: '/profile' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
