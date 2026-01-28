import { Bell, Check, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Nộp thuế thành công',
      message: 'Bạn đã nộp thuế TNCN thành công với số tiền 1,500,000 VND',
      time: '2 giờ trước',
      read: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Sắp đến hạn nộp thuế',
      message: 'Còn 5 ngày để nộp thuế GTGT quý 4/2024',
      time: '1 ngày trước',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Cập nhật thông tin',
      message: 'Hệ thống đã cập nhật thông tin thuế của bạn',
      time: '3 ngày trước',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <>
      {/* Notifications list */}
      <div className="px-4 py-4 space-y-3 animate-slide-up">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`card-elevated flex gap-4 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-foreground">{notification.title}</h4>
                {!notification.read && (
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {notification.message}
              </p>
              <span className="text-xs text-muted-foreground mt-2 block">
                {notification.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
