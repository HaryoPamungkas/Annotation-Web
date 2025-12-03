"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/ui/header";
import LeftSidebar from "@/components/workspace/left-sidebar";
import RightSidebar from "@/components/workspace/right-sidebar";
import AnnotationContent from "@/components/workspace/main-content";
import { dummyData } from "@/lib/dummy";
import type { AnnotItem, Label } from "@/lib/types";

export default function WorkspacePage({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<AnnotItem[]>(() =>
    dummyData.map((d) => ({ ...d }))
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = items[activeIndex];

  const [selectedLabel, setSelectedLabel] = useState<Label>(
    activeItem?.label ?? null
  );

  useEffect(() => {
    setSelectedLabel(items[activeIndex]?.label ?? null);
  }, [activeIndex]);

  useEffect(() => {
    if (!items[activeIndex]) return;

    const currentLabel = items[activeIndex].label;
    if (currentLabel === selectedLabel) return;

    setItems((prev) => {
      const updated = [...prev];
      updated[activeIndex] = {
        ...updated[activeIndex],
        label: selectedLabel,
      };
      return updated;
    });
  }, [selectedLabel, activeIndex]);

  const onPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const onNext = useCallback(() => {
    setActiveIndex((i) => Math.min(items.length - 1, i + 1));
  }, [items.length]);

  const handleExit = useCallback(() => {}, []);

  return (
    <div className="min-h-screen bg-[#F5F6F7] pt-28">
      <Header>
        <div className="flex items-center justify-center w-full">
          <h1 className="text-h4 text-white">Annotation Workspace</h1>
        </div>
      </Header>

      <div className="w-full max-w-[1440px] mx-auto flex">
        <LeftSidebar
          items={items}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <AnnotationContent
          projectId={projectId}
          item={activeItem}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          onPrev={onPrev}
          onNext={onNext}
        />

        <RightSidebar
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          onExit={handleExit}
        />
      </div>
    </div>
  );
}
