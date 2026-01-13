// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, SignUpButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import { useNavigate } from 'react-router-dom'; 

const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <NavigationLinks>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#docs">Docs</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
          <SignUpButton onClick={() => navigate('/choose-user')}>Request Demo</SignUpButton>
        </ButtonsContainer>
      </Navbar>

      <HomeContainer>
        <SchoolInfo>
          <Title>Student Management System</Title>
          <LoremTextContainer>
            <p>
              Streamline student records, attendance, exams, and fees with an intuitive, secure
              platform built for administrators and teachers. Track performance, generate reports,
              and manage classes with one professional dashboard.
            </p>
          </LoremTextContainer>

          <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }} id="features">
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, minWidth: 180 }}>
              <strong>Student Records</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: 13 }}>Centralized profiles, fast search and bulk-import.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, minWidth: 180 }}>
              <strong>Attendance</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: 13 }}>Daily tracking, summaries and absence alerts.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, minWidth: 180 }}>
              <strong>Exams & Grades</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: 13 }}>Create exams, record marks and view analytics.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 14, borderRadius: 10, minWidth: 180 }}>
              <strong>Fees Management</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: 13 }}>Collection, receipts and financial summaries.</p>
            </div>
          </div>

        </SchoolInfo>
        <SchoolImage src={bg} alt="students illustration" />
      </HomeContainer>
    </>
  );
};

export default Home;