import Header from "@/components/ui/header";
import CreateForm from "@/components/create/create-form";

export default function CreateProjectPage() {
  return (
    <>
      <Header title="Create a New Project" />
      <div className="pt-36 px-12 pb-20">
        <CreateForm />
      </div>
    </>
  );
}
