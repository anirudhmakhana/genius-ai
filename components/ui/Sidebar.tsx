"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Settings,
} from "lucide-react";
import FreeCounter from "@/components/ui/FreeCounter";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generation",
    color: "text-pink-500",
  },
  {
    label: "Image Generation",
    icon: VideoIcon,
    href: "/dashboard",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: VideoIcon,
    href: "/music-generation",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: VideoIcon,
    href: "/code-generation",
    color: "text-yellow-200",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount: number;
}
const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
  const pathName = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image src="/logo.png" alt="Logo" fill />
          </div>
          <h1 className="text-2xl font-bold">Genius</h1>
        </Link>
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <div className="flex items-center flex-1">
                {React.createElement(route.icon, {
                  className: `w-6 h-6 mr-4 ${route.color}`,
                })}
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
