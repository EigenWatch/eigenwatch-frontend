import { Shield, AlertTriangle, ShieldAlert, Info } from 'lucide-react';

export const StatusIndicator = ({ 
  status, 
  label 
}: { 
  status: 'success' | 'warning' | 'danger' | 'info';
  label: string;
}) => {
  const config = {
    success: {
      bg: 'bg-green-500/10',
      text: 'text-green-600',
      border: 'border-green-500/20',
      icon: Shield,
    },
    warning: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-600',
      border: 'border-yellow-500/20',
      icon: AlertTriangle,
    },
    danger: {
      bg: 'bg-red-500/10',
      text: 'text-red-600',
      border: 'border-red-500/20',
      icon: ShieldAlert,
    },
    info: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-600',
      border: 'border-blue-500/20',
      icon: Info,
    },
  };

  const { bg, text, border, icon: Icon } = config[status];

  return (
    <div className={`flex items-center px-2 gap-1 rounded-sm ${bg} ${border} border`}>
      <Icon className={`h-3 w-3 ${text}`} />
      <span className={`text-sm font-medium ${text}`}>{label}</span>
    </div>
  );
};
