// ChooseUser.jsx
import React from 'react';
import { 
  ChooseUserContainer, 
  UserSection, 
  Title, 
  Button, 
  IconWrapper,
  Description,
  MainTitle,
  Subtitle,
  CardsContainer
} from '../styles/ChooseUserStyles';

const ChooseUser = () => {
  return (
    <ChooseUserContainer>
      <MainTitle>Welcome to School Management System</MainTitle>
      <Subtitle>Select your role to access the dashboard</Subtitle>
      
      <CardsContainer>
        <UserSection color="#f59e0b" secondaryColor="#d97706">
          <IconWrapper color="#f59e0b" secondaryColor="#d97706">
            👨‍💼
          </IconWrapper>
          <Title color="#f59e0b">Admin</Title>
          <Description>Manage the entire school system, users, and settings</Description>
          <Button to="/admin-signIn" color="#f59e0b" secondaryColor="#d97706">
            Login as Admin
          </Button>
        </UserSection>

        <UserSection color="#10b981" secondaryColor="#059669">
          <IconWrapper color="#10b981" secondaryColor="#059669">
            🎓
          </IconWrapper>
          <Title color="#10b981">Student</Title>
          <Description>Access your courses, assignments, and grades</Description>
          <Button to="/student-signIn" color="#10b981" secondaryColor="#059669">
            Login as Student
          </Button>
        </UserSection>

        <UserSection color="#3b82f6" secondaryColor="#2563eb">
          <IconWrapper color="#3b82f6" secondaryColor="#2563eb">
            👨‍🏫
          </IconWrapper>
          <Title color="#3b82f6">Teacher</Title>
          <Description>Manage classes, students, and course materials</Description>
          <Button to="/teacher-signIn" color="#3b82f6" secondaryColor="#2563eb">
            Login as Teacher
          </Button>
        </UserSection>
      </CardsContainer>
    </ChooseUserContainer>
  );
};

export default ChooseUser;