import { Progress } from '@/components/ui/progress';

export const ConcentrationBar = ({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{(value * 100).toFixed(1)}%</span>
      </div>
      <Progress value={value * 100} className="h-2" indicatorClassName={color} />
    </div>
  );
};
