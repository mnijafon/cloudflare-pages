import React, { useState } from 'react';

const CodeReviewPage: React.FC = () => {
  const [codeInput, setCodeInput] = useState('');
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setReviewResult(null);
    if (!codeInput.trim()) {
      setError('请输入要审查的代码');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://my-mastra-app.liujifeng8106.workers.dev/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput }),
      });
      if (!res.ok) throw new Error(`请求失败：${res.status}`);
      const text = await res.text();
      setReviewResult(text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI 代码审查</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full h-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="在这里粘贴你的代码..."
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? '审查中...' : '提交审查'}
        </button>
      </form>
      {reviewResult && (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">审查结果：</h2>
        <pre className="whitespace-pre-wrap text-sm text-neutral-800">{reviewResult}</pre>
      </div>
      )}
    </div>
  );
};

export default CodeReviewPage;
