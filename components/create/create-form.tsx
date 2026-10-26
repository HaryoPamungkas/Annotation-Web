"use client";

import { useState } from "react";
import UploadArea from "./upload-area";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [successNotif, setSuccessNotif] = useState(false);
  const [errorNotif, setErrorNotif] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorNotif(null);

    const formData = new FormData();
    formData.append("projectName", name);
    files.forEach((file) => formData.append("file", file));

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccessNotif(true);

        // RESET FORM
        setName("");
        setFiles([]);

        // sembunyikan notif setelah beberapa detik
        setTimeout(() => setSuccessNotif(false), 2000);

      } else {
        const errorData = await res.json();
        setErrorNotif(errorData.error || "Failed to create project");
        setTimeout(() => setErrorNotif(null), 2500);
      }

    } catch (error) {
      console.error("Create error:", error);
      setErrorNotif("Something went wrong");
      setTimeout(() => setErrorNotif(null), 2500);
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center relative">

      {/* FULLSCREEN LOADING */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-9998">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* SUCCESS NOTIFICATION */}
      {successNotif && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white 
                      px-5 py-2 rounded-lg shadow-lg z-[9999] animate-slide-down-fade"
        >
          Project created successfully!
        </div>
      )}

      {/* ERROR NOTIFICATION */}
      {errorNotif && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white 
                      px-5 py-2 rounded-lg shadow-lg z-9999 animate-slide-down-fade"
        >
          {errorNotif}
        </div>
      )}

      {/* Form Card */}
      <div className="w-full max-w-[1080px] bg-white border border-gray-300 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          id="create-form"
        >
          {/* Name Project */}
          <div>
            <label className="block text-h6 font-medium mb-2">Name Project</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Input Name Project..."
              className="w-full h-12 mt-2.5 px-4 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Upload Area */}
          <UploadArea files={files} setFiles={setFiles} />
        </form>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-[1080px] flex justify-end gap-4 mt-6">
        <button
          type="button"
          disabled={loading}
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-300 
                     transition cursor-pointer disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="submit"
          form="create-form"
          disabled={loading}
          className="px-6 py-2 bg-blue1 text-white rounded-lg hover:bg-blue-700 
                     transition cursor-pointer disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </div>
  );
}
