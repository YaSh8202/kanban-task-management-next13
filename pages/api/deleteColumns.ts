// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Board } from "../../typings";
import { getSession } from "next-auth/react";

type Data = {
  message: string;
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
  const {
    boardId,
    columns,
  }: {
    boardId: string;
    columns: string[];
  } = req.body;
  const session = await getSession({ req });
  if (!session?.user?.email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!boardId || !columns) {
    res.status(400).json({ error: "Missing board" });
  }

  try {
    columns.forEach(async (column: string) => {
      await redis.hdel(boardId, column);
      await redis.del(column);
    });
    res.status(200).json({ message: "Columns deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
