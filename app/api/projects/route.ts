import { NextResponse } from "next/server";
import { getAllProject } from "@/lib/project";

export async function GET() {
    try {
        const projects = await getAllProject();
        return NextResponse.json({
            projects
        }, { status: 200 })
    }
    catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ 
            message: "Failed to retrieve projects."
        }, 
            { status: 500 });
    }
}

