// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../../redis";
import { Task } from "../../../typings";

type Data = {
  tasks: Task[];
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { columnId } = req.query;

  if (!columnId) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }
  if (typeof columnId !== "string") {
    res.status(400).json({ error: "Bad Request" });
    return;
  }
  const tasksRes = await redis.hvals(columnId);
  const tasks = tasksRes.map((task) => JSON.parse(task));

  res.status(200).json({ tasks });
}
