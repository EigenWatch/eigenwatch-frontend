import { Progress } from "@/components/ui/progress";

export function MetricProgress({
  metric,
  value,
}: {
  metric: string;
  value: number;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{metric}</span>
      <div className="flex items-center gap-2">
        <Progress value={value} className="h-1.5 w-20 bg-muted" />
        <span className="font-medium w-12 text-right text-muted-foreground">
          {value}%
        </span>
      </div>
    </div>
  );
}
