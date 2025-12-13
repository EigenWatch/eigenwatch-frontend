/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "lucide-react";
import { MetricProgress } from "@/components/shared/data/MetricProgress";
import { StatCard } from "@/components/shared/data/StatCard";

// components/operator/tabs/RiskAnalysisTab.tsx
interface RiskAnalysisTabProps {
  operatorId: string;
  risk: any;
  isLoading: boolean;
}

export const RiskAnalysisTab = ({
  operatorId,
  risk,
  isLoading,
}: RiskAnalysisTabProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  console.log({ risk });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Risk Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MetricProgress
            metric="Concentration Risk"
            value={risk?.components?.concentrationRisk || 0}
          />
          <MetricProgress
            metric="Volatility Risk"
            value={risk?.components?.volatilityRisk || 0}
          />
          <MetricProgress
            metric="Slashing History"
            value={risk?.components?.slashingHistory || 0}
          />
          <MetricProgress
            metric="Operational Stability"
            value={risk?.components?.operationalStability || 0}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Delegation HHI
              </span>
              <span className="font-medium">
                {risk?.metrics?.delegationHHI || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                TVS Volatility (30d)
              </span>
              <span className="font-medium">
                {risk?.metrics?.tvsVolatility30d || 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Slashing Count
              </span>
              <span className="font-medium">
                {risk?.metrics?.slashingCount || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="font-medium">
                {risk?.metrics?.uptimePercentage || 0}%
              </span>
            </div>
          </CardContent>
        </Card>

        <StatCard
          title="Risk Assessment"
          value={risk?.overallScore || 0}
          subtitle={
            <div className="flex flex-col gap-1">
              <span>Overall Risk Score</span>
              <span className="text-xs text-muted-foreground">
                {new Date(risk?.assessmentDate).toLocaleDateString()}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

