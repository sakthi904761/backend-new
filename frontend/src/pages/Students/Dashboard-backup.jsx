// StudentDashboard.js
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { MdAssignment, MdCalendar, MdSchool, MdGrade, MdTrendingUp, MdNotifications, MdBook } from 'react-icons/md';

const StudentDashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 250px);
  padding: 40px 30px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
  background: white;
  padding: 30px 35px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 15px;
  margin: 0;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background: white;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.color || '#667eea'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

const CardIcon = styled.div`
  font-size: 28px;
  color: ${props => props.color || '#667eea'};
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #1f3a57;
  margin-bottom: 8px;
`;

const CardSubtext = styled.p`
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const ActivityList = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: 20px 28px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: background 0.2s ease;

  &:hover {
    background: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  font-size: 20px;
  color: #667eea;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.p`
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 600;
  color: #1f3a57;
`;

const ActivityTime = styled.p`
  margin: 0;
  font-size: 12px;
  color: #9ca3af;
`;

const StudentDashboard = () => {
  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Header>
          <Title>Welcome back, Student</Title>
          <Subtitle>Here's what's happening in your courses today.</Subtitle>
        </Header>

        <Section>
          <CardContainer>
            <Card color="#667eea">
              <CardIcon><BsFileText /></CardIcon>
              <CardTitle>Active Assignments</CardTitle>
              <CardValue>5</CardValue>
              <CardSubtext>Due this week</CardSubtext>
            </Card>

            <Card color="#10b981">
              <CardIcon><BsCalendar /></CardIcon>
              <CardTitle>Attendance Rate</CardTitle>
              <CardValue>95%</CardValue>
              <CardSubtext>Current semester</CardSubtext>
            </Card>

            <Card color="#f59e0b">
              <CardIcon><BsBook /></CardIcon>
              <CardTitle>Current Courses</CardTitle>
              <CardValue>6</CardValue>
              <CardSubtext>Enrolled courses</CardSubtext>
            </Card>

            <Card color="#8b5cf6">
              <CardIcon><BsAward /></CardIcon>
              <CardTitle>GPA</CardTitle>
              <CardValue>3.8</CardValue>
              <CardSubtext>Cumulative</CardSubtext>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            <ActivityItem>
              <ActivityIcon><BsFileText /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Assignment Submitted: Mathematics</ActivityTitle>
                <ActivityTime>2 hours ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>

            <ActivityItem>
              <ActivityIcon><BsCalendar /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>New Class Schedule Posted</ActivityTitle>
                <ActivityTime>1 day ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>

            <ActivityItem>
              <ActivityIcon><BsBook /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Reading List Updated: English Literature</ActivityTitle>
                <ActivityTime>2 days ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>

            <ActivityItem>
              <ActivityIcon><BsAward /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Grade Posted: Physics Quiz</ActivityTitle>
                <ActivityTime>3 days ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          </ActivityList>
        </Section>

        <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          <ActivityList>
            <ActivityItem>
              <ActivityIcon><BsCalendar /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Midterm Exams Begin</ActivityTitle>
                <ActivityTime>January 28, 2026</ActivityTime>
              </ActivityContent>
            </ActivityItem>

            <ActivityItem>
              <ActivityIcon><BsBook /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Science Project Deadline</ActivityTitle>
                <ActivityTime>February 5, 2026</ActivityTime>
              </ActivityContent>
            </ActivityItem>

            <ActivityItem>
              <ActivityIcon><BsFileText /></ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Assignment Submission Window Closes</ActivityTitle>
                <ActivityTime>February 10, 2026</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          </ActivityList>
        </Section>
      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentDashboard;
