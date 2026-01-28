import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  iconColor?: string;
}

const ServiceCard = ({ icon: Icon, label, onClick, iconColor }: ServiceCardProps) => {
  return (
    <button onClick={onClick} className="service-card group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 bg-primary/10 text-primary
                   group-active:bg-primary group-active:text-primary-foreground transition-colors"
        style={iconColor ? { color: iconColor } : undefined}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-medium text-center text-foreground leading-tight line-clamp-2">
        {label}
      </span>
    </button>
  );
};

export default ServiceCard;
