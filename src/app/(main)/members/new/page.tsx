import { MemberForm } from "@/app/(main)/members/_components/member-form";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import React from "react";

const NewMemberPage = async () => {
  const [membershipPlans, defaultValues] = await Promise.all([
    db.membershipPlan.findMany(),
    db.default.findFirst(),
  ]);
  return (
    <div className="space-y-6">
      <PageHeader label="New Member" backButtonUrl="/members" />
      <MemberForm
        admissionFee={defaultValues?.admissionFee}
        membershipPlans={membershipPlans}
      />
    </div>
  );
};

export default NewMemberPage;
