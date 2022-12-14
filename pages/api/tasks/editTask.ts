import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../../redis";
import {  Task } from "../../../typings";
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

  const { columnId, task, newColumnId } = req.body;
  if (!columnId || !task || !newColumnId) {
    res.status(400).json({ error: "Missing task data" });
    return;
  }

  try {
    await redis.hdel(columnId, task.id);
    await redis.hset(newColumnId, task.id, JSON.stringify(task));

    res.status(200).json({ task: task });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
}
