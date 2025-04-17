"use client";

import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from "lucide-react";
import { DropDownMenu } from "./dropdown-menu";
import { buttonVariants } from "./ui/button";
import { DropdownMenuItemType } from "@/types";
import { useQueryParams } from "@/hooks/use-query-params";

export const DataTableSortbyFilter = () => {
  const { setQueryParams } = useQueryParams();
  const items: DropdownMenuItemType[] = [
    {
      label: "Asc",
      icon: ArrowUpWideNarrow,
      onClick: () => setQueryParams({ query: { orderby: "asc" } }),
    },
    {
      label: "Desc",
      icon: ArrowDownWideNarrow,
      onClick: () => setQueryParams({ query: { orderby: "desc" } }),
    },
  ];

  return (
    <DropDownMenu
      items={items}
      triggerClassName={buttonVariants({
        variant: "outline",
        size: "icon",
        className: "min-w-9 rounded-md",
      })}
    >
      <ArrowUpDown className="size-4" />
    </DropDownMenu>
  );
};
