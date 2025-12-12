"use client";

import { useState } from "react";
import { ArrowUpDown, Users } from "lucide-react";
import Image from "next/image";

interface AVS {
  id: string;
  name: string;
  icon: string;
  category: string;
  status: "Registered" | "Unregistered";
  daysRegistered: number;
  streak: number;
  operatorSets: number;
  commission: string;
  totalAllocated: string;
  registrationHistory: ("active" | "inactive" | "pending")[];
}

const mockAVSs: AVS[] = [
  {
    id: "1",
    name: "AltLayer",
    icon: "/images/rocket.png",
    category: "Rollup Services",
    status: "Registered",
    daysRegistered: 312,
    streak: 134,
    operatorSets: 4,
    commission: "9%",
    totalAllocated: "$1,450,000",
    registrationHistory: ["active", "inactive", "active"],
  },
  {
    id: "2",
    name: "EigenDA",
    icon: "/images/rocket.png",
    category: "Data Availability",
    status: "Registered",
    daysRegistered: 245,
    streak: 245,
    operatorSets: 3,
    commission: "10%",
    totalAllocated: "$1,250,000",
    registrationHistory: ["active"],
  },
  {
    id: "3",
    name: "Hyperlane",
    icon: "/images/rocket.png",
    category: "Interoperability",
    status: "Registered",
    daysRegistered: 267,
    streak: 267,
    operatorSets: 3,
    commission: "7%",
    totalAllocated: "$1,100,000",
    registrationHistory: ["active"],
  },
  {
    id: "4",
    name: "Omni Network",
    icon: "/images/rocket.png",
    category: "Interoperability",
    status: "Registered",
    daysRegistered: 189,
    streak: 189,
    operatorSets: 2,
    commission: "8%",
    totalAllocated: "$950,000",
    registrationHistory: ["active"],
  },
  {
    id: "5",
    name: "Brevis",
    icon: "/images/rocket.png",
    category: "Computation",
    status: "Registered",
    daysRegistered: 201,
    streak: 201,
    operatorSets: 2,
    commission: "11%",
    totalAllocated: "$820,000",
    registrationHistory: ["active"],
  },
  {
    id: "6",
    name: "Witness Chain",
    icon: "/images/rocket.png",
    category: "Oracle",
    status: "Registered",
    daysRegistered: 156,
    streak: 156,
    operatorSets: 1,
    commission: "12%",
    totalAllocated: "$780,000",
    registrationHistory: ["active"],
  },
  {
    id: "7",
    name: "Lagrange Protocol",
    icon: "/images/rocket.png",
    category: "Computation",
    status: "Unregistered",
    daysRegistered: 98,
    streak: 0,
    operatorSets: 2,
    commission: "15%",
    totalAllocated: "—",
    registrationHistory: ["active", "inactive", "inactive"],
  },
  {
    id: "8",
    name: "Eoracle",
    icon: "/images/rocket.png",
    category: "Oracle",
    status: "Unregistered",
    daysRegistered: 67,
    streak: 0,
    operatorSets: 1,
    commission: "14%",
    totalAllocated: "—",
    registrationHistory: ["active", "inactive", "inactive"],
  },
];

export default function AVSTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AVS;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof AVS) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...mockAVSs].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    // Handle numeric values stored as strings (e.g., "$1,450,000", "9%")
    const parseValue = (val: any) => {
      if (typeof val === "string") {
        const num = parseFloat(val.replace(/[^0-9.-]+/g, ""));
        return isNaN(num) ? val : num;
      }
      return val;
    };

    const aValue = parseValue(a[key]);
    const bValue = parseValue(b[key]);

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ columnKey }: { columnKey: keyof AVS }) => {
    if (sortConfig?.key !== columnKey)
      return <ArrowUpDown size={14} className="opacity-50" />;
    return (
      <ArrowUpDown
        size={14}
        className={`transform transition-transform ${
          sortConfig.direction === "asc" ? "rotate-0" : "rotate-180"
        }`}
      />
    );
  };

  return (
    <div className="w-full overflow-x-auto bg-[#18181B80] border border-[#27272A80] rounded-xl">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[#71717A] border-b border-[#27272A80]">
            <th
              className="p-4 font-medium cursor-pointer hover:text-white transition-colors"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-2">
                AVS Name <SortIcon columnKey="name" />
              </div>
            </th>
            <th
              className="p-4 font-medium cursor-pointer hover:text-white transition-colors"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center gap-2">
                Status <SortIcon columnKey="status" />
              </div>
            </th>
            <th
              className="p-4 font-medium cursor-pointer hover:text-white transition-colors text-right"
              onClick={() => handleSort("daysRegistered")}
            >
              <div className="flex items-center justify-end gap-2">
                Days Registered <SortIcon columnKey="daysRegistered" />
              </div>
            </th>
            <th
              className="p-4 font-medium cursor-pointer hover:text-white transition-colors text-center"
              onClick={() => handleSort("operatorSets")}
            >
              <div className="flex items-center justify-center gap-2">
                Operator Sets <SortIcon columnKey="operatorSets" />
              </div>
            </th>
            <th
              className="p-4 font-medium cursor-pointer hover:text-white transition-colors text-right"
              onClick={() => handleSort("commission")}
            >
              <div className="flex items-center justify-end gap-2">
                Commission <SortIcon columnKey="commission" />
              </div>
            </th>
            <th
              className="p-4 font-medium cursor-pointer hover:text-white transition-colors text-right"
              onClick={() => handleSort("totalAllocated")}
            >
              <div className="flex items-center justify-end gap-2">
                Total Allocated <SortIcon columnKey="totalAllocated" />
              </div>
            </th>
            <th className="p-4 font-medium text-center">
              Registration History
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#27272A80]">
          {sortedData.map((avs) => (
            <tr
              key={avs.id}
              className="text-white hover:bg-[#27272A40] transition-colors"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#27272A] flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={avs.icon}
                      alt={avs.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{avs.name}</div>
                    <div className="text-xs text-[#71717A]">{avs.category}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    avs.status === "Registered"
                      ? "bg-[#032E15] text-[#00C950] border-[#0166304D]"
                      : "bg-[#27272A] text-[#A1A1AA] border-[#3F3F46]"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      avs.status === "Registered"
                        ? "bg-[#00C950]"
                        : "bg-[#A1A1AA]"
                    }`}
                  />
                  {avs.status}
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="font-medium">{avs.daysRegistered} days</div>
                <div className="text-xs text-[#71717A]">
                  Streak: {avs.streak} days
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-1.5">
                  <Users size={14} className="text-[#71717A]" />
                  <span>{avs.operatorSets}</span>
                </div>
              </td>
              <td className="p-4 text-right font-medium">{avs.commission}</td>
              <td className="p-4 text-right font-medium">
                {avs.totalAllocated}
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center">
                  {avs.registrationHistory.map((status, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`w-[13.24px] aspect-square rounded-full ${
                          status === "active"
                            ? "bg-[#00C950]"
                            : status === "inactive"
                            ? "bg-[#EF4444]"
                            : "bg-[#71717A]"
                        }`}
                      />
                      {i < avs.registrationHistory.length - 1 && (
                        <div className="w-6.5 h-[2.2px] bg-[#3F3F47]" />
                      )}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
