import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  lazyConnect: true,
  connectTimeout: 15000,
  retryStrategy: (times) => Math.min(times * 30, 1000),
  reconnectOnError(error) {
    const targetErrors = [/READONLY/, /ETIMEDOUT/, /ECONNREFUSED/, /ECONNRESET/];
    // logger.warn(`Redis connection error: ${error.message}`, error);
    return targetErrors.some((targetError) => targetError.test(error.message));
  },
  tls: {
    rejectUnauthorized: false,
  }
});

export default redis;
