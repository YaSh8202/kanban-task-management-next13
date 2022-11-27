// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { v4 as uuid } from "uuid";
import { Board } from "../../typings";
import { getSession } from "next-auth/react";

type Data = {
  board: Board;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // get user id from session
  const { board } = req.body;
  const session = await getSession({ req });
  if (!session?.user?.email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const email = session?.user?.email;

  if (!board) {
    res.status(400).json({ error: "Missing board" });
  }

  const columns = board.columns.map((column: { name: string }) => ({
    name: column.name,
    id: uuid(),
    tasks: [],
  }));

  const newBoard = {
    id: board.id,
    name: board.name,
    columns: columns.map((column: { id: string; name: string }) => column.id),
  };

  await redis.hset(email, board.id, JSON.stringify(newBoard));
  columns.forEach(async (column: { id: string; name: string }) => {
    await redis.hset(board.id, column.id, JSON.stringify(column));
  });

  res.status(200).json({ board: newBoard });
}
