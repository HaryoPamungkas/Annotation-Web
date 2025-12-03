import Header from "@/components/ui/header";
import CreateForm from "@/components/create/create-form";

export default function CreateProjectPage() {
  return (
    <>
      <Header>
        <h3 className="text-white text-h4 ">Create a New Project</h3>
      </Header>
      <div className="pt-36 px-12 pb-20">
        <CreateForm />
      </div>
    </>
  );
}
