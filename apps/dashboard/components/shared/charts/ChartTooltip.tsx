"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (value: number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter = (value: number) => `${value}`,
}: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <Card className="border-border/50 bg-background/95 backdrop-blur-sm shadow-xl">
        <CardHeader className="p-2 border-b border-border/50">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 min-w-[150px] space-y-1">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-foreground">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {valueFormatter(item.value)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
}
