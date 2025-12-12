"use client";

interface StatItemProps {
  label: string;
  value: string | number;
  rating?: "Low" | "Medium" | "High";
}

const StatItem = ({ label, value, rating }: StatItemProps) => (
  <div className="flex items-center justify-between py-4 border-b border-[#27272A80] last:border-0">
    <span className="text-[#A1A1AA] text-sm">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-white font-medium">{value}</span>
      {rating && (
        <span
          className={`px-2 py-0.5 rounded text-[10px] uppercase font-medium
            ${
              rating === "Low"
                ? "bg-[#032E15] text-[#00C950]"
                : rating === "Medium"
                  ? "bg-[#461901] text-[#FE9A00]"
                  : "bg-[#460808] text-[#FF3B30]"
            }`}
        >
          {rating}
        </span>
      )}
    </div>
  </div>
);

export default function OperatorStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="bg-[#18181B80] border border-[#27272A80] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6 text-sm text-[#71717A] font-medium uppercase">
          <span>Field</span>
          <span>Rating</span>
        </div>
        <StatItem label="Risk Level" value="Low" rating="Low" />
        <StatItem label="Risk Score" value="30%" />
        <StatItem label="Total Stake" value="78 ETH" />
        <StatItem label="Performance Score" value="76%" />
        <StatItem label="Confidence Score" value="80%" />
        <StatItem label="Economic Score" value="75%" />
        <StatItem label="Network Position Score" value="80/100" />
        <StatItem label="Delegator Count" value="58 People" />
        <StatItem label="AVS Count" value="60" />
      </div>

      {/* Right Column */}
      <div className="bg-[#18181B80] border border-[#27272A80] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6 text-sm text-[#71717A] font-medium uppercase">
          <span>Field</span>
          <span>Rating</span>
        </div>
        <StatItem label="Slashing Events" value="0" rating="Low" />
        <StatItem label="Operational Days" value="365+" rating="Low" />
        <StatItem label="Delegation Volatility" value="Stable" rating="Low" />
        <StatItem label="Volatility_7d" value="2.3%" rating="Low" />
        <StatItem label="Volatility_30d" value="4.1%" rating="Low" />
        <StatItem label="Volatility_90d" value="5.8%" rating="Low" />
        <StatItem label="Coefficient of Variation" value="0.12" rating="Low" />
        <StatItem label="Total Entities" value="45" rating="Low" />
        <StatItem label="Effective Entities" value="42" rating="Low" />
      </div>
    </div>
  );
}
