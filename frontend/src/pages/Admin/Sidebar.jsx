import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent, BsCreditCard, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import AdminLogo from '../../assets/admin_logo.svg';

// Modern, collapsible admin sidebar with active-link highlighting and tooltips
const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width, 260px);
  background: linear-gradient(180deg, #1f3a57 0%, #213a56 100%);
  color: #ffffff;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: width 240ms ease, box-shadow 240ms ease;
  box-shadow: 2px 0 12px rgba(17,24,39,0.08);
  z-index: 100;

  @media (max-width: 768px) {
    transform: translateX(0);
    position: fixed;
    width: 220px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
`;

const BrandName = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;

const BrandSub = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.75);
`;

const Nav = styled.nav`
  padding: 10px 8px;
  overflow-y: auto;
  flex: 1;
`;

const navItemStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 8px;
  color: rgba(255,255,255,0.92);
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.03);
    transform: translateX(6px);
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 6px;
  margin: 6px 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NavItem = styled.li``;

const NavLinkStyled = styled(Link)`
  ${navItemStyles}
  display: flex;
  align-items: center;

  ${(props) => props.$active && css`
    background: linear-gradient(90deg, rgba(0,123,255,0.12), rgba(0,86,179,0.06));
    box-shadow: inset 3px 0 0 0 rgba(0,123,255,0.95);
    color: #eaf4ff;
    font-weight: 600;
  `}
`;

const IconWrap = styled.div`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
`;

const Label = styled.span`
  font-size: 14px;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tooltip = styled.div`
  position: absolute;
  left: calc(var(--sidebar-width, 260px) + 8px);
  transform: translateY(-50%);
  top: 50%;
  background: rgba(11,21,35,0.96);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.6);
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 120ms ease, transform 120ms ease;
`;

const Footer = styled.div`
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleBtn = styled.button`
  background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  border: 0;
  color: #fff;
  width: 44px;
  height: 38px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease;

  &:hover { transform: translateY(-2px); }
`;

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: <BsGraphUp /> },
  { label: 'Classes', to: '/admin/classes', icon: <BsPeople /> },
  { label: 'Students', to: '/admin/students', icon: <BsPeople /> },
  { label: 'Teachers', to: '/admin/teachers', icon: <BsPerson /> },
  { label: 'Exams', to: '/admin/exams', icon: <BsBook /> },
  { label: 'Attendance', to: '/admin/attendance', icon: <BsCalendar /> },
  { label: 'Library', to: '/admin/library', icon: <BsBook /> },
  { label: 'Student Fees', to: '/admin/studentfees', icon: <BsCreditCard /> },
  { label: 'Announcement', to: '/admin/communication', icon: <BsChatDots /> },
  { label: 'Events', to: '/admin/events', icon: <BsCalendarEvent /> },
  { label: 'Settings', to: '/admin/settings', icon: <BsGear /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '260px' : '80px');
  }, [isOpen]);

  return (
    <SidebarContainer aria-hidden={false}>
      <Header>
        <Logo src={AdminLogo} alt="Admin logo" />
        {isOpen && (
          <Brand>
            <BrandName>Admin Panel</BrandName>
            <BrandSub>Manage school</BrandSub>
          </Brand>
        )}
      </Header>

      <Nav aria-label="Admin navigation">
        <NavList>
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavItem key={item.to}
                onMouseEnter={() => setHovered(item.to)}
                onMouseLeave={() => setHovered(null)}>
                <NavLinkStyled to={item.to} $active={active} title={item.label}>
                  <IconWrap>{item.icon}</IconWrap>
                  {isOpen ? <Label>{item.label}</Label> : null}
                </NavLinkStyled>

                {/* tooltip when collapsed */}
                {!isOpen && hovered === item.to && (
                  <Tooltip>{item.label}</Tooltip>
                )}
              </NavItem>
            );
          })}
        </NavList>
      </Nav>

      <Footer>
        <ToggleBtn
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((s) => !s)}>
          {isOpen ? <BsChevronLeft /> : <BsChevronRight />}
        </ToggleBtn>
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;
