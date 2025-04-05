"use server";

import { db } from "@/lib/db";
import { endOfToday, startOfToday } from "date-fns";

export const getMembershipStatusCounts = async () => {
  const [activeCount, pendingCount, expiredCount] = await Promise.all([
    //active
    db.member.count({
      where: {
        startDate: {
          lte: startOfToday(),
        },
        endDate: {
          gte: endOfToday(),
        },
      },
    }),

    //pending
    db.member.count({
      where: {
        isMembershipPlanRenewed: false,
        startDate: {
          gt: startOfToday(),
        },
      },
    }),

    //expired
    db.member.count({
      where: {
        endDate: {
          lt: endOfToday(),
        },
      },
    }),
  ]);

  return { activeCount, pendingCount, expiredCount };
};
