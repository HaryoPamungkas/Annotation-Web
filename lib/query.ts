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

type Sentiment = {
    label: "POSITIVE" | "NEGATIVE" | "NEUTRAL" | null,
    isCompleted: boolean
}

export type ProjectItemsType = {
    tweetAuthor: string;
    username: string;
    text: string;
    createdAt: string | Date;
}

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


export async function getProjectItemsById(projectId: string) {
  return await prisma.projectItem.findMany({
    where: { projectId },
    select: {
        id: true,
        tweetAuthor: true,
        username: true,
        text: true,
        createdAt: true,
        label: true,
    },
    orderBy: {
        order: 'asc'
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

export async function createNewProject(projectName: string, items: ProjectItemsType[]) {
    const project = await prisma.project.create({
        data: {
            name: projectName,
            totalData: items.length,
        }
    });

    await prisma.projectItem.createMany({
        data: items.map((item, index) => ({
            projectId: project.id,
            tweetAuthor: item.tweetAuthor,
            username: item.username,
            text: item.text,
            createdAt: new Date(item.createdAt),       
            order: index + 1             
        }))
    });

    return project
}