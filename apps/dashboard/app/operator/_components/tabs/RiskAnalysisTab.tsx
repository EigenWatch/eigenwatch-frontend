/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "lucide-react";
import { MetricProgress } from "@/components/shared/data/MetricProgress";
import { StatCard } from "@/components/shared/data/StatCard";

import { useRiskAssessment } from "@/hooks/crud/useOperatorRisk";

// components/operator/tabs/RiskAnalysisTab.tsx
interface RiskAnalysisTabProps {
  operatorId: string;
}

export const RiskAnalysisTab = ({ operatorId }: RiskAnalysisTabProps) => {
  const { data: risk, isLoading } = useRiskAssessment(operatorId);
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
            metric="Performance Score"
            value={Number(risk?.component_scores?.performance_score) || 0}
          />
          <MetricProgress
            metric="Economic Score"
            value={Number(risk?.component_scores?.economic_score) || 0}
          />
          <MetricProgress
            metric="Network Position"
            value={Number(risk?.component_scores?.network_position_score) || 0}
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
                {risk?.key_metrics?.delegation_hhi || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                TVS Volatility (30d)
              </span>
              <span className="font-medium">
                {risk?.key_metrics?.delegation_volatility_30d || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Slashing Count
              </span>
              <span className="font-medium">
                {risk?.key_metrics?.slashing_event_count || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Operational Days</span>
              <span className="font-medium">
                {risk?.key_metrics?.operational_days || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <StatCard
          title="Risk Assessment"
          value={risk?.risk_score || 0}
          subtitle={
            <div className="flex flex-col gap-1">
              <span>Overall Risk Score</span>
              <span className="text-xs text-muted-foreground">
                {risk?.assessment_date ? new Date(risk.assessment_date).toLocaleDateString() : "N/A"}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

