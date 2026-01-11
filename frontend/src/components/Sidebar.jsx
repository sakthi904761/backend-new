import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '250px' : '80px');
  }, []);

  const toggle = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    document.documentElement.style.setProperty('--sidebar-width', newOpen ? '250px' : '80px');
  };

  return (
    <div
      className="sidebar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isOpen ? '250px' : '80px',
        background: '#2c3e50',
        color: '#fff',
        paddingTop: '60px',
        overflowY: 'auto',
        zIndex: 100,
        transition: 'width 0.3s ease',
      }}
    >
      <h3 style={{ textAlign: 'center', margin: 0 }}>
        Admin Panel
      </h3>
      <button
        onClick={toggle}
        style={{
          position: 'absolute',
          top: 20,
          right: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#34495e',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ▲
      </button>
    </div>
  );
};

export default Sidebar;
