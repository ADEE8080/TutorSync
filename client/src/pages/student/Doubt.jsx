import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Doubt = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBfzPUkHjLKBkKJ7xdlK5Pld_KuAexOyTE',
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const answer = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(answer || 'No response generated.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-start pt-28 px-4 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">💬 Ask Your Doubt</h1>

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 space-y-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your academic doubt here..."
          className="w-full h-32 p-4 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow"
        >
          {loading ? 'Thinking...' : 'Get Answer'}
        </button>

        {response && (
          <div className="bg-white text-black p-5 rounded-xl shadow-inner max-h-[60vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">📘 AI Response</h2>
            <div className="prose prose-sm md:prose-base max-w-none">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doubt;
