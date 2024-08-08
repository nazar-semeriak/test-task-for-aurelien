"use client";
import Image from "next/image";
import SessionBtn from "../auth/session-btn";

const SidebarNavigation = () => {
  return (
    <div className="min-h-screen h-full bg-gray-100 pt-4" id="sidebar">
      {/* Adjusted classes */}
      <Image
        src="/img/logo_daillens.png" // Path to your image in the public folder
        alt="Logo Daillen"
        width={260}
        height={100}
      />
      <div className="flex flex-col mt-4 space-y-2">
        {/* Flex column with spacing */}
        <a
          href="/actualities"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
        >
          <i className="fa-regular fa-newspaper mr-2"></i>News
        </a>
        <a
          href="/activities"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
        >
          <i className="fa-regular fa-calendar-days mr-2"></i>Agenda
        </a>
        <a
          href="/locations"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
        >
          <i className="fa-regular fa-map mr-2"></i>Carte
        </a>
        <a
          href="/teams"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
        >
          <i className="fa-solid fa-people-roof mr-2"></i>Officiel
        </a>
        <a
          href="/infos"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
        >
          <i className="fa-solid fa-info mr-2"></i>Infos et Services
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-400 cursor-not-allowed"
        >
          <i className="fa-solid fa-user-gear mr-2"></i>Utilisateurs
        </a>
        <a
          href="/settings"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
        >
          <i className="fa-solid fa-gear mr-2"></i>Paramètres
        </a>
      </div>

      <SessionBtn />
    </div>
  );
};

export default SidebarNavigation;
