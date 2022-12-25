// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  lazyConnect: true,
  connectTimeout: 15000,
  retryStrategy: (times) => Math.min(times * 30, 1000),
  reconnectOnError(error) {
    const targetErrors = [/READONLY/, /ETIMEDOUT/];
    // logger.warn(`Redis connection error: ${error.message}`, error);
    return targetErrors.some((targetError) => targetError.test(error.message));
  },
});
type Data = {
  data: string;
};
type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.body;
  const session = await getSession({ req });
  if (!session?.user?.email || !id) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const email = session?.user?.email;
  try {
    await redis.hdel(email, id);
    res.status(200).json({ data: "Board deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
