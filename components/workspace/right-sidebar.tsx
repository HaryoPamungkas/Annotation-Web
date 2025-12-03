"use client";
import React from "react";
import type { Label } from "@/lib/types";
import { useRouter } from "next/navigation";

interface RightSidebarProps {
  selectedLabel: Label;
  setSelectedLabel: (l: Label) => void;
  onExit?: () => void;
}

export default function RightSidebar({
  selectedLabel,
  setSelectedLabel,
  onExit,
}: RightSidebarProps) {
  const router = useRouter();

  function handleExit() {
    if (onExit) onExit();
    router.push("/dashboard");
  }

  const Radio = ({ val, label }: { val: Label; label: string }) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="sentiment"
        value={val ?? ""}
        checked={selectedLabel === val}
        onChange={() => setSelectedLabel(val)}
        className="
          appearance-none 
          w-3 h-3 rounded-full 
          ring-2 ring-gray-400 
          cursor-pointer
          transition

          checked:ring-green-400
          checked:bg-green-400
        "
      />
      <span className="ml-1">{label}</span>
    </label>
  );

  return (
    <aside className="w-[340px] border-l bg-white min-h-[calc(100vh-144px)] p-6 pt-10 flex flex-col justify-between">
      <div>
        <h3 className="text-h6">Pilih Label Sentiment</h3>

        <div className="mt-5 flex flex-col gap-3 text-lg font-bold">
          <Radio val="positive" label="Positive" />
          <Radio val="negative" label="Negative" />
          <Radio val="neutral" label="Neutral" />
        </div>
      </div>

      <div>
        <button
          onClick={handleExit}
          className="w-full bg-gray-900 text-white py-3 rounded-md cursor-pointer"
        >
          Save & Exit
        </button>
      </div>
    </aside>
  );
}
