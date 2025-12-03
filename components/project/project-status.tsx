import React from "react";

interface StatusProps {
  status: "in progress" | "completed";
}

export default function ProjectStatus({ status }: StatusProps) {
  const isCompleted = status === "completed";

  return (
    <div
      className={`
        px-3 py-1 rounded-full text-small-bold font-semibold border w-fit whitespace-nowrap
        ${isCompleted
          ? "text-green-700 bg-[#E9F7E7] border-gray-400"
          : "text-yellow-600 bg-[#FFF9D9] border-gray-400"
        }
      `}
    >
      {isCompleted ? "Completed" : "In Progress"}
    </div>
  );
}


