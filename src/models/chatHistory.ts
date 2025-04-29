import mongoose, { Document, Schema, Types } from 'mongoose';

// 定义消息接口
export interface IMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// 定义对话历史接口
export interface IChatHistory extends Document {
  courseId: Types.ObjectId;
  userId: string;
  messages: IMessage[];
  startedAt: Date;
  completedAt?: Date;
  score?: number;
}

// 定义消息 Schema
const MessageSchema = new Schema<IMessage>({
  role: { 
    type: String, 
    enum: ['user', 'ai'], 
    required: true 
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// 定义对话历史 Schema
const ChatHistorySchema = new Schema<IChatHistory>({
  courseId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  userId: { type: String, required: true },
  messages: [MessageSchema],
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  score: { type: Number }
});

// 添加索引提高查询性能
ChatHistorySchema.index({ userId: 1, courseId: 1 });
ChatHistorySchema.index({ startedAt: -1 }); // 按时间倒序查询

// 检查 model 是否已经注册
export const ChatHistory = mongoose.models.ChatHistory ||
  mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema);

export default ChatHistory; 