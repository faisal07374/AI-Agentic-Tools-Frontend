import React, { useState } from 'react';
import Navbar from './components/Header';
import JsonFormatter from './components/JsonFormatter';
import SqlAgent from './components/SqlAgent';
import './App.css';

function App() {
  // State to track which page is currently active
  const [activeTab, setActiveTab] = useState('json');

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ padding: '0 40px' }}>
        <div className="container">
          {activeTab === 'json' ? (
            <JsonFormatter />
          ) : (
            <SqlAgent />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;