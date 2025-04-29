import mongoose, { Document, Schema, Types } from 'mongoose';

// 定义用户进度接口
export interface IUserProgress extends Document {
  userId: string;
  courseId: Types.ObjectId;
  progress: number; // 0-100 表示完成百分比
  completedSections: Types.ObjectId[];
  performance: {
    scores: number[];
    averageScore: number;
  };
  lastAccessedAt: Date;
}

// 定义用户进度 Schema
const UserProgressSchema = new Schema<IUserProgress>({
  userId: { type: String, required: true },
  courseId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  progress: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100 
  },
  completedSections: [{ 
    type: Schema.Types.ObjectId 
  }],
  performance: {
    scores: [{ type: Number }],
    averageScore: { 
      type: Number, 
      default: 0 
    }
  },
  lastAccessedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 添加复合索引，提高查询效率
UserProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// 添加更新平均分的方法
UserProgressSchema.methods.updateAverageScore = function() {
  const progress = this as IUserProgress;
  const scores = progress.performance.scores;
  
  if (scores.length > 0) {
    const sum = scores.reduce((a, b) => a + b, 0);
    progress.performance.averageScore = parseFloat((sum / scores.length).toFixed(2));
  } else {
    progress.performance.averageScore = 0;
  }
  
  return progress.save();
};

// 检查 model 是否已经注册
export const UserProgress = mongoose.models.UserProgress || 
  mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);

export default UserProgress; 