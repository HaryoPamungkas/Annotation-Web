"use client";
import React from "react";
import type { AnnotItem, Label } from "@/lib/types";

interface AnnotationContentProps {
   projectId: string;    
  item: AnnotItem;
  selectedLabel: Label;
  setSelectedLabel: (l: Label) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function AnnotationContent({
  projectId,
  item,
  selectedLabel,
  setSelectedLabel,
  onPrev,
  onNext,
}: AnnotationContentProps) {
  if (!item) return <main className="flex-1 p-8">No item</main>;

  const dateStr = new Date(item.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="flex-1 bg-white min-h-[calc(100vh-144px)] px-12 pt-10">
      <div className="max-w-[720px] mx-auto flex flex-col h-full">

        {/* HEADER */}
        <div className="mb-4">
          <div className="text-h6 text-grey4 mb-2">ID: {item.id}</div>
          <div className="text-h6 mb-2.5">{item.user}</div>
          <div className="text-medium text-black">{dateStr}</div>
        </div>

        {/* TEXT AREA SCROLLABLE */}
        <div className="flex-1 overflow-y-auto pr-3 my-4 max-h-[350px]">
          <h1 className="text-h4 leading-snug whitespace-pre-line">
            {item.text}
          </h1>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between items-center py-4 mt-auto">
          <button
            onClick={onPrev}
            className="px-6 py-2 border rounded-md cursor-pointer hover:bg-gray-100"
          >
            ← Prev
          </button>

          <button
            onClick={onNext}
            className="px-6 py-2 border rounded-md cursor-pointer hover:bg-gray-100"
          >
            Next →
          </button>
        </div>

      </div>
    </main>
  );
}
