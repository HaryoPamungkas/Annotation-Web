import Header from "@/components/ui/header";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="Workspace" />

      <div className="mt-24">
        {children}
      </div>
    </>
  );
}

