import React, { useState } from 'react';
import './AIChat.css'; // 样式文件将在后面提供

// 消息类型定义
type Message = {
    sender: 'user' | 'ai';
    content: string;
};

const AIChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'ai',
            content: '你好！我是AI助手，有什么可以帮助你的吗？'
        }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    // 模拟AI回复
    const aiResponses = [
        "我理解你的问题，让我思考一下...",
        "这是一个很好的问题，根据我的分析...",
        "我可以帮你解决这个问题，首先我们需要...",
        "有趣的问题！让我从不同角度为你解答...",
        "这个问题比较复杂，我将分步骤为你解释..."
    ];

    // 处理用户提交消息
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const userMessage = userInput;
        setMessages(prev => [...prev, { sender: 'user', content: userMessage }]);
        setUserInput('');
        setIsThinking(true);

        try {
            const response = await fetch('https://cloudflare-work.liujifeng8106.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }),
            });

            const text = await response.text(); // Worker 返回的是纯文本
            setMessages(prev => [...prev, { sender: 'ai', content: text }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', content: '请求失败，请稍后重试。' }]);
            console.error('AI 请求失败：', error);
        } finally {
            setIsThinking(false);
        }
    };


    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* 页面标题 */}
            <header className="mb-8 text-center">
                <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-neutral-900 mb-2">
                    <i className="fa fa-robot text-primary mr-2"></i>AI Chat
                </h1>
                <p className="text-neutral-700 text-lg">简单智能的对话助手</p>
            </header>

            {/* 聊天容器 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                {/* 聊天头部 */}
                <div className="bg-neutral-900 text-white p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                        <i className="fa fa-robot"></i>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">AI助手</h2>
                        <p className="text-xs text-neutral-300">在线 · 随时为您服务</p>
                    </div>
                </div>

                {/* 聊天内容区域 */}
                <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-neutral-100">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.sender === 'user' ? (
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white shrink-0">
                                    <i className="fa fa-user text-sm"></i>
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                    <i className="fa fa-robot text-sm"></i>
                                </div>
                            )}

                            <div className={`p-4 max-w-[80%] ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                                <p>{msg.content}</p>
                            </div>

                            {msg.sender === 'user' ? (
                                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white shrink-0">
                                    <i className="fa fa-user text-sm"></i>
                                </div>
                            ) : null}
                        </div>
                    ))}

                    {/* 正在思考状态 */}
                    {isThinking && (
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                <i className="fa fa-robot text-sm"></i>
                            </div>
                            <div className="chat-bubble-ai p-4 max-w-[80%]">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse-slow"></div>
                                    <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 输入区域 */}
                <div className="p-4 border-t border-neutral-200">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="输入问题..."
                            className="flex-1 px-4 py-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <i className="fa fa-paper-plane mr-2"></i> 发送
                        </button>
                    </form>
                </div>
            </div>

            {/* 页脚 */}
            <footer className="text-center text-neutral-500 text-sm">
                <p>© 2023 AI Chat 助手 | 简单、智能的对话体验</p>
            </footer>
        </div>
    );
};

export default AIChat;