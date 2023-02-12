// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const user = JSON.parse(req.body);
    if (req.method === 'POST') {
    }
    const data = await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
}
