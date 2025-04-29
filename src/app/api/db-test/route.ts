import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // 连接数据库
    const mongoose = await connectToDatabase();
    
    // 确保连接存在
    if (!mongoose.connection || !mongoose.connection.db) {
      throw new Error('Database connection not established');
    }
    
    // 获取所有集合
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // 返回成功响应和集合列表
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connected successfully', 
      database: mongoose.connection.db.databaseName,
      collections: collectionNames
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    // 返回错误响应
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 