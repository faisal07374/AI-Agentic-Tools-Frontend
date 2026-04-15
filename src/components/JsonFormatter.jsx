import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Trash2, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFormat = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://ai-agentic-tools-backend.onrender.com/format-json', {
        text: input,
      });
      setOutput(res.data.formatted_json);
    } catch (err) {
      setOutput('❌ Error formatting JSON');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-indigo-400" /> JSON AI Formatter
        </h1>

        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={handleFormat}
            disabled={loading}
            className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-sm flex items-center gap-2"
          >
            {loading ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <Zap size={16} />
            )}
            {loading ? 'Processing...' : 'Format'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh]">
        {/* Input */}
        <div className="bg-slate-900 rounded-2xl p-4 flex flex-col border border-slate-800">
          <h2 className="text-sm text-slate-400 mb-2">Input</h2>
          <textarea
            className="flex-1 bg-transparent outline-none resize-none text-sm font-mono"
            placeholder="Paste raw JSON or messy data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="bg-slate-900 rounded-2xl p-4 flex flex-col border border-slate-800 relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm text-slate-400">Output</h2>

            {output && (
              <button
                onClick={copyToClipboard}
                className="text-xs bg-slate-800 px-3 py-1 rounded flex items-center gap-1"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-auto text-sm font-mono">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-slate-700 rounded w-1/2" />
                <div className="h-3 bg-slate-700 rounded w-2/3" />
                <div className="h-3 bg-slate-700 rounded w-1/3" />
              </div>
            ) : (
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 whitespace-pre-wrap"
              >
                {output || 'Formatted JSON will appear here...'}
              </motion.pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
