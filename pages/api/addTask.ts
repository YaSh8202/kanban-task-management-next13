// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { v4 as uuid } from "uuid";
import { Board, Task } from "../../typings";
import { getSession } from "next-auth/react";

type Data = {
  task: Task;
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
  const session = await getSession({ req });
  if (!session?.user?.email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { boardId, columnId, task } = req.body;

  if (!boardId || !columnId || !task) {
    res.status(400).json({ error: "Missing task data" });
  }

  try {
    await redis.hset(columnId, task.id, JSON.stringify(task));
    const columnString = await redis.hget(boardId, columnId);
    if (columnString) {
      const column = JSON.parse(columnString);
      column.tasks.push(task.id);
      await redis.hset(boardId, columnId, JSON.stringify(column));
    }
    res.status(200).json({ task: task });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
}
