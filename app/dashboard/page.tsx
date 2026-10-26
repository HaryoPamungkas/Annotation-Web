"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Image from "next/image";
import ProjectCard from "@/components/project/project-card";
import CreateButton from "@/components/ui/create-button";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");

        if (res.ok) {
          const data = await res.json();
          const updated = data.projects.map((p: any) => ({
            ...p,
            updatedAt: new Date(p.updatedAt),
            createdAt: new Date(p.createdAt),
          }));
          setProjects(updated);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Hapus dari UI
  const handleDeleteSuccess = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 border-solid"></div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Annotator" />

      <div className="px-12 pt-28">
        <CreateButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 px-12 pt-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            totaldata={project.totalData}
            completed={project.completed}
            status={project.status}
            updatedAt={project.updatedAt}
            createdAt={project.createdAt}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </div>
    </div>
  );
}
