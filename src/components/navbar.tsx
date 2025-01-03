"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarMenu() {
  return <Navbar className="top-0 w-full" />;
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className={cn("relative w-full top-0 left-0 z-10", className)}>
      <Menu setActive={setActive}>
        <div className="flex justify-between items-center px-8 py-0">
          {/* Left Section */}
          <div>
            <span className="font-bold text-lg text-neutral-800 dark:text-neutral-200">
              BookAdda
            </span>
          </div>

          {/* Center Section */}
          <div className="flex space-x-6">
            <NavLink href="/" currentPath={pathname}>
              Home
            </NavLink>
            <NavLink href="/sell-book" currentPath={pathname}>
              Sell Book
            </NavLink>
            <NavLink href="/books" currentPath={pathname}>
              Buy Book
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Profile Section */}
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-xl font-semibold text-gray-700">
              {session?.user?.userFirstName
                ? session.user.userFirstName[0].toUpperCase()
                : "?"}
            </div>

            {/* Dropdown Menu */}
            <MenuItem setActive={setActive} active={active} item="Profile">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/user-dashboard">User</HoveredLink>
                <HoveredLink href="/history">Books History</HoveredLink>
                <HoveredLink href="/help-desk">Help</HoveredLink>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="text-left text-sm text-red-600"
                  >
                    Logout
                  </button>
                ) : (
                  <HoveredLink href="/signin">Sign In</HoveredLink>
                )}
              </div>
            </MenuItem>
          </div>
        </div>
      </Menu>
    </div>
  );
}

/** NavLink Component */
function NavLink({
  href,
  currentPath,
  children,
}: {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  const isActive = href === currentPath;
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-orange-600 transition",
        isActive ? "text-orange-600" : "text-gray-500"
      )}
    >
      {children}
    </Link>
  );
}
