import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ProjectCardMenuProps {
  onDelete: () => void;
  onExport: () => void;
}

export default function ProjectCardMenu({ onDelete, onExport }: ProjectCardMenuProps) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);  // State untuk pemberitahuan ekspor
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Export
  const handleExport = async () => {
    try {
      await onExport(); // Panggil fungsi ekspor dari parent
      setExportSuccess(true); // Tampilkan pemberitahuan berhasil ekspor
      setTimeout(() => setExportSuccess(false), 3000); // Sembunyikan pemberitahuan setelah 3 detik
    } catch (error) {
      console.error("Error exporting project:", error);
      alert("Failed to export project.");
    }
  };

  return (
    <>
      {/* DROPDOWN BUTTON */}
      <div
        className="relative"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="p-1 hover:opacity-70 transition cursor-pointer outline-none focus:outline-none"
        >
          <Image src="/dots.svg" alt="Menu" width={25} height={25} />
        </button>

        {/* DROPDOWN MENU */}
        {open && (
          <div
            className="absolute right-0 mt-2 w-[125px] p-2.5 bg-white rounded-xl border border-gray-300 shadow-lg z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* EXPORT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleExport(); // Panggil handleExport untuk mengekspor proyek
              }}
              className="w-full text-left px-2 py-1.5 text-normal hover:bg-gray-300 rounded-md cursor-pointer"
            >
              Export CSV
            </button>

            {/* DELETE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false); // close dropdown
                setConfirmDelete(true); // open modal
              }}
              className="w-full text-left px-2 py-1.5 text-normal hover:text-white hover:bg-red-500 rounded-md cursor-pointer mt-1"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {confirmDelete && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 "
          onClick={() => setConfirmDelete(false)} // close modal jika klik di luar modal
        >
          <div
            className="bg-white w-[300px] border p-6 rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()} // mencegah klik di dalam modal
          >
            <h3 className="text-lg font-semibold mb-3">Delete this project?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(false)} // Tutup modal tanpa menghapus proyek
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmDelete(false); // Menutup modal
                  onDelete(); // Panggil fungsi onDelete yang diteruskan dari parent
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Success Notification */}
      {exportSuccess && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          Project exported successfully!
        </div>
      )}
    </>
  );
}
