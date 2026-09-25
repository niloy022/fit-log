"use client";

import { toast } from "react-toastify";

type Props = {
  workoutId: number;
};

const SaveWorkoutButton = ({ workoutId }: Props) => {
  const handleSave = () => {
    const existingSaved: number[] = JSON.parse(
      localStorage.getItem("savedWorkouts") || "[]"
    );

    if (existingSaved.includes(workoutId)) {
      toast.error("This workout is already saved.");
      return;
    }

    const updatedSaved = [...existingSaved, workoutId];

    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(updatedSaved)
    );
    window.dispatchEvent(new Event("planUpdated"));
    toast.success("Workout saved for later!");
  };

  return (
    <button
      onClick={handleSave}
      className="rounded-full border border-white/20 px-6 py-3 font-black uppercase transition hover:border-[#ccff00] hover:text-[#ccff00]"
    >
      Save for later
    </button>
  );
};

export default SaveWorkoutButton;