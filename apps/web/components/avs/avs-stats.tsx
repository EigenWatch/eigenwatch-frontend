"use client";

import { Activity, DollarSign, Clock } from "lucide-react";

const stats = [
  {
    title: "Total AVSs",
    value: "8",
    subValue: "6 active",
    icon: Activity,
    subValueColor: "text-[#00C950]",
  },
  {
    title: "Total Allocated",
    value: "$6,350,000",
    subValue: "Across all AVSs",
    icon: DollarSign,
  },
  {
    title: "Avg Commission",
    value: "10.8%",
    subValue: "Mean rate",
    icon: "%", // Using text as icon for percentage
  },
  {
    title: "Longest Streak",
    value: "267",
    subValue: "Days registered",
    icon: Clock,
  },
];

export default function AVSStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 flex flex-col justify-between h-[120px]"
        >
          <div className="flex justify-between items-start">
            <span className="text-[#A1A1AA] text-sm">{stat.title}</span>
            {typeof stat.icon === "string" ? (
              <span className="text-[#71717A] text-lg font-medium">
                {stat.icon}
              </span>
            ) : (
              <stat.icon size={18} className="text-[#71717A]" />
            )}
          </div>
          <div>
            <div className="text-2xl font-semibold text-white mb-1">
              {stat.value}
            </div>
            <div
              className={`text-xs ${stat.subValueColor || "text-[#71717A]"}`}
            >
              {stat.subValue}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
