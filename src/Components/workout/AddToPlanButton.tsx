"use client";

import { toast } from "react-toastify";

type Props = {
  workoutId: number;
};

const AddToPlanButton = ({ workoutId }: Props) => {
  const handleAddToPlan = () => {
    const existingPlan: number[] = JSON.parse(
      localStorage.getItem("todayPlan") || "[]"
    );

    if (existingPlan.includes(workoutId)) {
      toast.error("This workout is already in your plan.");
      return;
    }

    if (existingPlan.length >= 5) {
      toast.error("You can add maximum 5 workouts to today's plan.");
      return;
    }

    const updatedPlan = [...existingPlan, workoutId];

    localStorage.setItem("todayPlan", JSON.stringify(updatedPlan));
    window.dispatchEvent(new Event("planUpdated"));
    toast.success("Workout added to today's plan!");
    
  };

  return (
    <button
      onClick={handleAddToPlan}
      className="rounded-full bg-[#ccff00] px-6 py-3 font-black uppercase text-black transition hover:scale-105"
    >
      Add to today&apos;s plan
    </button>
  );
};

export default AddToPlanButton;