// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { deleteUserId } = req.query;
  try {
    const deletedTask = await prisma.users.delete({
      where: {
        id: Number(deleteUserId),
      },
    });
    console.log({ deletedTask });
  } catch (error) {
    console.error(error);
  }
}
