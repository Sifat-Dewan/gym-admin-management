"use client";

import { SidebarItems } from "./sidebar-items";

export const Sidebar = () => {
  return (
    <aside className="fixed top-[75px] border-r hidden lg:block min-w-[260px] h-screen bg-background z-20">
      <SidebarItems />
    </aside>
  );
};
