import { useMemo } from "react";
import { ReusableTableProps } from "../ReuseableTable";

type UseTableTabsProps = {
  userColumns: ReusableTableProps["columns"];
  data: ReusableTableProps["data"];
  idKey: string;
  tableKey: string;
  paginationProps: ReusableTableProps["paginationProps"];
  tableFilters: ReusableTableProps["tableFilters"];
  enableMultiSelect: ReusableTableProps["enableMultiSelect"];
  onRowClick: ReusableTableProps["onRowClick"];
  rawData: ReusableTableProps["rawData"];
  altTabs: ReusableTableProps["altTabs"];
  activeTab: number;
};

export type CurrentTab = Omit<ReusableTableProps, "altTabs"> &
  Required<Pick<ReusableTableProps, "idKey" | "tableKey">>;

export const useTableTabs = ({
  userColumns,
  data,
  idKey,
  tableKey,
  paginationProps,
  tableFilters,
  enableMultiSelect,
  onRowClick,
  rawData,
  altTabs = [],
  activeTab,
}: UseTableTabsProps) => {
  const allTabs = useMemo(
    () => [
      {
        columns: userColumns,
        data,
        idKey,
        tableKey,
        paginationProps,
        tableFilters,
        enableMultiSelect,
        onRowClick,
        rawData,
      },
      ...altTabs,
    ],
    [
      userColumns,
      data,
      idKey,
      tableKey,
      paginationProps,
      tableFilters,
      enableMultiSelect,
      onRowClick,
      rawData,
      altTabs,
    ]
  );

  const currentTab: CurrentTab = useMemo(() => {
    const tab = allTabs[activeTab] || allTabs[0];
    return {
      ...tab,
      data: tab?.data || [],
      columns: tab?.columns || [],
      idKey: tab?.idKey || "id",
      tableKey: tab?.tableKey || `default-table_${activeTab}`,
      tableFilters: tab?.tableFilters || tableFilters,
    };
  }, [allTabs, activeTab, tableFilters]);

  return { currentTab, allTabs };
};
