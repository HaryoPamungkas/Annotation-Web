import { json2csv } from "json-2-csv";
import { NextResponse } from "next/server";
import getProjectItemsById from "@/lib/projectItem";
import { getProjectNameById } from "@/lib/project";


// i still not sure but i think this is how it works to export the csv
export async function GET(
   _req: Request,
   { params }: { params: Promise<{ projectId: string }> }
){
    try {
        const { projectId } = await params;
        const [project, projectName] = await Promise.all([
            getProjectItemsById(projectId),
            getProjectNameById(projectId)
        ]);
        
        const csv = await json2csv(project);

        return new NextResponse(csv, {
        status: 200,
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="project-${projectName}.csv"`,
        },
    });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({
            message: "failed to export"
        }, { status: 500 });
    }
}
