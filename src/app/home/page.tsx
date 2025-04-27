export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 text-white rounded-md flex items-center justify-center">
            <span className="font-bold">P</span>
          </div>
          <span className="font-medium">Personal</span>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            <li className="px-3">
              <a href="#" className="flex items-center p-2 rounded-md bg-indigo-50 text-indigo-700">
                <span className="text-sm font-medium">Development</span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <span className="text-sm font-medium">Library</span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <span className="text-sm font-medium">Publishing Management</span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <span className="text-sm font-medium">Model Management</span>
              </a>
            </li>
            <li className="px-3">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <span className="text-sm font-medium">Evaluations</span>
              </a>
            </li>
          </ul>
          
          <div className="mt-8 px-3">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Favorites</h3>
            <div className="p-4 text-center text-gray-400 text-sm">
              <p>No favorites yet</p>
              <p>Click the ⭐ button to add content here</p>
            </div>
          </div>
        </nav>
      </div>
      
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-medium">Development</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for projects"
                className="py-2 px-4 pl-10 bg-gray-100 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-1">
              <span>Create</span>
            </button>
          </div>
        </header>
        
        {/* 项目列表 */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 项目卡片 1 */}
            <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">前端老师</h3>
                  <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-teal-500 text-xl">💬</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Agent</p>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <span className="mr-2">•</span>
                  <span>Edited 2024-07-19 10:10</span>
                </div>
              </div>
            </div>
            
            {/* 项目卡片 2 */}
            <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">前端老师</h3>
                  <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-500 text-xl">B</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Agent</p>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <span className="mr-2">•</span>
                  <span>Edited 2024-07-16 10:39</span>
                </div>
              </div>
            </div>
            
            {/* 项目卡片 3 */}
            <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">rebuild</h3>
                  <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-500 text-xl">B</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Agent</p>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <span className="mr-2">•</span>
                  <span>Edited 2024-02-28 18:17</span>
                </div>
              </div>
            </div>
            
            {/* 项目卡片 4 */}
            <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">ai_customer</h3>
                  <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xl">⏹</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Agent</p>
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <span className="mr-2">•</span>
                  <span>Edited 2023-12-27 15:38</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 