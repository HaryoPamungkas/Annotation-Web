"use client";

import { useRouter } from "next/navigation";
import ProjectCardMenu from "./project-card-menu";
import ProjectStatus from "./project-status";

interface ProjectCardProps {
  id: string;
  name: string;
  totaldata: number;
  completed: number;
  updateAt: Date;
  createAt: Date;
  status: string;
  onDeleteSuccess: (id: string) => void;
}

export default function ProjectCard({
  id,
  name,
  totaldata,
  completed,
  updateAt,
  createAt,
  onDeleteSuccess,
}: ProjectCardProps) {
  const router = useRouter();

  // Handle Delete (tanpa confirm — confirm ada di ProjectCardMenu)
  const handleDelete = async (): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });

      if (res.ok) {
        // update UI
        onDeleteSuccess(id);
        return true; // supaya .then() di ProjectCardMenu berjalan
      }

      return false;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  };

  // Handle Export CSV
  const handleExport = async (): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}/export`);

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `project-${name}.csv`;
        a.click();
        return true;
      }

      console.error("Failed to export project.");
      return false;
    } catch (error) {
      console.error("Error exporting project:", error);
      return false;
    }
  };

  return (
    <div
      className="relative w-full max-w-[1920px] h-[250px] bg-white rounded-xl border border-gray-300 
                 transition pt-[23px] px-[19px] flex flex-col hover:shadow-md hover:bg-gray-200"
    >
      {/* 3-dots menu */}
      <div className="absolute right-3 top-3">
        <ProjectCardMenu onDelete={handleDelete} onExport={handleExport} />
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between h-full w-full pb-5">
        {/* Title + Tooltip */}
        <div className="relative w-fit group">
          <h4
            onClick={() => router.push(`/workspace/${id}`)}
            className="text-h4 truncate max-w-[320px] cursor-pointer hover:underline"
          >
            {name}
          </h4>

          <span
            className="absolute left-0 bottom-full mb-2 whitespace-nowrap px-3 py-1
                       bg-black text-white text-sm rounded-md shadow-lg opacity-0
                       group-hover:opacity-100 transition-opacity duration-200 z-50"
          >
            {name}
          </span>
        </div>

        {/* Total */}
        <p className="text-h5 text-grey-card-font">Total: {totaldata}</p>

        {/* Completed */}
        <p className="text-h5 text-grey-card-font">Completed: {completed}</p>

        {/* Update + Status */}
        <div className="flex justify-between items-center w-full pr-2">
          <p className="text-h5 text-grey-card-font">
            Update:{" "}
            {updateAt instanceof Date && !isNaN(updateAt.getTime())
              ? updateAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Invalid Date"}
          </p>

          <ProjectStatus
            status={completed === totaldata ? "completed" : "in progress"}
          />
        </div>
      </div>
    </div>
  );
}
