interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-[7] font-medium transition cursor-pointer ${className}`}
    >
      {children}
    </button> 
  );
}
