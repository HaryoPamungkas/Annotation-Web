"use client";

import { useState, useEffect } from "react";
import AnnotationContent from "@/components/workspace/main-content";
import type { AnnotItem, Label } from "@/lib/types";

export default function WorkspacePage({
  params,
}: {
  params: { projectId: string };
}) {

  const { projectId } = params;

  // --------------------------------
  // STATE SEMENTARA (dummy)
  // Nanti bisa diganti fetch dari API
  // --------------------------------
  const [items, setItems] = useState<AnnotItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);

  // Fetch data berdasarkan projectId
  useEffect(() => {
    async function loadData() {
      const res = await fetch(`/api/projects/${projectId}/items`);
      const data = await res.json();
      setItems(data);
    }
    loadData();
  }, [projectId]);

  const item = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, items.length - 1)
    );
  };

  return (
    <AnnotationContent
      projectId={projectId}
      item={item}
      selectedLabel={selectedLabel as Label}
      setSelectedLabel={setSelectedLabel}
      onPrev={handlePrev}
      onNext={handleNext}
    />
  );
}
