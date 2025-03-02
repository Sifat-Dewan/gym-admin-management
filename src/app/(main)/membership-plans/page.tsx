import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { columns } from "./_components/table/columns";

export const generateMetadata = (): Metadata => {
  return {
    title: "Membership Plans",
  };
};

const MembershipPlansPage = async () => {
  const memebershipPlans = await db.membershipPlan.findMany();
  return (
    <div className="space-y-4">
      <PageHeader label="Membership Plans" actionUrl="/membership-plans/new" />
      <DataTable columns={columns} data={memebershipPlans} />
    </div>
  );
};

export default MembershipPlansPage;
