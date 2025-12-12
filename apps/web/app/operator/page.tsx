"use client";

import OperatorsTable from "@/components/operators/operators-table";
import { Search } from "lucide-react";
import { useState } from "react";

export default function OperatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hideInactive, setHideInactive] = useState(false);

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#09090B]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-normal text-white mb-8">Operators</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search operators by name, ID, or address..."
              className="w-full bg-[#18181B80] border border-[#27272A] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#155DFC] transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={hideInactive}
                onChange={(e) => setHideInactive(e.target.checked)}
              />
              <div className="w-11 h-6 bg-[#27272A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#155DFC]"></div>
              <span className="ml-3 text-sm font-medium text-[#A1A1AA]">
                Hide inactive operators
              </span>
            </label>
          </div>
        </div>

        <div className="bg-[#18181B80] border border-[#27272A80] rounded-2xl overflow-hidden">
          <OperatorsTable query={searchQuery} hideInactive={hideInactive} />
        </div>
      </div>
    </main>
  );
}
