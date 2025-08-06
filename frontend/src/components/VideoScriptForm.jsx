import { useState } from 'react';

export default function VideoScriptForm() {
  const [idea, setIdea] = useState('');
  const [length, setLength] = useState(30);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/ai/video-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ idea, length })
    });
    const data = await res.json();
    setResult(data.script || 'Error');
    setLoading(false);
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">AI Video Script Generator</h2>
      <input
        placeholder="Video Idea"
        value={idea}
        onChange={e => setIdea(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        min={10}
        max={120}
        value={length}
        onChange={e => setLength(e.target.value)}
        className="border p-2 mr-2 w-20"
      />
      <button onClick={handleGenerate} className="bg-blue-600 text-white p-2 rounded">
        {loading ? 'Loading...' : 'Generate'}
      </button>
      {result && <div className="bg-gray-100 p-4 mt-4 rounded">{result}</div>}
    </div>
  );
}
