"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import {  signOut, useSession } from 'next-auth/react'

export function NavbarMenu() {
   return (
    //  <div className="relative w-full items-center justify-center">
       <Navbar className="top-0 w-full" />
    //  </div>
  );
}



function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const{data:session} = useSession()
//   console.log(session);
  
  
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
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/sell-book">Sell Book</HoveredLink>
                <HoveredLink href="/books">Buy Book</HoveredLink>
                <HoveredLink href="/interface-design">Online Book</HoveredLink>
                {/* <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink> */}
              </div>
            </MenuItem>
  
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="text-sm grid grid-cols-2 gap-5 p-4">
                <ProductItem
                  title="Algochurn"
                  href="https://algochurn.com"
                  src="https://assets.aceternity.com/demos/algochurn.webp"
                  description="Prepare for tech interviews like never before."
                />
                <ProductItem
                  title="Tailwind Master Kit"
                  href="https://tailwindmasterkit.com"
                  src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                  description="Production ready Tailwind CSS components for your next project"
                />
                <ProductItem
                  title="Moonbeam"
                  href="https://gomoonbeam.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                  description="Never write from scratch again. Go from idea to blog in minutes."
                />
                <ProductItem
                  title="Rogue"
                  href="https://userogue.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                  description="Respond to government RFPs, RFIs, and RFQs 10x faster using AI"
                />
              </div>
            </MenuItem>
  
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/hobby">Hobby</HoveredLink>
                <HoveredLink href="/individual">Individual</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                <HoveredLink href="/enterprise">Enterprise</HoveredLink>
              </div>
            </MenuItem>
          </div>
  
          {/* Right Section */}
         <div className="flex items-center space-x-4">
  {/* Profile Section with dynamic first letter */}
  <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-xl font-semibold text-gray-700">
    {session?.user?.userFirstName
      ? session.user.userFirstName[0].toUpperCase()
      : "?"}
  </div>

  {/* Menu Items */}
  <MenuItem setActive={setActive} active={active} item="Profile">
    <div className="flex flex-col space-y-4 text-sm">
      <HoveredLink href="/user-dashboard">User</HoveredLink>
      <HoveredLink href="/history">Books History</HoveredLink>
      <HoveredLink href="/help-desk">Help</HoveredLink>
      <button onClick={() => signOut()} className="text-left text-sm">
        {session ? (
          "Logout"
        ) : (
          <HoveredLink href="/signin">SignIn</HoveredLink>
        )}
      </button>
    </div>
  </MenuItem>
</div>

  
        </div>
      </Menu>
    </div>
  );
}
