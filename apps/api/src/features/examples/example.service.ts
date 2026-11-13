import { prisma } from "../../config/database.js";

export const listExamples = (ownerId: string) =>
  prisma.example.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" },
  });

export const createExample = (ownerId: string, title: string) =>
  prisma.example.create({
    data: { ownerId, title },
  });
