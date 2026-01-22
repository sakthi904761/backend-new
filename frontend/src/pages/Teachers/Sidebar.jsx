import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent, BsQuestionSquare, BsChevronLeft, BsChevronRight, BsBoxArrowRight, BsEnvelope } from 'react-icons/bs';
import LogoImg from '../../assets/bg1.png';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width, 250px);
  height: 100vh;
  background: linear-gradient(180deg, #1f2937 0%, #2c3e50 100%);
  color: white;
  overflow-y: auto;
  transition: width 0.28s ease, background 0.28s ease;
  box-shadow: 2px 0 14px rgba(2,6,23,0.08);
`;

const Brand = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  padding: 6px;
`;

const BrandText = styled.div`
  display:flex;
  flex-direction:column;
  line-height:1;
  h3{ margin:0; font-size:16px; font-weight:700; color:#f9fafb }
  span{ font-size:12px; color:rgba(255,255,255,0.72) }
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 8px 6px;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  font-size: 15px;
  color: rgba(255,255,255,0.92);
  border-radius: 8px;
  margin: 6px 8px;
  transition: background-color 0.18s ease, transform 0.12s ease;
  &:hover {
    background: rgba(255,255,255,0.03);
    transform: translateY(-2px);
  }
`;

const NavIcon = styled.div`
  margin-right: 12px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  color: #c7d2fe;
  font-size:18px;
`;

const NavLabel = styled.span`
  flex:1;
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 14px 18px;
  border-top: 1px solid rgba(255,255,255,0.04);
  display:flex;
  gap:10px;
  align-items:center;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.9);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display:flex;
  align-items:center;
  gap:6px;
  &:hover{ background: rgba(255,255,255,0.03) }
`;

const Logout = styled.button`
  background: rgba(255,255,255,0.03);
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:8px;
`;

const ActiveLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display:flex;
  align-items:center;
  width:100%;
  &.active { background: linear-gradient(90deg, rgba(102,126,234,0.14), rgba(118,75,162,0.08)); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02) }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '250px' : '80px');
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(s => !s);

  return (
    <SidebarContainer aria-hidden={false}>
      <Brand>
        <Logo src={LogoImg} alt="App logo" />
        {isOpen && (
          <BrandText>
            <h3>School Portal</h3>
            <span>Teacher</span>
          </BrandText>
        )}
        <div style={{marginLeft:'auto'}}> 
          <ToggleButton onClick={toggleSidebar} aria-label="Toggle sidebar">
            {isOpen ? <BsChevronLeft /> : <BsChevronRight />}
          </ToggleButton>
        </div>
      </Brand>

      <SidebarNav>
        <SidebarNavItem>
          <ActiveLink to="/teacher/dashboard">
            <NavIcon><BsGraphUp /></NavIcon>
            {isOpen && <NavLabel>Dashboard</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/classes">
            <NavIcon><BsPeople /></NavIcon>
            {isOpen && <NavLabel>Classes</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/students">
            <NavIcon><BsPeople /></NavIcon>
            {isOpen && <NavLabel>Students</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>


        <SidebarNavItem>
          <ActiveLink to="/teacher/assignments">
            <NavIcon><BsFileText /></NavIcon>
            {isOpen && <NavLabel>Assignments</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/exams">
            <NavIcon><BsBook /></NavIcon>
            {isOpen && <NavLabel>Exams</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/attendance">
            <NavIcon><BsCalendar /></NavIcon>
            {isOpen && <NavLabel>Attendance</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/communication">
            <NavIcon><BsChatDots /></NavIcon>
            {isOpen && <NavLabel>Announcement</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/events">
            <NavIcon><BsCalendarEvent /></NavIcon>
            {isOpen && <NavLabel>Events & Calendar</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/email">
            <NavIcon><BsEnvelope /></NavIcon>
            {isOpen && <NavLabel>Send Email</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <ActiveLink to="/teacher/settings">
            <NavIcon><BsGear /></NavIcon>
            {isOpen && <NavLabel>Settings & Profile</NavLabel>}
          </ActiveLink>
        </SidebarNavItem>
      </SidebarNav>

      <Footer>
        <Logout title="Sign out" onClick={() => {
            if (!loggingOut) {
              setLoggingOut(true);
              // clear local state
              try {
                localStorage.removeItem('teacherToken');
                localStorage.removeItem('adminToken');
                localStorage.removeItem('user');
                sessionStorage.clear();
              } catch (e) { console.warn(e); }
              setMessage('Signed out — redirecting...');
              setTimeout(() => {
                setLoggingOut(false);
                navigate('/teacher-signIn');
                window.location.reload();
              }, 700);
            }
          }} disabled={loggingOut}>
          <BsBoxArrowRight />
          {isOpen && <span>{loggingOut ? 'Signing out...' : 'Logout'}</span>}
        </Logout>
        <div style={{marginLeft:'auto', color:'rgba(255,255,255,0.6)', fontSize:12, display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
          <div>v1.0</div>
          {message && <div style={{fontSize:11, color:'#cbd5e1', marginTop:4}}>{message}</div>}
        </div>
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;
