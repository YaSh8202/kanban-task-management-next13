// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { v4 as uuid } from "uuid";

type Data = {
  id: string;
  name: string;
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
  }

  // get user id from session
  const { id: email, boardName } = req.body;
  const boardId = uuid();
  const newBoard = { name: boardName, id: boardId };
  await redis.hset(email, boardId, JSON.stringify(newBoard));

  res.status(200).json(newBoard);
}
