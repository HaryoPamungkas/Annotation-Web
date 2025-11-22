import { deleteProjectById } from "@/lib/project";
import getProjectItemsById  from "@/lib/projectItem";
import { NextResponse } from "next/server";

//  to fetch all project items based on what id
export async function GET(
    _req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;
        const projectItemById = await getProjectItemsById(projectId);

        return NextResponse.json({
            projectItemById
        }, { status: 200 });
    } catch (error: unknown) {
        console.error(error)
        return NextResponse.json({
            message: 'failed to fetch items.'
        }, { status: 500 })

    }
}

// to delete a project based on what id
export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;
        const project = await deleteProjectById(projectId);

        return NextResponse.json({
            project,
            message: `Project with ID: ${projectId} deleted successfully.`
        }, { status: 200 })
    }
    catch (error: unknown) {
        console.error(error);
        return NextResponse.json({
            message: "Failed to delete project."
        }, { status: 500 })
    }
}
