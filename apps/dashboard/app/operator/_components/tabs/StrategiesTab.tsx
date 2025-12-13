/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/operator/tabs/StrategiesTab.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Info, TrendingUp, PieChart } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { formatEther } from "@/lib/formatting";
import { StatCard } from "@/components/shared/data/StatCard";
import ReusableTable from "@/components/shared/table/ReuseableTable";

interface StrategiesTabProps {
  operatorId: string;
  strategies: any[];
  isLoading: boolean;
}

const StrategiesTab = ({
  operatorId,
  strategies = [],
  isLoading,
}: StrategiesTabProps) => {
  // Prepare data for pie chart
  const pieChartData = strategies.map((strategy, index) => ({
    name: strategy.name || strategy.symbol || "Unknown",
    value: parseFloat(strategy.tvs) / 1e18,
    color: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!strategies || strategies.length === 0) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Strategies Found</h3>
          <p className="text-sm text-muted-foreground">
            This operator doesn&apos;t have any strategies configured yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalTVS = strategies.reduce((sum, s) => sum + parseFloat(s.tvs), 0);
  const avgUtilization =
    strategies.reduce((sum, s) => sum + (s.utilizationRate || 0), 0) /
    strategies.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Strategies"
          value={strategies.length}
          subtitle="Unique asset strategies"
        />

        <StatCard
          title="Combined TVS"
          value={formatEther(totalTVS.toString())}
          subtitle="Total delegated value"
          tooltip="Total value across all strategies"
          icon={<Info className="h-4 w-4" />}
        />

        <StatCard
          title="Avg Utilization"
          value={`${avgUtilization.toFixed(1)}%`}
          subtitle={
            <Progress value={avgUtilization} className="h-1.5 w-full mt-1" />
          }
          tooltip="Average utilization across all strategies"
        />
      </div>

      {/* TVS Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>TVS Distribution by Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    `${entry.name}: ${entry.value.toFixed(2)} ETH`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: any) => `${value.toFixed(2)} ETH`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>

            <div className="flex flex-col justify-center space-y-3">
              <h4 className="font-semibold mb-2">Strategy Breakdown</h4>
              {pieChartData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {item.value.toFixed(2)} ETH
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategies Table */}
      <ReusableTable
        columns={[
          { key: "name", displayName: "Strategy" },
          { key: "tvs", displayName: "Total Value" },
          { key: "encumbered", displayName: "Allocated" },
          { key: "available", displayName: "Available" },
          { key: "utilizationRate", displayName: "Utilization" },
          { key: "delegatorCount", displayName: "Delegators" },
        ]}
        data={strategies.map((s) => {
          const tvs = parseFloat(s.tvs) / 1e18;
          const encumbered = parseFloat(s.encumbered || 0) / 1e18;
          const available = tvs - encumbered;
          return {
            ...s,
            tvs: (
              <div className="space-y-1">
                <p className="font-medium">{tvs.toFixed(4)} ETH</p>
                <p className="text-xs text-muted-foreground">
                  ≈ ${(tvs * 2400).toLocaleString()}
                </p>
              </div>
            ),
            encumbered: (
              <div className="space-y-1">
                <p className="font-medium">{encumbered.toFixed(4)} ETH</p>
                <p className="text-xs text-muted-foreground">
                  {((encumbered / tvs) * 100).toFixed(1)}% of total
                </p>
              </div>
            ),
            available: (
              <div className="space-y-1">
                <p className="font-medium">{available.toFixed(4)} ETH</p>
                <p className="text-xs text-muted-foreground">Unallocated</p>
              </div>
            ),
            utilizationRate: (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {(s.utilizationRate || 0).toFixed(1)}%
                  </span>
                  {(s.utilizationRate || 0) > 80 && (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  )}
                </div>
                <Progress value={s.utilizationRate || 0} className="h-1.5" />
              </div>
            ),
            delegatorCount: <Badge variant="secondary">{s.delegatorCount || 0}</Badge>,
            name: (
              <div className="space-y-1">
                <p className="font-medium">{s.name || "Unknown Strategy"}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {s.symbol || s.address?.slice(0, 10) + "..."}
                </p>
              </div>
            ),
          };
        })}
        tableFilters={{ title: "All Strategies" }}
      />
    </div>
  );
};

export default StrategiesTab;
