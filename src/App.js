import React from 'react';
import JsonFormatter from './components/JsonFormatter';
import SqlAgent from './components/SqlAgent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#1e293b', padding: '20px', color: 'white', marginBottom: '20px' }}>
        <h1>AI Agent Dashboard</h1>
      </header>
      <main>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
          <div>
            <JsonFormatter />
          </div>
          <div>
            <SqlAgent />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
