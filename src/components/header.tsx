"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Container } from "./container";
import Logo from "./logo";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";
import { Skeleton } from "./ui/skeleton";

export const Header = () => {
  const { isLoaded } = useUser();
  return (
    <Container
      elem="header"
      className="sticky max-w-full flex items-center gap-4 z-50 bg-secondary top-0 h-[75px] border-b"
    >
      <MobileSidebar />
      <Logo className="" />
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggler />
        {isLoaded ? (
          <UserButton />
        ) : (
          <Skeleton className="size-[28px] rounded-full" />
        )}
      </div>
    </Container>
  );
};
