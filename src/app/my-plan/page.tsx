"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { workouts } from "@/data/workouts";
import { toast } from "react-toastify";

const MyPlan = () => {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const savedPlan = JSON.parse(
        localStorage.getItem("todayPlan") || "[]"
      );

      const savedWorkouts = JSON.parse(
        localStorage.getItem("savedWorkouts") || "[]"
      );

      setPlanIds(savedPlan);
      setSavedIds(savedWorkouts);
      setLoading(false);
    };

    loadData();
  }, []);

  const currentIds = activeTab === "plan" ? planIds : savedIds;

  const currentWorkouts = workouts.filter((workout) =>
    currentIds.includes(workout.id)
  );

  const totalMinutes = planIds.reduce((total, id) => {
    const workout = workouts.find((item) => item.id === id);
    return total + (workout?.duration || 0);
  }, 0);

  const totalCalories = planIds.reduce((total, id) => {
    const workout = workouts.find((item) => item.id === id);
    return total + (workout?.caloriesBurned || 0);
  }, 0);

  const removeWorkout = (id: number) => {
  if (activeTab === "plan") {
    const updatedPlan = planIds.filter((item) => item !== id);

    localStorage.setItem("todayPlan", JSON.stringify(updatedPlan));
    setPlanIds(updatedPlan);

    window.dispatchEvent(new Event("planUpdated"));

    toast.error("Workout removed from today's plan.");
  } else {
    const updatedSaved = savedIds.filter((item) => item !== id);

    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(updatedSaved)
    );

    setSavedIds(updatedSaved);

    window.dispatchEvent(new Event("planUpdated"));

    toast.error("Workout removed from saved.");
  }
};

 const markAsDone = (id: number) => {
  const updatedPlan = planIds.filter((item) => item !== id);

  localStorage.setItem("todayPlan", JSON.stringify(updatedPlan));
  setPlanIds(updatedPlan);

  window.dispatchEvent(new Event("planUpdated"));

  toast.success("Workout marked as done!");
};

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] text-white">
        <p className="text-lg font-bold text-[#ccff00]">
          Loading workouts…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-black uppercase sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#181818] p-6">
            <p className="text-sm font-bold uppercase text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {planIds.length}
            </p>
          </div>

          <div className="rounded-2xl bg-[#181818] p-6">
            <p className="text-sm font-bold uppercase text-gray-500">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl bg-[#181818] p-6">
            <p className="text-sm font-bold uppercase text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 text-sm font-black uppercase ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 text-sm font-black uppercase ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-white/20 text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Empty State */}
        {currentWorkouts.length === 0 ? (
          <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-black uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 font-black uppercase text-black transition hover:scale-105"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818]"
              >
                {/* Thumbnail */}
                <div className="relative h-52 w-full">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-black uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    🔗 {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-gray-300">
                    <span>⏱️ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>⭐ {workout.rating}</span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        className="rounded-full border border-[#ccff00]/50 px-4 py-2 text-xs font-black uppercase text-[#ccff00]"
                      >
                        Mark as Done
                      </button>
                    )}

                    <button
                      onClick={() => removeWorkout(workout.id)}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase text-gray-300 transition hover:border-red-500 hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlan;