import React, { useState } from 'react';
import axios from 'axios';
import { RefreshCw, Play, Check, Copy } from 'lucide-react';

export default function SqlAgent() {
  const [question, setQuestion] = useState('Who are the employees with salary > 45000?');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:8000/sql-query', { question });
      setResult(res.data.result || res.data);
    } catch (err) {
      setError(err?.response?.data || err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    const text = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="sql-agent-card" style={{ background: '#0f172a', color: 'white', padding: 16, borderRadius: 12, border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>SQL Agent</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setQuestion(''); setResult(null); setError(null); }} style={{ background: '#111827', color: 'white', padding: '6px 10px', borderRadius: 8, border: 'none' }}>
            Clear
          </button>
          <button onClick={runQuery} disabled={loading} style={{ background: '#6366f1', color: 'white', padding: '6px 10px', borderRadius: 8, border: 'none', display: 'flex', gap: 8, alignItems: 'center' }}>
            {loading ? <RefreshCw className="spin" /> : <Play size={14} />}
            {loading ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} style={{ width: '100%', background: 'transparent', color: 'white', border: '1px solid #0b1220', padding: 8, borderRadius: 8, fontFamily: 'monospace', marginBottom: 12 }} />

      <div style={{ minHeight: 120, maxHeight: 300, overflow: 'auto', background: '#071025', padding: 12, borderRadius: 8 }}>
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Executing query...</div>
        ) : error ? (
          <pre style={{ color: '#fb7185', whiteSpace: 'pre-wrap' }}>{JSON.stringify(error, null, 2)}</pre>
        ) : result ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ color: '#c7d2fe' }}>Result</strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={copy} style={{ background: '#0b1220', color: 'white', borderRadius: 8, padding: '6px 8px', border: 'none' }}>
                  {copied ? <Check /> : <Copy />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <pre style={{ color: '#a7f3d0', whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        ) : (
          <div style={{ color: '#94a3b8' }}>No result yet. Run the agent to see results here.</div>
        )}
      </div>
    </div>
  );
}
