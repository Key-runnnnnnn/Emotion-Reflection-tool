import { useState, useRef, useEffect } from 'react';
import './App.css';
import React from 'react';

const EMOJI_MAP: Record<string, string> = {
  happy: '😄',
  joy: '😁',
  sad: '😢',
  angry: '😡',
  fear: '😱',
  anxious: '😰',
  surprised: '😲',
  disgust: '🤢',
  confused: '😕',
  love: '😍',
  calm: '😌',
  neutral: '😐',
  excited: '🤩',
  bored: '🥱',
  tired: '😴',
  embarrassed: '😳',
  proud: '😎',
  hopeful: '🤞',
  disappointed: '😞',
  grateful: '🙏',
  frustrated: '😤',
  lonely: '🥺',
  shame: '😳',
  guilt: '😔',
  relieved: '😮‍💨',
  optimistic: '😊',
  pessimistic: '🙁',
  nervous: '😬',
};

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) {
      setCardVisible(true);
    } else {
      setCardVisible(false);
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('https://emotion-reflection-back-1.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const emotionEmoji = result?.emotion
    ? EMOJI_MAP[result.emotion.toLowerCase()] || '📝'
    : '📝';

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Full-viewport animated gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient-x" />
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl p-6 backdrop-blur-md animate-fade-in-up">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
          Emotion Reflection Tool
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            {/* Autosizing textarea */}
            <textarea
              className={`resize-none border-2 rounded-lg w-full p-2 pt-2 text-base focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 ${focused ? 'border-pink-400' : 'border-gray-300'} bg-white/90`}
              style={{
                minHeight: 90,
                height: 'auto',
                overflow: 'hidden',
              }}
              value={text} 
              placeholder={(!focused && !text) ? "How are you feeling today?" : ""}
              onChange={e => {
                setText(e.target.value);
                const ta = e.target as HTMLTextAreaElement;
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
              }}
              onInput={e => {
                const ta = e.currentTarget;
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
              maxLength={200}
              disabled={loading}
              rows={1}
            />
            <span className="absolute bottom-2 right-4 text-xs text-gray-400">{text.length}/200</span>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-2 rounded-lg shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={loading || !text.trim()}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {loading ? 'Analyzing...' : 'Reflect'}
          </button>
        </form>
        {error && (
          <div className="mt-5 text-red-600 text-center animate-shake">{error}</div>
        )}
        {result && (
          <div
            ref={cardRef}
            className={`mt-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-pink-200 rounded-xl p-6 shadow-lg flex flex-col items-center gap-2 transition-all duration-500 ${cardVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
            style={{ minHeight: 110 }}
          >
            <div className="text-5xl mb-2 animate-pop">{emotionEmoji}</div>
            <div className="text-xl font-semibold text-pink-600 mb-1">{result.emotion}</div>
            <div className="text-gray-700">Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(0)}%</span></div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-gray-400 text-xs text-center select-none drop-shadow-sm">&copy; {new Date().getFullYear()} Emotion Reflection Tool</footer>
    </div>
  );
}

export default App;
