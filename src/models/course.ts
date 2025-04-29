import mongoose, { Document, Schema } from 'mongoose';

// 定义课程章节接口
export interface ISection {
  title: string;
  content: string;
  order: number;
  aiPrompts?: string[];
}

// 定义课程内容接口
export interface ICourse extends Document {
  title: string;
  description: string;
  type: 'training' | 'practice';
  sections: ISection[];
  author: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

// 定义章节 Schema
const SectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
  aiPrompts: [{ type: String }]
});

// 定义课程 Schema
const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['training', 'practice'], 
      required: true 
    },
    sections: [SectionSchema],
    author: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['draft', 'published'], 
      default: 'draft' 
    }
  },
  { timestamps: true } // 自动添加 createdAt 和 updatedAt 字段
);

// 检查 model 是否已经注册，避免在开发环境下热重载时重复注册
export const Course = mongoose.models.Course || 
  mongoose.model<ICourse>('Course', CourseSchema);

export default Course; 