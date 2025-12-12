"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const portfolioData = [
  { name: "Eigen Yields", value: 45.2, color: "#3B82F6" },
  { name: "StakeWise", value: 35.6, color: "#60A5FA" },
  { name: "Lido Finance", value: 10.5, color: "#93C5FD" },
  { name: "Rocket Pool", value: 8.7, color: "#BFDBFE" },
];

const riskData = [
  { name: "Low", value: 50, color: "#22C55E" },
  { name: "Medium", value: 35, color: "#EAB308" },
  { name: "High", value: 15, color: "#EF4444" },
];

export function PortfolioDistributionChart() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181B",
                borderColor: "#27272A",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-3">
        {portfolioData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskDistributionChart() {
  return (
    <div className="flex flex-col h-full max-h-[380px]">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={riskData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="#71717A"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#71717A"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "#27272A", opacity: 0.4 }}
              contentStyle={{
                backgroundColor: "#18181B",
                borderColor: "#27272A",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-20 md:mt-auto pt-4">
        <div className="p-3 rounded-lg bg-[#032E15] border border-[#0166304D] text-[#00C950] text-sm font-medium flex items-center justify-center text-center">
          ✓ 85% of your portfolio is in low risk operators - well diversified!
        </div>
      </div>
    </div>
  );
}
