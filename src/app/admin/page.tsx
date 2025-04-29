'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Course {
  _id: string;
  title: string;
  description: string;
  type: 'training' | 'practice';
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
}

export default function AdminPage() {
  // 状态管理
  const [dbStatus, setDbStatus] = useState<{success: boolean, message: string}>({ success: false, message: 'Checking connection...' });
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'training',
    author: ''
  });
  
  // 加载数据
  useEffect(() => {
    async function loadData() {
      try {
        // 检查数据库连接
        const dbRes = await fetch('/api/db-test');
        const dbData = await dbRes.json();
        setDbStatus({ success: dbData.success, message: dbData.message });
        
        if (dbData.success) {
          // 获取课程列表
          const coursesRes = await fetch('/api/courses');
          const coursesData = await coursesRes.json();
          
          if (coursesData.success) {
            setCourses(coursesData.data);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        setDbStatus({ success: false, message: 'Failed to connect to database' });
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  // 处理表单提交
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // 重置表单
        setFormData({
          title: '',
          description: '',
          type: 'training',
          author: ''
        });
        
        // 重新获取课程
        const coursesRes = await fetch('/api/courses');
        const coursesData = await coursesRes.json();
        
        if (coursesData.success) {
          setCourses(coursesData.data);
        }
        
        alert('课程创建成功！');
      } else {
        alert(`创建失败: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('创建课程时发生错误');
    } finally {
      setLoading(false);
    }
  }
  
  // 处理表单输入变化
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">数据库管理</h1>
      
      {/* 数据库连接状态 */}
      <div className={`p-4 mb-6 rounded-md ${dbStatus.success ? 'bg-green-100' : 'bg-red-100'}`}>
        <h2 className="font-semibold">数据库状态</h2>
        <p>{dbStatus.message}</p>
      </div>
      
      {/* 创建课程表单 */}
      <div className="bg-white p-6 rounded-md shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">创建新课程</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">课程标题</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">描述</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">类型</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="training">培训课程</option>
                <option value="practice">对练课程</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">作者</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '处理中...' : '创建课程'}
          </button>
        </form>
      </div>
      
      {/* 课程列表 */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">课程列表</h2>
        
        {loading ? (
          <p>加载中...</p>
        ) : courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">标题</th>
                  <th className="px-4 py-2 text-left">类型</th>
                  <th className="px-4 py-2 text-left">状态</th>
                  <th className="px-4 py-2 text-left">作者</th>
                  <th className="px-4 py-2 text-left">创建时间</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id} className="border-b">
                    <td className="px-4 py-2">{course.title}</td>
                    <td className="px-4 py-2">{course.type === 'training' ? '培训' : '对练'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-4 py-2">{course.author}</td>
                    <td className="px-4 py-2">{new Date(course.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>暂无课程数据</p>
        )}
      </div>
    </div>
  );
} 