import { useState } from 'react';

export default function SocialPostForm() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Friendly');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/ai/social-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ topic, style })
    });
    const data = await res.json();
    setResult(data.post || 'Error');
    setLoading(false);
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">AI Social Post Generator</h2>
      <input
        placeholder="Topic"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        className="border p-2 mr-2"
      />
      <select value={style} onChange={e => setStyle(e.target.value)} className="border p-2 mr-2">
        <option>Friendly</option>
        <option>Professional</option>
        <option>Witty</option>
      </select>
      <button onClick={handleGenerate} className="bg-blue-600 text-white p-2 rounded">
        {loading ? 'Loading...' : 'Generate'}
      </button>
      {result && <div className="bg-gray-100 p-4 mt-4 rounded">{result}</div>}
    </div>
  );
}
