import { ChevronRight, LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

const QuickActionCard = ({ icon: Icon, title, subtitle, onClick }: QuickActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="card-elevated w-full flex items-center gap-4 active:scale-[0.98] transition-transform"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </button>
  );
};

export default QuickActionCard;
