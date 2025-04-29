import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// 定义缓存接口
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 在全局声明缓存
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

// 初始化缓存
let cached: MongooseCache = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

/**
 * 连接到 MongoDB 数据库
 * @returns 连接后的 mongoose 实例
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // 如果已经连接，返回连接
  if (cached.conn) {
    return cached.conn;
  }

  // 如果没有进行中的连接请求，创建一个
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    // 等待连接完成
    const conn = await cached.promise;
    console.log('MongoDB connected successfully');
    cached.conn = conn;
    return conn;
  } catch (e) {
    // 连接失败，清除 promise 以便下次尝试
    cached.promise = null;
    throw e;
  }
}

/**
 * 断开数据库连接
 */
export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('MongoDB disconnected');
  }
} 