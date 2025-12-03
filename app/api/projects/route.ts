import { NextResponse } from "next/server";
import { getAllProject, createNewProject, ProjectItemsType } from "@/lib/query";
import Papa from "papaparse";

// GET all projects
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

// POST new project
type CsvRow = {
    author_tweet: string;
    username: string;
    text: string;
    created_at: string;
    [key: string]: string | undefined; 
};


export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const projectName = form.get("projectName") as string;
        const file = form.get("file") as File;

        if (!projectName) {
            return NextResponse.json(
                { error: "Project name is required" },
                { status: 400 }
            );
        }

        if (!file) {
            return NextResponse.json(
                { error: "CSV file is required" },
                { status: 400 }
            );
        }

        // Read the CSV file
        const csvText = await file.text();

        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        if (parsed.errors.length > 0) {
            return NextResponse.json(
                { error: "CSV parsing error", details: parsed.errors },
                { status: 400 }
            );
        }

        // Convert to typed array (match CSV column names!)
        const items = (parsed.data as CsvRow[]).map(row => ({
            tweetAuthor: row.author_tweet ?? "",
            username: row.username ?? "",
            text: row.text ?? "",
            createdAt: row.created_at
                ? new Date(row.created_at)
                : new Date(),
        })) as ProjectItemsType[];

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "CSV is empty or invalid" },
                { status: 400 }
            );
        }

        const project = await createNewProject(projectName, items);

        return NextResponse.json(
            {
                message: "Project created successfully",
                projectId: project.id,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}