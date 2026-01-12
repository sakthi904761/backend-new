// frontend/src/pages/Teachers/Dashboard.jsx
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { BsPeople, BsBook, BsClipboardCheck, BsCalendarEvent, BsEnvelopePaper } from 'react-icons/bs';
import {
  TeacherDashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
  Header,
  Greeting,
  HeaderActions,
  MetricGrid,
  MetricCard,
  MetricIcon,
  MetricLabel,
  MetricValue,
  PrimaryButton,
  SecondaryButton,
  ClassesTable,
  TableHeader,
  ActivityList,
  ActivityItem
} from "../../styles/DashboardStyles";

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    students: 120,
    classes: 6,
    assignments: 24,
  });

  const [recent, setRecent] = useState([
    { id: 1, text: 'Attendance marked for Class 10-A', time: '2h ago' },
    { id: 2, text: 'Marks uploaded for Mathematics', time: '1 day ago' },
    { id: 3, text: 'New student added to Class 9-B', time: '3 days ago' }
  ]);

  useEffect(() => {
    // Placeholder for data fetching in future
    // Example: axios.get('/api/teacher/dashboard').then(...)
  }, []);

  return (
    <TeacherDashboardContainer>
      <Sidebar />

      <Content>
        <Header>
          <Greeting>
            <h1>Welcome back, <strong>Teacher</strong></h1>
            <p>Here’s what’s happening in your classes today.</p>
          </Greeting>

          <HeaderActions>
            <SecondaryButton as={Link} to="/teacher/events"><BsCalendarEvent /> Events</SecondaryButton>
            <PrimaryButton as={Link} to="/Teachers/send-email"><BsEnvelopePaper /> Send Email</PrimaryButton>
          </HeaderActions>
        </Header>

        <Section>
          <SectionTitle>Key Metrics</SectionTitle>

          <MetricGrid>
            <MetricCard>
              <MetricIcon><BsPeople /></MetricIcon>
              <MetricLabel>Total Students</MetricLabel>
              <MetricValue>{stats.students}</MetricValue>
            </MetricCard>

            <MetricCard>
              <MetricIcon><BsBook /></MetricIcon>
              <MetricLabel>Classes</MetricLabel>
              <MetricValue>{stats.classes}</MetricValue>
            </MetricCard>

            <MetricCard>
              <MetricIcon><BsClipboardCheck /></MetricIcon>
              <MetricLabel>Pending Assignments</MetricLabel>
              <MetricValue>{stats.assignments}</MetricValue>
            </MetricCard>
          </MetricGrid>
        </Section>

        <Section>
          <SectionTitle>My Classes</SectionTitle>
          <p>Manage class lists, attendance, and assignments.</p>

          <ClassesTable>
            <thead>
              <tr>
                <TableHeader>Class</TableHeader>
                <TableHeader>Students</TableHeader>
                <TableHeader>Next Activity</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 - A</td>
                <td>30</td>
                <td>Unit Test - 10 Jan</td>
                <td><PrimaryButton small>Details</PrimaryButton></td>
              </tr>
              <tr>
                <td>9 - B</td>
                <td>28</td>
                <td>Parent Meeting - 15 Jan</td>
                <td><PrimaryButton small>Details</PrimaryButton></td>
              </tr>
            </tbody>
          </ClassesTable>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            {recent.map(item => (
              <ActivityItem key={item.id}>{item.text} <small>{item.time}</small></ActivityItem>
            ))}
          </ActivityList>
        </Section>
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;
