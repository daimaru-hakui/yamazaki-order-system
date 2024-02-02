"use client"
import SidebarList from "./sidebar-list";

export default function MainSideBar() {
  return (
    <div className="px-6 pt-3 sticky top-0 w-full bg-white min-h-screen drop-shadow-md">
      <div className="flex items-center justify-center h-12 font-bold">
        山﨑製パン APP
      </div>
      <SidebarList />
    </div>
  );
}
