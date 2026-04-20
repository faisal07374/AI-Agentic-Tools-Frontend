import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'json', label: 'JSON Formatter' },
    { id: 'sql', label: 'SQL Agent' },
  ];

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>AI Agent Dashboard</h1>
      <div style={styles.buttonGroup}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              ...styles.navButton,
              borderBottom: activeTab === item.id ? '3px solid #38bdf8' : '3px solid transparent',
              color: activeTab === item.id ? '#38bdf8' : '#cbd5e1',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    backgroundColor: '#1e293b',
    color: 'white',
    height: '70px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  logo: {
    fontSize: '1.5rem',
    margin: 0,
    fontWeight: '600'
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    height: '100%'
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '0 10px',
  }
};

export default Navbar;