import { Activity, Users, TrendingUp, AlertCircle } from "lucide-react";

interface ActivityItemProps {
  type: string;
  description: string;
  time: string;
}

export const ActivityItem = ({ type, description, time }: ActivityItemProps) => {
  const icons = {
    registration: Activity,
    delegation: Users,
    allocation: Activity,
    commission: TrendingUp,
    metadata: AlertCircle,
    slashing: AlertCircle,
  };

  const colors = {
    registration: "bg-blue-500/10 text-blue-500",
    delegation: "bg-green-500/10 text-green-500",
    allocation: "bg-purple-500/10 text-purple-500",
    commission: "bg-yellow-500/10 text-yellow-500",
    metadata: "bg-gray-500/10 text-gray-500",
    slashing: "bg-red-500/10 text-red-500",
  };

  const Icon = icons[type as keyof typeof icons] || Activity;
  const colorClass =
    colors[type as keyof typeof colors] || "bg-gray-500/10 text-gray-500";

  return (
    <div className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
      <div
        className={`h-8 w-8 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
};
