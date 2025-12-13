
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useDailySnapshots } from "@/hooks/crud/useOperator";
import { OperatorDetail } from "@/types/operator.types";
import { RiskAssessment } from "@/types/risk.types";
import { SectionContainer } from "@/components/shared/data/SectionContainer";
import { MetricProgress } from "@/components/shared/data/MetricProgress";
import { ActivityItem } from "@/components/shared/data/ActivityItem";

interface OverviewTabProps {
  operator: OperatorDetail;
  riskData?: RiskAssessment;
  activity: any;
  isLoading: boolean;
}

const OverviewTab = ({
  operator,
  riskData,
  activity,
  isLoading,
}: OverviewTabProps) => {
  // Get last 30 days of snapshots
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const { data: snapshotsData, isLoading: loadingSnapshots } =
    useDailySnapshots(operator?.operator_id, {
      date_from: startDate.toISOString().split("T")[0] || "",
      date_to: endDate.toISOString().split("T")[0] || "",
      metrics: ["tvs", "delegatorCount", "avsCount"],
    });

  const snapshots = snapshotsData || [];

  // Transform data for charts
  const chartData = snapshots?.map((snapshot: any) => ({
    date: new Date(snapshot.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    tvs: parseFloat(snapshot.tvs) / 1e18,
    delegators: snapshot.delegatorCount,
    avs: snapshot.avsCount,
  }));

  return (
    <div className="space-y-4">
      {/* Performance Overview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance Scores */}
        <SectionContainer heading="Performance Overview">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 text-sm ">
              {/* Risk Score */}
              <MetricProgress
                metric="Risk Score"
                value={Number(riskData?.risk_score) || 0}
              />

              {/* Mock Additional Scores - Replace with real data when available */}
              <div className="pt-3 space-y-3 border-t border-white/10">
                <MetricProgress
                  metric="Performance Score"
                  value={
                    Number(riskData?.component_scores.performance_score) || 0
                  }
                />
                <MetricProgress
                  metric="Economic Score"
                  value={Number(riskData?.component_scores.economic_score) || 0}
                />
                <MetricProgress
                  metric="Network Position"
                  value={
                    Number(riskData?.component_scores.network_position_score) ||
                    0
                  }
                />
              </div>

              {/* Key Stats */}
              <div className="pt-3 space-y-3 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9F9FA9]">Confidence Score</span>
                  <Badge className="bg-transparent text-[#9F9FA9]">
                    {riskData?.confidence_score}%
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9F9FA9]">Delegation Volatility</span>
                  <Badge className="text-green-500 bg-transparent">
                    Stable
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </SectionContainer>

        {/* Recent Activity */}
        <SectionContainer heading="Recent Activity">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity && activity.length > 0 ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {activity.map((item: any, index: number) => (
                <ActivityItem
                  key={index}
                  type={item.type}
                  description={item.description}
                  time={item.timestamp}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-[#9F9FA9] my-auto">
              <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </SectionContainer>
      </div>

      {/* TVS Trend Chart */}
      <SectionContainer heading="Total Value Secured - Last 30 Days">
        {loadingSnapshots ? (
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTvs" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "ETH", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={(value: any) => [`${value.toFixed(2)} ETH`, "TVS"]}
              />
              <Area
                type="monotone"
                dataKey="tvs"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTvs)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-[#9F9FA9] my-auto">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                No data available for the selected period
              </p>
            </div>
          </div>
        )}
      </SectionContainer>

      {/* Delegator & AVS Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delegators Trend */}
        <SectionContainer heading="Delegators Growth">
          {loadingSnapshots ? (
            <Skeleton className="h-48 w-full" />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="delegators"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-[#9F9FA9] my-auto text-sm">
              No data available
            </div>
          )}
        </SectionContainer>

        {/* AVS Count Trend */}
        <SectionContainer heading="AVS Registrations">
          {loadingSnapshots ? (
            <Skeleton className="h-48 w-full" />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avs"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-[#9F9FA9] my-auto text-sm">
              No data available
            </div>
          )}
        </SectionContainer>
      </div>
    </div>
  );
};

export default OverviewTab;
