// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { updateUserId } = req.query;
  const { name } = JSON.parse(req.body);
  try {
    const updateTask = await prisma.users.update({
      where: {
        id: parseInt(updateUserId),
      },
      data: {
        name: name,
      },
    });
    console.log({ updateTask });
  } catch (error) {
    console.error(error);
  }
}
