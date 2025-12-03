"use client";
import React, { useState, useRef, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import type { AnnotItem } from "@/lib/types";

interface LeftSidebarProps {
  items: AnnotItem[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

export default function LeftSidebar({
  items,
  activeIndex,
  setActiveIndex,
}: LeftSidebarProps) {
  const total = items.length;
  const completed = items.filter((i) => i.label !== null).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // dropdown state
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <aside className="w-[300px] pt-4 border-r bg-white min-h-[calc(100vh-144px)]">
      <div className="p-5">
        <div className="flex items-center gap-10">
          <div style={{ width: 61, height: 60 }}>
            <CircularProgressbar
              value={percentage}
              text={""}
              styles={buildStyles({
                pathColor: "#34D399",
                trailColor: "#E6E6E6",
                strokeLinecap: "round",
              })}
            />
          </div>

          <div>
            <div className="font-semibold right-0">Progress</div>
            <div className="text-medium text-grey4">
              {" "}
              <span className="text-black">{completed}</span> / {total}{" "}
              completed &gt;
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown header */}
      <div className="pt-4">
        <div className="relative" ref={ddRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 cursor-pointer"
            aria-expanded={open}
            // aria-haspopup="listbox"
          >
            <span className="text-h5">Progress</span>
            <span className="text-gray-500">{open ? "▲" : "▼"}</span>
          </button>

          {open && (
            <div className="mt-2 bg-white shadow-sm max-h-60 overflow-auto">
              {items.map((it, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={it.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition cursor-pointer
                      ${isActive ? "bg-gray-300" : "hover:bg-gray-400"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 flex items-center justify-center">
                        {it.label !== null ? (
                          <span className="" />
                        ) : (
                          <span className="" />
                        )}
                      </div>
                      <div className="text-medium">{it.id}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
