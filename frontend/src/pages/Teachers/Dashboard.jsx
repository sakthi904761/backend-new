// frontend/src/pages/TeacherDashboard.jsx
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  TeacherDashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from "../../styles/DashboardStyles";

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    subjects: 0,
  });

  useEffect(() => {
    // 👉 Later replace with real API
    // Example: axios.get("/api/teacher/dashboard")
    setStats({
      students: 120,
      classes: 6,
      subjects: 3,
    });
  }, []);

  const emailButtonStyle = {
    display: "inline-block",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "600",
    textDecoration: "none",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginTop: "10px"
  };

  return (
    <TeacherDashboardContainer>
      <Sidebar />

      <Content>
        {/* ===== Overview Section ===== */}
        <Section>
          <SectionTitle>Teacher Overview</SectionTitle>
          
          <Link 
            to="/Teachers/send-email"
            style={emailButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            📧 Send Email
          </Link>

          <CardContainer>
            <Card>
              <CardTitle>Total Students</CardTitle>
              <CardContent>{stats.students}</CardContent>
            </Card>

            <Card>
              <CardTitle>Total Classes</CardTitle>
              <CardContent>{stats.classes}</CardContent>
            </Card>

            <Card>
              <CardTitle>Subjects Assigned</CardTitle>
              <CardContent>{stats.subjects}</CardContent>
            </Card>
          </CardContainer>
        </Section>

        {/* ===== My Classes Section ===== */}
        <Section>
          <SectionTitle>My Classes</SectionTitle>
          <p>View and manage your assigned classes.</p>
        </Section>

        {/* ===== Recent Activity ===== */}
        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ul>
            <li>Attendance marked for Class 10-A</li>
            <li>Marks uploaded for Mathematics</li>
            <li>New student added to Class 9-B</li>
          </ul>
        </Section>

        {/* ===== Upcoming Events ===== */}
        <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          <ul>
            <li>📅 Unit Test — 10 Jan</li>
            <li>📅 Parent Meeting — 15 Jan</li>
          </ul>
        </Section>
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;