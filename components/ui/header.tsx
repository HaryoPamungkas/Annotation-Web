import Image from "next/image";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header
      className="
        fixed top-0 left-0 z-50
        w-full h-24
        bg-[#0F191A]
        flex items-center
        px-12
        shadow-md
      "
    >
      {/* LEFT LOGO */}
      <div className="w-1/3 flex items-center">
        <Image
          src="/annotator-logo.svg"
          alt="Left Logo"
          width={125}
          height={63}
          priority
        />
      </div>

      {/* CENTER TITLE */}
      <div className="w-1/3 text-center">
        <h1 className="text-white text-h3">{title}</h1>
      </div>

      {/* RIGHT LOGO */}
      <div className="w-1/3 flex justify-end items-center">
        <Image
          src="/logo_mercu.png"
          alt="Right Logo"
          width={140}
          height={70}
          priority
        />
      </div>
    </header>
  );
}
