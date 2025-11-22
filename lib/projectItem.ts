import prisma from "@/lib/prisma";

export default async function getProjectItemsById(projectId: string) {
  return await prisma.projectItem.findMany({
    where: { projectId },
    select: {
      tweetAuthor: true,
      username: true,
      text: true,
      label: true,
    },
  });
}
