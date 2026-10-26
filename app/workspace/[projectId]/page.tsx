"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import LeftSidebar from "@/components/workspace/left-sidebar";
import RightSidebar from "@/components/workspace/right-sidebar";
import AnnotationContent from "@/components/workspace/main-content";
import { dummyData } from "@/lib/dummy";
import type { AnnotItem, Label } from "@/lib/types";

export default function WorkspacePage() {
  const { projectId } = useParams();

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
    <div className="bg-[#F5F6F7]">
      <div className="w-full max-w-[1440px] mx-auto flex">
        <LeftSidebar
          items={items}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <AnnotationContent
          projectId={projectId as string}
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
