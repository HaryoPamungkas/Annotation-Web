import { PrismaClient, Prisma, ProjectStatus, Sentiment } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const randomLabel = () => {
  const values = [null, Sentiment.POSITIVE, Sentiment.NEGATIVE, Sentiment.NEUTRAL];
  return values[Math.floor(Math.random() * values.length)];
};

async function main() {
  console.log('Seeding database..');

  
  const sampleRows = [
    {
      tweetAuthor:
        'Selamat ulang tahun Bapak Presiden @prabowo. Doa dan harapan terbaik selalu menyertai Bapak dalam menjalankan amanah!',
      username: 'yongkyputrau',
      text: '@jokowi @prabowo Adili Jokowi',
      createdAt: new Date('2025-10-17T09:48:37Z'),
    },
    {
      tweetAuthor:
        'Selamat ulang tahun Bapak Presiden @prabowo. Doa dan harapan terbaik selalu menyertai Bapak dalam menjalankan amanah!',
      username: 'romario_aja',
      text: '@jokowi @prabowo Semoga pak prabowo ngga kayak...',
      createdAt: new Date('2025-10-17T08:58:21Z'),
    },
    {
      tweetAuthor:
        'Selamat ulang tahun Bapak Presiden @prabowo. Doa dan harapan terbaik selalu menyertai Bapak dalam menjalankan amanah!',
      username: 'celerio1132',
      text: '@jokowi @prabowo Siap siap ya MULYONO semua mem...',
      createdAt: new Date('2025-10-17T09:12:31Z'),
    },
    {
      tweetAuthor:
        'Selamat ulang tahun Bapak Presiden @prabowo. Doa dan harapan terbaik selalu menyertai Bapak dalam menjalankan amanah!',
      username: 'MasengSung',
      text: '@jokowi @prabowo Loe bayar nih utang https...',
      createdAt: new Date('2025-10-17T11:01:05Z'),
    },
    {
      tweetAuthor:
        'Selamat ulang tahun Bapak Presiden @prabowo. Doa dan harapan terbaik selalu menyertai Bapak dalam menjalankan amanah!',
      username: 'Gonzalesgozin46',
      text: '@jokowi @prabowo Ijazah lu mana wi..? https...',
      createdAt: new Date('2025-10-17T12:10:02Z'),
    },
  ];

  
  const generateItems = (count: number, projectId: string) =>
    Array.from({ length: count }).map((_, i) => {
      const row = sampleRows[Math.floor(Math.random() * sampleRows.length)];

      return {
        projectId,
        tweetAuthor: row.tweetAuthor,
        username: row.username,
        text: row.text,
        createdAt: row.createdAt,
        order: i + 1,
        label: randomLabel(),
        isCompleted: randomLabel() !== null ? true : false,
      };
    });

  // Project 1
  const project1 = await prisma.project.create({
    data: {
      name: 'Sentiment Analysis - Prabowo Replies',
      status: ProjectStatus.IN_PROGRESS,
      totalData: 20,
    },
  });

  await prisma.projectItem.createMany({
    data: generateItems(20, project1.id),
  });

  // Project 2
  const project2 = await prisma.project.create({
    data: {
      name: 'Public Reaction Dataset - Politics',
      status: ProjectStatus.IN_PROGRESS,
      totalData: 35,
    },
  });

  await prisma.projectItem.createMany({
    data: generateItems(35, project2.id),
  });

  // Project 3
  const project3 = await prisma.project.create({
    data: {
      name: 'Demo Project - Annotator Workspace Test',
      status: ProjectStatus.IN_PROGRESS,
      totalData: 12,
    },
  });

  await prisma.projectItem.createMany({
    data: generateItems(12, project3.id),
  });

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
