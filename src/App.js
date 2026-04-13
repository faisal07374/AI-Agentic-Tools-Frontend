import React from 'react';
import JsonFormatter from './components/JsonFormatter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#1e293b', padding: '20px', color: 'white', marginBottom: '20px' }}>
        <h1>AI Agent Dashboard</h1>
      </header>
      <main>
        <JsonFormatter />
      </main>
    </div>
  );
}

export default App;
