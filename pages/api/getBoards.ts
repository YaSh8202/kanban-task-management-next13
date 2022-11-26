// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import redis from "../../redis";
import { Board } from "../../typings";

type Data = {
  boards: Board[];
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

  if (!session?.user?.email) {
    res.status(401).json({ body: "Unauthorized" });
    return;
  }

  const boardsRes = await redis.hvals(session?.user?.email);
  const boards: Board[] = boardsRes.map((board) => JSON.parse(board));
  res.status(200).json({ boards });
}
