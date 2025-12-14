/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SectionContainer } from "@/components/shared/data/SectionContainer";
import { StatCard } from "@/components/shared/data/StatCard";
import ReusableTable from "@/components/shared/table/ReuseableTable";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOperatorDelegators } from "@/hooks/crud/useDelegators";

// components/operator/tabs/DelegatorsTab.tsx
interface DelegatorsTabProps {
  operatorId: string;
}

export const DelegatorsTab = ({ operatorId }: DelegatorsTabProps) => {
  const { data: delegators, isLoading } = useOperatorDelegators(operatorId, {
    limit: 20,
  });
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  console.log({ delegators });

  const delegatorsList = delegators || [];
  const total = delegatorsList.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title={"Total Delegators"} value={total} />
        <StatCard
          title={"Active Delegators"}
          value={
            delegatorsList.filter((d: any) => d.status === "active").length
          }
        />
        {/* TODO: Find this metric and add */}
        <StatCard
          title={"Delegation HHI"}
          value={0.12}
          subtitle={"Low concentration"}
        />
      </div>

      <SectionContainer heading="Delegator List">
        <ReusableTable
          columns={[
            { key: "avs_name", displayName: "Staker Address" },
            { key: "status", displayName: "Shares" },
            { key: "days_registered", displayName: "% of Total" },
            { key: "operator_sets", displayName: "Status" },
            { key: "commissions", displayName: "Delegation Date" },
          ]}
          data={delegatorsList}
          tableFilters={{ title: "Delegator List" }}
        />
      </SectionContainer>
    </div>
  );
};
