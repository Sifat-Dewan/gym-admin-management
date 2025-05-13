export const dynamic = "force-dynamic";

import { MemberForm } from "@/app/(main)/members/_components/member-form";
import Await from "@/components/await";
import { PageLoader } from "@/components/loaders/page-loader";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import React, { Suspense } from "react";

const NewMemberPage = async () => {
  const promise = Promise.all([
    db.membershipPlan.findMany(),
    db.default.findFirst(),
  ]);
  return (
    <div className="space-y-6">
      <PageHeader label="New Member" backButtonUrl="/members" />
      <Suspense fallback={<PageLoader />}>
        <Await promise={promise}>
          {([membershipPlans, defaultValues]) => (
            <MemberForm
              membershipPlans={membershipPlans}
              admissionFee={defaultValues?.admissionFee}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default NewMemberPage;
