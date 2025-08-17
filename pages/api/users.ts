// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newUser = await prisma.user.create({
      data: { name, email, message },
    });

    return res.status(201).json(newUser);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
