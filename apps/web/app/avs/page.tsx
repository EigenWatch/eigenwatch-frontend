"use client";

import AVSStats from "@/components/avs/avs-stats";
import AVSTable from "@/components/avs/avs-table";

export default function AVSPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AVS Relationships</h1>
          <p className="text-muted-foreground">
            Overview of all Actively Validated Services this operator is
            registered with
          </p>
        </div>

        <AVSStats />
        <AVSTable />
      </div>
    </div>
  );
}
