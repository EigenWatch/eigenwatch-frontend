"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Shield,
  Users,
  AlertTriangle,
  Activity,
  ChevronRight,
  Wallet,
  ArrowDownRight,
} from "lucide-react";
import {
  PortfolioDistributionChart,
  RiskDistributionChart,
} from "@/components/dashboard/charts";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    title: "Overall Risk Score",
    value: "32%",
    change: "2% this week",
    isPositive: true,
    icon: Activity,
    color: "text-[#00C950]",
    bg: "bg-[#032E15]",
  },
  {
    title: "Total Value Delegated",
    value: "101.7 ETH",
    subValue: "≈ $245,340 USD",
    icon: Wallet,
  },
  {
    title: "Active Operators",
    value: "4 Operators",
    subValue: "Across 7 services",
    icon: Users,
  },
  {
    title: "Pending Alerts",
    value: "2 Alerts",
    subValue: "Requires attention",
    icon: AlertTriangle,
    action: "Action Needed",
  },
];

const alerts = [
  {
    type: "risk",
    title: "Risk Score Increase Detected",
    description:
      "StakeWise operator risk score increased from 45% to 55% in the last 24 hours.",
    time: "2 hours ago",
    color: "text-[#FF3B30]",
    bg: "bg-[#460808]",
    border: "border-[#FF3B304D]",
  },
  {
    type: "info",
    title: "Diversification Opportunity",
    description:
      "Consider rebalancing: 45% of your portfolio is delegated to a single operator.",
    time: "5 hours ago",
    color: "text-[#155DFC]",
    bg: "bg-[#155DFC1A]",
    border: "border-[#155DFC4D]",
  },
  {
    type: "neutral",
    title: "New Operator Available",
    description:
      "A new highly-rated operator with 33% risk score is now accepting delegations.",
    time: "1 day ago",
    color: "text-[#A1A1AA]",
    bg: "bg-[#27272A40]",
    border: "border-[#27272A]",
  },
  {
    type: "warning",
    title: "Volatility Alert",
    description:
      "Rocket Pool showed increased (12% → 18%) delegation volatility.",
    time: "2 days ago",
    color: "text-[#FE9A00]",
    bg: "bg-[#461901]",
    border: "border-[#FE9A004D]",
  },
];

const delegatedOperators = [
  {
    name: "Eigen Yields",
    id: "937261",
    avs: "EigenDA",
    stake: "45.2 ETH",
    riskScore: "30%",
    riskLevel: "Low",
    icon: "/images/rocket.png",
  },
  {
    name: "StakeWise",
    id: "849215",
    avs: "EigenDA",
    stake: "36.2 ETH",
    riskScore: "55%",
    riskLevel: "Medium",
    icon: "/images/rocket.png",
  },
  {
    name: "Lido Finance",
    id: "182847",
    avs: "Multiple AVS",
    stake: "15.8 ETH",
    riskScore: "25%",
    riskLevel: "Low",
    icon: "/images/rocket.png",
  },
  {
    name: "Rocket Pool",
    id: "195934",
    avs: "EigenDA",
    stake: "10.2 ETH",
    riskScore: "38%",
    riskLevel: "Low",
    icon: "/images/rocket.png",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex Chen!</h1>
          <p className="text-muted-foreground">
            Here's your portfolio overview and latest updates
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-muted-foreground">
                  {stat.title}
                </span>
                <stat.icon size={16} className="text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              {stat.change && (
                <div
                  className={`text-xs px-2 py-1 rounded-full w-fit ${stat.bg} ${stat.color} flex items-center`}
                >
                  <span>Low Risk</span>
                  <span className="ml-1 flex items-center gap-1">
                    <ArrowDownRight size={14} /> {stat.change}
                  </span>
                </div>
              )}
              {stat.subValue && (
                <div className="text-sm text-muted-foreground">
                  {stat.subValue}
                </div>
              )}
              {stat.action && (
                <button className="mt-2 text-xs bg-[#155DFC] text-white px-3 py-1 rounded-full hover:bg-[#155DFC]/90 transition-colors">
                  {stat.action}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h3 className="text-lg font-semibold mb-6">
              Portfolio Distribution by Operator
            </h3>
            <PortfolioDistributionChart />
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h3 className="text-lg font-semibold mb-6">Risk Distribution</h3>
            <RiskDistributionChart />
          </motion.div>
        </div>

        {/* Bottom Section: Alerts & Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alerts */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              Alerts & Notifications
            </h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${alert.border} ${alert.bg} flex gap-4`}
                >
                  <AlertTriangle
                    size={20}
                    className={`shrink-0 mt-1 ${alert.color}`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-medium ${alert.color}`}>
                        {alert.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Simulator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl bg-card border border-border h-fit"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity size={20} className="text-[#155DFC]" />
              <h3 className="text-lg font-semibold">
                "What If" Scenario Simulator
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Select Next Operator
                </label>
                <select className="w-full bg-[#18181B] border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-[#155DFC]">
                  <option>Choose an operator...</option>
                  <option>Eigen Yields</option>
                  <option>StakeWise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Amount to Delegate (ETH)
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full bg-[#18181B] border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-[#155DFC]"
                />
              </div>

              <button className="w-full bg-[#155DFC] text-white font-medium py-3 rounded-lg hover:bg-[#155DFC]/90 transition-colors">
                Simulate Impact
              </button>
            </div>
          </motion.div>
        </div>

        {/* Delegated Operators List */}
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Delegated Operators</h3>
            <Link
              href="/operator"
              className="text-sm text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {delegatedOperators.map((op, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={op.icon}
                      alt={op.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{op.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          op.riskLevel === "Low"
                            ? "bg-[#032E15] text-[#00C950]"
                            : "bg-[#461901] text-[#FE9A00]"
                        }`}
                      >
                        {op.riskLevel}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ID: {op.id} • {op.avs}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">{op.stake}</div>
                  <div className="text-xs text-muted-foreground">
                    Risk Score:{" "}
                    <span
                      className={
                        Number(op.riskScore.replace("%", "")) < 50
                          ? "text-[#00C950]"
                          : "text-[#FE9A00]"
                      }
                    >
                      {op.riskScore}
                    </span>
                  </div>
                </div>

                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
