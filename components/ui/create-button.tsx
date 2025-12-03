"use client";

import Button from "./button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/create")}
      className="ml-auto px-2.5 py-2 text-h6 bg-white hover:bg-gray-200 flex items-center gap-3"
    >
      Create
      <Image src="vector-plus.svg" alt="Plus Icon" width={15.65} height={15} />
    </Button>
  );
}
