import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import AIChat from './components/AIChat';
import CodeReviewPage from './components/CodeReviewPage';

const App: React.FC = () => (
  <Router>
    <div className="flex h-screen">
      {/* 侧边导航 */}
      <nav className="w-1/4 bg-neutral-100 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block px-3 py-2 rounded hover:bg-neutral-200"
            >
              AI 聊天
            </Link>
          </li>
          <li>
            <Link
              to="/codereview"
              className="block px-3 py-2 rounded hover:bg-neutral-200"
            >
              代码审查
            </Link>
          </li>
        </ul>
      </nav>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<AIChat />} />
          <Route path="/codereview" element={<CodeReviewPage />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
