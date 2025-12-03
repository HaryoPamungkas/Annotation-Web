import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header
      className="h-28 w-full flex items-center px-12 bg-[#0F191A]
                       fixed top-0 left-0 z-50 shadow"
    >
      {children}
    </header>
  );
}
