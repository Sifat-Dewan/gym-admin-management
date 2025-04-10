import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { columns } from "./_components/table/columns";
import { ParamsType } from "@/types";

export const generateMetadata = (): Metadata => {
  return {
    title: "Membership Plans",
  };
};

const MembershipPlansPage = async ({
  searchParams,
}: {
  searchParams: ParamsType;
}) => {
  const { q } = await searchParams;
  const memebershipPlans = await db.membershipPlan.findMany({
    where: {
      ...(q
        ? {
            name: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: {
      _count: {
        select: {
          members: true,
        }
      }
    },
    orderBy: {
      price: "asc",
    },
  });

  return (
    <div className="space-y-4">
      <PageHeader label="Membership Plans" actionUrl="/membership-plans/new" />
      <DataTable
        columns={columns}
        data={memebershipPlans}
        searchInputPlaceholder="Search Membership plans..."
        showSearchInput
      />
    </div>
  );
};

export default MembershipPlansPage;
