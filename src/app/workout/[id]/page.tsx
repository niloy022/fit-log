
import Image from "next/image";
import Link from "next/link";
import { workouts } from "@/data/workouts";
import AddToPlanButton from "@/Components/workout/AddToPlanButton";
import SaveWorkoutButton from "@/Components/workout/SaveWorkoutButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetails = async ({ params }: Props) => {
  const { id } = await params;

  const workout = workouts.find((item) => item.id === Number(id));

  if (!workout) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#111111] px-4 text-center text-white">
        <h1 className="text-4xl font-black">WORKOUT NOT FOUND</h1>

        <Link
          href="/"
          className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 font-black text-black"
        >
          GO TO WORKOUTS
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/"
          className="mb-8 inline-block text-sm font-bold text-gray-400 transition hover:text-[#ccff00]"
        >
          ← BACK TO LIBRARY
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-[#181818] lg:h-[600px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">

            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-[#ccff00]/40 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-black uppercase tracking-wide sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-[#181818] p-4">
                <p className="text-xs text-gray-500">EQUIPMENT</p>
                <p className="mt-1 font-bold">{workout.equipment}</p>
              </div>

              <div className="rounded-xl bg-[#181818] p-4">
                <p className="text-xs text-gray-500">DIFFICULTY</p>
                <p className="mt-1 font-bold">{workout.difficulty}</p>
              </div>

              <div className="rounded-xl bg-[#181818] p-4">
                <p className="text-xs text-gray-500">SETS</p>
                <p className="mt-1 font-bold">{workout.sets}</p>
              </div>

              <div className="rounded-xl bg-[#181818] p-4">
                <p className="text-xs text-gray-500">REPS</p>
                <p className="mt-1 font-bold">{workout.reps}</p>
              </div>

              <div className="rounded-xl bg-[#181818] p-4">
                <p className="text-xs text-gray-500">DURATION</p>
                <p className="mt-1 font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl bg-[#181818] p-4">
                <p className="text-xs text-gray-500">CALORIES</p>
                <p className="mt-1 font-bold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

            </div>

            <div className="mt-5 rounded-xl bg-[#181818] p-4">
              <p className="text-xs text-gray-500">RATING</p>

              <p className="mt-1 text-lg font-bold">
                ⭐ {workout.rating}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          <AddToPlanButton workoutId={workout.id} />

          <SaveWorkoutButton workoutId={workout.id} />

        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;

