import React, { useState } from 'react';
import { 
  Copy, 
  RefreshCw, 
  Trash2, 
  FileJson, 
  Share2, 
  Save, 
  Check, 
  Printer, 
  X, 
  Maximize2 
} from 'lucide-react';
import axios from 'axios';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to load sample data
  const handleSampleData = () => {
    const sample = {
      user: "Ahmad",
      role: "MERN Stack Developer",
      location: "Pakistan",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      projects: ["AI Study Agent", "Mazanoo", "StreetAura"],
      active: true
    };
    setInput(JSON.stringify(sample, null, 0)); // Stringify without formatting to show the 'messy' input
  };

  const handleFormat = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://ai-agentic-tools-backend.onrender.com/format-json', {
        text: input,
      });
      setOutput(res.data.formatted_json);
    } catch (err) {
      setOutput('❌ Error formatting JSON. Please check your syntax.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div style={styles.container}>
      {/* Top Header Bar */}
      <div style={styles.topBar}>
        <div style={styles.toolTitle}>
          <FileJson size={18} />
          <span>JSON AI Formatter</span>
        </div>
        <div style={styles.topIcons}>
          {/* Sample Button Trigger */}
          <span style={styles.sampleText} onClick={handleSampleData}>Sample</span>
          
          <Share2 size={16} style={styles.icon} />
          <Save size={16} style={styles.icon} />
          <Check size={16} style={styles.icon} />
          <Printer size={16} style={styles.icon} />
          <X size={16} style={styles.icon} onClick={clearAll} />
          <Copy size={16} style={styles.icon} onClick={() => navigator.clipboard.writeText(output)} />
          <Maximize2 size={16} style={styles.icon} />
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Left Editor (Input) */}
        <div style={styles.editorWrapper}>
          <div style={styles.lineNumberGutter}>1</div>
          <textarea
            style={styles.textArea}
            placeholder="Paste raw JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Center Controls */}
        <div style={styles.sidebar}>
          <button style={styles.mainBtn} onClick={handleFormat} disabled={loading}>
            {loading ? 'Validating...' : 'Validate'}
          </button>

          <select style={styles.select}>
            <option>2 Tab Space</option>
            <option>4 Tab Space</option>
          </select>

          <button style={styles.mainBtn} onClick={handleFormat}>
            Format / Beautify
          </button>
          
          <button style={styles.mainBtn}>
            Minify / Compact
          </button>

          <button style={styles.mainBtn}>
            Convert JSON to ▾
          </button>

          <button style={styles.mainBtn} onClick={() => {
            if(!output) return;
            const element = document.createElement("a");
            const file = new Blob([output], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "data.json";
            document.body.appendChild(element);
            element.click();
          }}>
            Download
          </button>

          <div style={styles.footerLabel}>JSON Full Form</div>
        </div>

        {/* Right Editor (Output) */}
        <div style={styles.editorWrapper}>
          <div style={styles.lineNumberGutter}>1</div>
          <pre style={styles.outputArea}>
            {loading ? "Formatting..." : output || ""}
          </pre>
          <div style={styles.statusFooter}>
            Ln: 1  Col: 1
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1e293b',
    fontFamily: 'sans-serif',
    overflow: 'hidden'
  },
  topBar: {
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
    color: 'white',
    fontSize: '14px',
  },
  toolTitle: { display: 'flex', alignItems: 'center', gap: '8px' },
  topIcons: { display: 'flex', gap: '15px', alignItems: 'center' },
  sampleText: { 
    textDecoration: 'underline', 
    cursor: 'pointer',
    marginRight: '10px'
  },
  icon: { cursor: 'pointer', opacity: 0.9 },
  mainLayout: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 220px 1fr',
    padding: '0 10px 10px 10px',
    gap: '10px',
  },
  editorWrapper: {
    backgroundColor: 'white',
    display: 'flex',
    position: 'relative',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  lineNumberGutter: {
    width: '40px',
    backgroundColor: '#f0f0f0',
    borderRight: '1px solid #ddd',
    textAlign: 'center',
    paddingTop: '10px',
    color: '#999',
    fontSize: '13px',
    fontFamily: 'monospace'
  },
  textArea: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '10px',
    fontSize: '14px',
    fontFamily: 'monospace',
    resize: 'none',
  },
  outputArea: {
    flex: 1,
    margin: 0,
    padding: '10px',
    fontSize: '14px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    overflowY: 'auto',
    color: '#333',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingTop: '20px',
  },
  mainBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '15px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    outline: 'none'
  },
  footerLabel: {
    color: 'white',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: '40px',
    fontSize: '14px',
  },
  statusFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: '40px',
    backgroundColor: '#eee',
    padding: '2px 10px',
    fontSize: '12px',
    color: '#666',
    borderTop: '1px solid #ddd',
  }
};