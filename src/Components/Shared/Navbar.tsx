"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
  const updateCounts = () => {
    const plan = JSON.parse(
      localStorage.getItem("todayPlan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("savedWorkouts") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  updateCounts();

  window.addEventListener("storage", updateCounts);
  window.addEventListener("planUpdated", updateCounts);

  return () => {
    window.removeEventListener("storage", updateCounts);
    window.removeEventListener("planUpdated", updateCounts);
  };
}, []);
  return (
 <div className="navbar fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0b0b0b] px-2 sm:px-4 lg:px-8">

      {/* LEFT */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-white/10 bg-[#111111] p-2 text-white shadow-xl"
          >
            <li>
              <Link href="/">Workout</Link>
            </li>

            <li>
              <Link href="/my-plan">My Plan</Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="btn btn-ghost gap-2 px-1 text-lg font-black tracking-wider text-white sm:px-3 sm:text-xl"
        >
          <Image
            src={logo}
            alt="FitLog Logo"
            width={40}
            height={40}
            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            priority
          />

          <span>
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">

          <li>
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "rounded-full bg-[#ccff00] font-bold text-black"
                  : "rounded-full text-white hover:bg-white/10"
              }
            >
              Workout
            </Link>
          </li>

          <li>
            <Link
              href="/my-plan"
              className={
                pathname === "/my-plan"
                  ? "rounded-full bg-[#ccff00] font-bold text-black"
                  : "rounded-full text-white hover:bg-white/10"
              }
            >
              My Plan
            </Link>
          </li>

        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-1 sm:gap-2">

        {/* Plan */}
        <Link
          href="/my-plan"
          className="btn btn-sm rounded-full border-0 bg-[#ccff00] px-2 text-xs font-bold text-black hover:bg-[#b8e600] sm:px-4 sm:text-sm"
        >
          Plan

          <span className="badge badge-neutral badge-sm">
            {planCount}
          </span>
        </Link>

        {/* Saved */}
        <Link
          href="/my-plan"
          className="btn btn-sm rounded-full border border-[#ccff00] bg-transparent px-2 text-xs font-bold text-white hover:bg-[#ccff00] hover:text-black sm:px-4 sm:text-sm"
        >
          Saved

          <span className="badge badge-sm border-current bg-transparent">
            {savedCount}
          </span>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;