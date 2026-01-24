import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  const features = [
    {
      title: 'Student Details',
      icon: '👨‍🎓',
      color: '#667eea',
      menuItems: [
        { label: 'View Dashboard', icon: '📊', path: '#' },
        { label: 'My Assignments', icon: '📝', path: '#' },
        { label: 'Announcement', icon: '📢', path: '#' },
        { label: 'My Profile', icon: '👤', path: '#' }
      ]
    },
    {
      title: 'Goals & Objectives',
      icon: '🎓',
      color: '#764ba2',
      menuItems: [
        { label: 'Academic Goals', icon: '🎯', path: '#' },
        { label: 'Performance Report', icon: '📈', path: '#' },
        { label: 'Learning Path', icon: '🛤️', path: '#' },
        { label: 'Progress Tracker', icon: '✅', path: '#' }
      ]
    },
    {
      title: 'Future Technology',
      icon: '🚀',
      color: '#f093fb',
      menuItems: [
        { label: 'Tech Courses', icon: '💻', path: '#' },
        { label: 'Certifications', icon: '🏆', path: '#' },
        { label: 'Resources', icon: '📚', path: '#' },
        { label: 'Career Guidance', icon: '🎯', path: '#' }
      ]
    },
    {
      title: 'About Us',
      icon: '⚙️',
      color: '#4facfe',
      menuItems: [
        { label: 'School Mission', icon: '🏫', path: '#' },
        { label: 'Our Team', icon: '👥', path: '#' },
        { label: 'Contact Us', icon: '📞', path: '#' },
        { label: 'Settings', icon: '⚙️', path: '#' }
      ]
    }
  ];

  return (
    <>
      <div className="home-wrapper">
        <div className="home-container">
          {/* Left Panel */}
          <div className="left-panel">
            <div className="left-panel-content">
              <div className="student-icon">👨‍💼</div>
              <h1 className="system-title">Student<br />Management<br />System</h1>
              <p className="system-description">
                Streamline student records, attendance, exams, and fees with an intuitive, secure platform
              </p>
              <button className="cta-button" onClick={handleLoginClick}>
                Get Started Now
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <div className="welcome-section">
              <h2 className="welcome-title">Welcome To School System</h2>
            </div>

            {/* Feature Cards */}
            <div className="features-container">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card"
                  onMouseEnter={() => setActiveMenu(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="card-icon-wrapper" style={{ borderColor: feature.color }}>
                    <span className="card-icon">{feature.icon}</span>
                  </div>
                  <button 
                    className="feature-button"
                    style={{ backgroundColor: feature.color }}
                    onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                  >
                    {feature.title}
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === index && (
                    <div className="dropdown-menu" style={{ borderTopColor: feature.color }}>
                      <div className="dropdown-header" style={{ color: feature.color }}>
                        <strong>{feature.title} Options</strong>
                      </div>
                      <div className="menu-items">
                        {feature.menuItems.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            className="menu-item"
                            onClick={() => {
                              if (item.path && item.path !== '#') {
                                navigate(item.path);
                              }
                              setActiveMenu(null);
                            }}
                            style={{ 
                              borderLeftColor: feature.color,
                              '--hover-color': feature.color
                            }}
                          >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-label">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Teachers</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;