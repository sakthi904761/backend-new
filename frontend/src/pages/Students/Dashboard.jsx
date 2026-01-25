// StudentDashboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { MdAssignment, MdEventNote, MdSchool, MdGrade, MdTrendingUp, MdNotifications, MdBook, MdAccessTime } from 'react-icons/md';

const StudentDashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 270px);
  padding: 40px 35px;
  transition: margin-left 0.3s ease;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const QuickStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid ${props => props.color || '#667eea'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: ${props => props.color || '#667eea'};
    opacity: 0.05;
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 36px;
  color: ${props => props.color || '#667eea'};
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

const StatLabel = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

const StatValue = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #1f3a57;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
`;

const StatDescription = styled.p`
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #667eea;
  }
`;

const ViewAllButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ActivityList = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: background 0.2s ease;

  &:hover {
    background: #fafbfc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.bgColor || '#e8eaf6'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${props => props.color || '#667eea'};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.p`
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 600;
  color: #1f3a57;
`;

const ActivityDescription = styled.p`
  margin: 0 0 4px 0;
  font-size: 13px;
  color: #6b7280;
`;

const ActivityTime = styled.p`
  margin: 0;
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #9ca3af;

  svg {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const StudentDashboard = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Header>
          <Title>Welcome back! 👋</Title>
          <Subtitle>Here's your academic overview for this semester. Keep up the great work!</Subtitle>
        </Header>

        {/* Quick Stats Section */}
        <Section>
          <QuickStatsContainer>
            <StatCard color="#667eea">
              <StatIcon><MdAssignment /></StatIcon>
              <StatLabel>Active Assignments</StatLabel>
              <StatValue>5</StatValue>
              <StatDescription>Due this week</StatDescription>
            </StatCard>

            <StatCard color="#10b981">
              <StatIcon><MdEventNote /></StatIcon>
              <StatLabel>Attendance Rate</StatLabel>
              <StatValue>95%</StatValue>
              <StatDescription>Current semester</StatDescription>
            </StatCard>

            <StatCard color="#f59e0b">
              <StatIcon><MdSchool /></StatIcon>
              <StatLabel>Enrolled Courses</StatLabel>
              <StatValue>6</StatValue>
              <StatDescription>Active courses</StatDescription>
            </StatCard>

            <StatCard color="#8b5cf6">
              <StatIcon><MdGrade /></StatIcon>
              <StatLabel>Current GPA</StatLabel>
              <StatValue>3.8</StatValue>
              <StatDescription>Cumulative</StatDescription>
            </StatCard>
          </QuickStatsContainer>
        </Section>

        {/* Main Content Grid */}
        <GridContainer>
          {/* Recent Activity */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <MdNotifications /> Recent Activity
              </SectionTitle>
              <ViewAllButton onClick={() => toggleSection('activity')}>View All</ViewAllButton>
            </SectionHeader>
            <ActivityList>
              <ActivityItem>
                <ActivityIconBox color="#667eea" bgColor="#e8eaf6">
                  <MdAssignment />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Assignment Submitted: Mathematics</ActivityTitle>
                  <ActivityDescription>Calculus Chapter 5 exercises submitted</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> 2 hours ago
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIconBox color="#10b981" bgColor="#d1fae5">
                  <MdEventNote />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Class Schedule Updated</ActivityTitle>
                  <ActivityDescription>Physics lab rescheduled to Friday 2 PM</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> 1 day ago
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIconBox color="#f59e0b" bgColor="#fef3c7">
                  <MdBook />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Reading List Updated: English Literature</ActivityTitle>
                  <ActivityDescription>3 new recommended books added</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> 2 days ago
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIconBox color="#8b5cf6" bgColor="#f3e8ff">
                  <MdGrade />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Grade Posted: Physics Quiz</ActivityTitle>
                  <ActivityDescription>Score: 92/100 - Excellent performance!</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> 3 days ago
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </ActivityList>
          </Section>

          {/* Upcoming Events */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <MdEventNote /> Upcoming Events
              </SectionTitle>
              <ViewAllButton onClick={() => toggleSection('events')}>View All</ViewAllButton>
            </SectionHeader>
            <ActivityList>
              <ActivityItem>
                <ActivityIconBox color="#667eea" bgColor="#e8eaf6">
                  <MdSchool />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Midterm Exams Begin</ActivityTitle>
                  <ActivityDescription>All courses across campus</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> January 28, 2026
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIconBox color="#10b981" bgColor="#d1fae5">
                  <MdAssignment />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Science Project Deadline</ActivityTitle>
                  <ActivityDescription>Final submission for Semester Project</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> February 5, 2026
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIconBox color="#f59e0b" bgColor="#fef3c7">
                  <MdBook />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Assignment Submission Window Closes</ActivityTitle>
                  <ActivityDescription>Final submission deadline for all pending assignments</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> February 10, 2026
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIconBox color="#8b5cf6" bgColor="#f3e8ff">
                  <MdEventNote />
                </ActivityIconBox>
                <ActivityContent>
                  <ActivityTitle>Final Exams Schedule Released</ActivityTitle>
                  <ActivityDescription>Check your portal for detailed exam schedule</ActivityDescription>
                  <ActivityTime>
                    <MdAccessTime size={12} /> February 20, 2026
                  </ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </ActivityList>
          </Section>
        </GridContainer>

        {/* Performance Overview */}
        <Section>
          <SectionTitle>
            <MdTrendingUp /> Performance Overview
          </SectionTitle>
          <ChartContainer>
            <p style={{ textAlign: 'center', color: '#9ca3af', margin: '40px 0' }}>
              📊 Grade distribution and performance analytics coming soon...
            </p>
          </ChartContainer>
        </Section>
      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentDashboard;
