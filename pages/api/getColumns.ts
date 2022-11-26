// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import redis from "../../redis";
import { Column } from "../../typings";

type Data = {
  columns: Column[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method not allowed" });
    return;
  }
  const session = await getSession({ req });
  const boardId = req.query.boardId as string;
  if (!session?.user?.email || !boardId) {
    res.status(401).json({ body: "Unauthorized" });
    return;
  }

  const colsRes = await redis.hvals(boardId);
  const columns: Column[] = colsRes.map((col) => JSON.parse(col));

  res.status(200).json({ columns });
}
