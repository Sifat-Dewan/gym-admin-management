"use server";

import { db } from "@/lib/db";
import { startOfToday, endOfToday } from "date-fns";

export const getMembershipStatusCounts = async () => {
  const [activeCount, pendingCount, expiredCount] = await Promise.all([
    db.member.count({
      where: {
        startDate: {
          lte: endOfToday(),
        },
        endDate: {
          gte: startOfToday(),
        },
      },
    }),

    db.member.count({
      where: {
        isMembershipPlanRenewed: false,
        startDate: {
          gt: endOfToday(),
        },
      },
    }),

    db.member.count({
      where: {
        endDate: {
          lt: startOfToday(),
        },
      },
    }),
  ]);

  return { activeCount, pendingCount, expiredCount };
};
