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
            updateAt: new Date(p.updateAt),
            createAt: new Date(p.createAt),
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
      <Header>
        <Image src="/annotator-logo.svg" alt="Annotator Logo" width={160} height={80} priority />
        <CreateButton />
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 px-12 pt-36">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            totaldata={project.totalData}
            completed={project.completed}
            status={project.status}
            updateAt={project.updateAt}
            createAt={project.createAt}
            onDeleteSuccess={handleDeleteSuccess} // PASS FUNCTION
          />
        ))}
      </div>
    </div>
  );
}
