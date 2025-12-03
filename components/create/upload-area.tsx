"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";

interface UploadAreaProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export default function UploadArea({ files, setFiles }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Klik → buka file picker
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Browse file
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // Drag & drop upload
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setFiles(Array.from(e.dataTransfer.files));
    },
    [setFiles]
  );

  // Hapus file
  const handleDelete = () => {
    setFiles([]);
  };

  return (
    <div>
      <label className="block text-h6 mt-2.5 mb-2">Drop a CSV File</label>

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-72 border mt-2.5 border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-50 px-4 text-center"
      >
        {files.length === 0 ? (
          <>
            <p className="text-base">Drag & Drop your files here</p>
            <p className="text-sm">or click to browse</p>
          </>
        ) : (
          <div className="w-full flex items-center justify-center gap-1.5">
            <span className="truncate text-h6 text-black">{files[0].name}</span>

            <Image
              src="/delete.svg"
              width={22}
              height={22}
              alt="delete icon"
              className="cursor-pointer hover:opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
