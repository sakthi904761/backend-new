import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom'; 
import { MdDashboard, MdAssignment, MdNotifications, MdPerson, MdLogout, MdSchool, MdEmojiEvents, MdLibraryBooks, MdAutoGraph } from 'react-icons/md';
import { IoMenu, IoClose } from 'react-icons/io5';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width, 270px);
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 200;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const SidebarHeader = styled.div`
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LogoContainer = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  flex-grow: 1;
  min-width: 0;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease;
  }

  p {
    margin: 2px 0 0 0;
    font-size: 11px;
    opacity: 0.8;
    white-space: nowrap;
    opacity: ${props => props.isOpen ? '0.8' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 15px 0;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  margin: 0 10px 5px 10px;
  transition: all 0.3s ease;
  position: relative;

  a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    text-decoration: none;
    color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
    font-size: 15px;
    font-weight: 500;
    gap: 14px;
    background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent'};
    border-left: 3px solid ${props => props.isActive ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
    padding-left: 13px;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-left-color: rgba(255, 255, 255, 0.8);
    }

    svg {
      min-width: 22px;
      width: 22px;
      height: 22px;
      transition: all 0.3s ease;
    }

    span {
      white-space: nowrap;
      opacity: ${props => props.isOpen ? '1' : '0'};
      transition: opacity 0.3s ease;
      overflow: hidden;
    }
  }
`;

const SectionDivider = styled.div`
  margin: 20px 10px;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
`;

const SectionLabel = styled.p`
  margin: 20px 16px 8px 16px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 700;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: opacity 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 30px;
  right: -15px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 3px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 201;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    document.documentElement.style.setProperty('--sidebar-width', newOpen ? '270px' : '80px');
  };

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentId');
    window.location.href = '/student-signIn';
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '270px' : '80px');
  }, [isOpen]);

  const menuItems = [
    { path: '/student/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
    { path: '/student/assignments', icon: <MdAssignment />, label: 'Assignments' },
    { path: '/student/exams', icon: <MdSchool />, label: 'Exams' },
    { path: '/student/attendance', icon: <MdEmojiEvents />, label: 'Attendance' },
    { path: '/student/performance', icon: <MdAutoGraph />, label: 'Performance' },
    { path: '/student/library', icon: <MdLibraryBooks />, label: 'Library' },
    { path: '/student/communication', icon: <MdNotifications />, label: 'Announcements' },
    { path: '/student/settings', icon: <MdPerson />, label: 'Profile' },
  ];

  return (
    <SidebarContainer>
      <SidebarHeader>
        <LogoContainer>📚</LogoContainer>
        <HeaderText isOpen={isOpen}>
          <h3>EduTrack</h3>
          <p>Student Portal</p>
        </HeaderText>
      </SidebarHeader>

      <SectionLabel isOpen={isOpen}>Menu</SectionLabel>
      <SidebarNav>
        {menuItems.map((item) => (
          <SidebarNavItem key={item.path} isActive={isActive(item.path)} isOpen={isOpen}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarNavItem>
        ))}
      </SidebarNav>

      <SectionDivider />

      <FooterSection>
        <SidebarNavItem isOpen={isOpen}>
          <Link to="/student-signIn" onClick={handleLogout}>
            <MdLogout />
            <span>Logout</span>
          </Link>
        </SidebarNavItem>
      </FooterSection>

      <ToggleButton onClick={toggleSidebar} title="Toggle Sidebar">
        {isOpen ? <IoClose /> : <IoMenu />}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
