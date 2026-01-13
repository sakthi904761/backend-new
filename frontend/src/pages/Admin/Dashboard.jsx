// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import EventCalendar from './EventCalender';
import Announcement from './Announcement';
import Performance from './Performance';
import { api } from '../../services/api';
import {
  AdminDashboardContainer,
  Content,
  TopContent,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
  TopBar,
  TopBarLeft,
  TopBarRight,
  SearchInput,
  Avatar,
} from '../../styles/DashboardStyles';

import AdminLogo from '../../assets/admin_logo.svg';

const AdminDashboard = () => {
  // sidebar width is controlled via CSS variable set by Sidebar component
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [studentFees, setStudentFees] = useState([]);
  const [totalFeesCollected, setTotalFeesCollected] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({ present: 0, absent: 0, apology: 0 });
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
    fetchStudentFees();
    fetchAttendance();
    fetchExams();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await api.get('/api/v1/performance/getall');
      setStudentPerformance(response.data.performance || []);
    } catch (error) {
      console.error('Error fetching student performance:', error);
    }
  };

  const fetchStudentFees = async () => {
    try {
      const response = await api.get('/api/v1/studentfees/getall');
      const fees = response.data.studentFees || [];
      setStudentFees(fees);
      
      // Calculate total fees collected
      const total = fees.reduce((sum, fee) => sum + parseFloat(fee.totalFees || 0), 0);
      setTotalFeesCollected(total);
    } catch (error) {
      console.error('Error fetching student fees:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/api/v1/attendance/getall');
      const attendance = response.data.attendance || response.data.attendanceRecords || [];
      setAttendanceData(attendance);
      
      // Calculate attendance statistics
      let present = 0, absent = 0, apology = 0;
      attendance.forEach((record) => {
        if (record.status === 'Present') present++;
        else if (record.status === 'Absent') absent++;
        else if (record.status === 'Absent with apology') apology++;
      });
      setAttendanceStats({ present, absent, apology });
      console.log('Attendance data loaded:', { present, absent, apology, total: attendance.length });
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await api.get('/api/v1/exam/getall');
      setExams(response.data.exams || []);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content>
        <TopBar>
          <TopBarLeft>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, color: '#24455b' }}>Welcome, Admin</h1>
              <p style={{ margin: '4px 0 0 0', color: '#6b7785', fontSize: 13 }}>Overview & quick actions</p>
            </div>
            <SearchInput placeholder="Search students, classes, events..." />
          </TopBarLeft>

          <TopBarRight>
            <div style={{ textAlign: 'right', marginRight: 6 }}>
              <div style={{ fontSize: 12, color: '#40515f', fontWeight: 700 }}>Admin</div>
              <div style={{ fontSize: 12, color: '#7b8a96' }}>Head of School</div>
            </div>
            <Avatar src={AdminLogo} alt="Admin avatar" />
          </TopBarRight>
        </TopBar>

        <TopContent>
          <Section>
            <SectionTitle>📊 Overview</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Total Students</CardTitle>
                <CardContent>500</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Teachers</CardTitle>
                <CardContent>50</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Classes</CardTitle>
                <CardContent>50</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Fees Collected</CardTitle>
                <CardContent>₹{totalFeesCollected.toFixed(2)}</CardContent>
              </Card>
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>📅 Upcoming Events</SectionTitle>
            <EventCalendar events={events} />
          </Section>
        </TopContent>

        <BottomContent>
          <Section>
            <SectionTitle>✓ Attendance Summary</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Present</CardTitle>
                <CardContent style={{ color: '#28a745', fontSize: '28px' }}>
                  {attendanceStats.present}
                </CardContent>
              </Card>
              <Card>
                <CardTitle>Absent</CardTitle>
                <CardContent style={{ color: '#dc3545', fontSize: '28px' }}>
                  {attendanceStats.absent}
                </CardContent>
              </Card>
              <Card>
                <CardTitle>Absent (Apology)</CardTitle>
                <CardContent style={{ color: '#ffc107', fontSize: '28px' }}>
                  {attendanceStats.apology}
                </CardContent>
              </Card>
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>📋 Latest Attendance Records</SectionTitle>
            <CardContainer>
              {!attendanceData || attendanceData.length === 0 ? (
                <Card style={{ gridColumn: '1 / -1' }}>
                  <CardContent>No attendance records yet</CardContent>
                </Card>
              ) : (
                attendanceData.slice(0, 6).map((record) => (
                  <Card key={record._id || Math.random()}>
                    <CardTitle style={{ fontSize: '14px', margin: '0 0 8px 0' }}>
                      {record.studentName && record.studentName !== 'Unknown Student' ? record.studentName : `Student ${record.studentId?.substring(0, 5) || 'N/A'}`}
                    </CardTitle>
                    <CardContent style={{ margin: '8px 0', fontSize: '13px' }}>
                      <strong>Status:</strong> <span style={{
                        color: record.status === 'Present' ? '#28a745' : record.status === 'Absent' ? '#dc3545' : '#ffc107',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        backgroundColor: record.status === 'Present' ? '#e8f5e9' : record.status === 'Absent' ? '#ffebee' : '#fff3e0',
                        display: 'inline-block'
                      }}>
                        {record.status}
                      </span>
                    </CardContent>
                    <CardContent style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                      <strong>Date:</strong> {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>� Exam Details</SectionTitle>
            <CardContainer>
              {exams.length === 0 ? (
                <Card style={{ gridColumn: '1 / -1' }}>
                  <CardContent>No exam records</CardContent>
                </Card>
              ) : (
                exams.slice(0, 6).map((exam) => (
                  <Card key={exam._id || Math.random()}>
                    <CardTitle>{exam.name}</CardTitle>
                    <CardContent style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
                      <p style={{ margin: '4px 0' }}><strong>Class:</strong> {exam.className}</p>
                      <p style={{ margin: '4px 0' }}><strong>Reg#:</strong> {exam.registrationNumber}</p>
                      <p style={{ margin: '4px 0', color: '#007bff', fontWeight: 'bold' }}>Marks: {exam.marks}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>�💰 Student Fees Details</SectionTitle>
            <CardContainer>
              {studentFees.length === 0 ? (
                <Card style={{ gridColumn: '1 / -1' }}>
                  <CardContent>No fees records yet</CardContent>
                </Card>
              ) : (
                studentFees.slice(0, 5).map((fee) => (
                  <Card key={fee._id}>
                    <CardTitle>{fee.studentName}</CardTitle>
                    <CardContent style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
                      <p style={{ margin: '4px 0' }}><strong>Roll:</strong> {fee.rollNumber}</p>
                      <p style={{ margin: '4px 0' }}><strong>Dept:</strong> {fee.department}</p>
                      <p style={{ margin: '4px 0', color: '#28a745', fontWeight: 'bold' }}>Total: ₹{parseFloat(fee.totalFees).toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>⭐ Student Performance</SectionTitle>
            <Performance studentPerformance={studentPerformance} />
          </Section>

          <Section>
            <SectionTitle>📢 Announcements</SectionTitle>
            <Announcement announcements={announcements} />
          </Section>
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
