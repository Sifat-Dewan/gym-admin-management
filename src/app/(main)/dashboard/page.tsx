export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { cn, formatPrice } from "@/lib/utils";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { getRevenueVsExpenseChartData } from "@/actions/charts";
import { RevenueVsExpenseChart } from "./revenue-vs-expense-chart";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Dashbaord",
  };
};

const DashboardPage = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalMembers,
    todaysJoinedMembersCount,
    todaysRenewedMembersCount,
    totalRevenue,
    thisMonthRevenue,
    thisMonthExpenses,
    todaysExpenses,
    revenueVsExpenseChartData,
  ] = await Promise.all([
    db.member.count(),
    db.member.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    }),
    db.member.count({
      where: {
        costRecords: {
          some: {
            createdAt: today,
            type: "RENEW_MEMBERSHIP_PLAN",
          },
        },
      },
    }),
    db.costRecord.aggregate({
      _sum: {
        cost: true,
      },
    }),
    db.costRecord.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth(today),
          lte: endOfMonth(today),
        },
      },
      _sum: {
        cost: true,
      },
    }),
    db.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth(today),
          lte: endOfMonth(today),
        },
      },
      _sum: {
        cost: true,
      },
    }),
    db.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
      _sum: {
        cost: true,
      },
    }),
    getRevenueVsExpenseChartData(),
  ]);

  const membersData = [
    {
      label: "Total Members",
      value: totalMembers,
    },
    {
      label: "Today's Joined Members",
      value: todaysJoinedMembersCount,
    },
    {
      label: "Today's Renewed Members",
      value: todaysRenewedMembersCount,
    },
  ];

  const revenuesData = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue._sum.cost || 0),
    },
    {
      label: "This Month Revenue",
      value: formatPrice(thisMonthRevenue._sum.cost || 0),
    },
    {
      label: "This Month Expense",
      value: formatPrice(thisMonthExpenses._sum.cost || 0),
    },
  ];

  const expensesData = [
    {
      label: "This Month Expense",
      value: formatPrice(thisMonthRevenue._sum.cost || 0),
    },
    {
      label: "Today's Expense",
      value: formatPrice(todaysExpenses._sum.cost || 0),
    },
  ];

  return (
    <>
      <PageHeader label="Dashboard" />
      <ul className="mt-5 space-y-8">
        <li className="p-5 shadow rounded-lg dark:border">
          <h2 className="font-semibold text-xl">Members</h2>
          <ul className="mt-3 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {membersData.map(({ label, value }) => (
              <li
                key={label}
                className={cn(
                  "rounded-md border bg-background space-y-2 p-5 shadow"
                )}
              >
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className="text-2xl font-semibold text-primary">{value}</p>
              </li>
            ))}
          </ul>
        </li>
        <li className="p-5 shadow rounded-lg dark:border">
          <h2 className="font-semibold text-xl text-primary">Revenues</h2>
          <ul className="mt-3 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {revenuesData.map(({ label, value }) => (
              <li
                key={label}
                className={cn(
                  "rounded-md border bg-background space-y-2 p-5 shadow"
                )}
              >
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className="text-2xl font-semibold text-green-500">{value}</p>
              </li>
            ))}
          </ul>
        </li>
        <li className="p-5 shadow rounded-lg dark:border">
          <h2 className="font-semibold text-xl">Expenses</h2>
          <ul className="mt-3 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {expensesData.map(({ label, value }) => (
              <li
                key={label}
                className={cn(
                  "rounded-md border bg-background space-y-2 p-5 shadow"
                )}
              >
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className="text-2xl font-semibold text-destructive">
                  {value}
                </p>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <RevenueVsExpenseChart chartData={revenueVsExpenseChartData} />
    </>
  );
};

export default DashboardPage;
