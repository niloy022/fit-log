
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Workout } from "@/Components/Homepage/workout";

const Library = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return a.rating - b.rating;
  });

  // Loading animation
  if (loading) {
    return (
      <section
        id="library"
        className="flex min-h-[500px] items-center justify-center bg-[#111111] px-4 py-16"
      >
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </section>
    );
  }

  return (
    <section
      id="library"
      className="bg-[#111111] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading + Sort */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* Heading */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-wide text-white sm:text-4xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <label
              htmlFor="sort"
              className="text-sm font-bold text-gray-400"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "duration"
                    | "calories"
                    | "rating"
                )
              }
              className="select select-bordered rounded-full border-white/20 bg-[#181818] text-sm font-bold text-white outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workout/${workout.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-[#222222]">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-5">

                {/* Muscle Groups */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full border border-[#ccff00]/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Workout Name */}
                <h3 className="text-lg font-black uppercase text-white">
                  {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-2 text-sm text-gray-400">
                  🖇️ {workout.equipment}
                </p>

                {/* Workout Info */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-300">
                  <span>⏱️ {workout.duration} min</span>

                  <span>
                    🔥 {workout.caloriesBurned} kcal
                  </span>

                  <span>⭐ {workout.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;

