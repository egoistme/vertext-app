import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/course';

// 获取所有课程
export async function GET() {
  try {
    await connectToDatabase();
    const courses = await Course.find({}).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// 创建新课程
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // 解析请求体
    const body = await request.json();
    
    // 创建新课程
    const newCourse = new Course({
      title: body.title,
      description: body.description,
      type: body.type,
      sections: body.sections || [],
      author: body.author || 'Anonymous',
      status: body.status || 'draft'
    });
    
    // 保存到数据库
    await newCourse.save();
    
    return NextResponse.json(
      { success: true, message: 'Course created successfully', data: newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create course:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create course',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 