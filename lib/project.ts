import prisma from "@/lib/prisma";

type Project = {
    id: string;
    name: string;
    totalData: number;
    completed: number;
    status: string;
    updatedAt: Date;
    createdAt: Date;
};

export async function getAllProject(): Promise< Project[] > {
    return await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                totalData: true,
                completed: true,
                status: true,
                updatedAt: true,
                createdAt: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });
}

export async function getProjectNameById(projectId: string) {
    return await prisma.project.findMany({
        where: {
            id: projectId
        },
        select: {
            name: true
        }
    });
}

export async function deleteProjectById(projectId: string) {
    return await prisma.project.delete({
            where: {
                id: projectId
            }
        });
}
