// AttendanceSection.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import { MdCheckCircle, MdCancel, MdCalendarMonth, MdTrendingUp } from 'react-icons/md';

const AttendanceContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 270px);
  padding: 40px 35px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px 15px;
  }
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 20px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25);

  h1 {
    margin: 0 0 8px 0;
    font-size: 36px;
    font-weight: 700;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 16px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-top: 4px solid ${props => props.color};
  text-align: center;

  svg {
    font-size: 32px;
    color: ${props => props.color};
    margin-bottom: 12px;
  }

  h3 {
    margin: 0 0 4px 0;
    font-size: 28px;
    font-weight: 700;
    color: #1f3a57;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
`;

const AttendanceList = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const AttendanceItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
  gap: 16px;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s ease;

  &:hover {
    background: #fafbfc;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 100px;
  }
`;

const DateColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #667eea;
    font-size: 20px;
  }

  div {
    h4 {
      margin: 0 0 2px 0;
      font-size: 15px;
      font-weight: 600;
      color: #1f3a57;
    }

    p {
      margin: 0;
      font-size: 12px;
      color: #6b7280;
    }
  }
`;

const SubjectColumn = styled.div`
  font-size: 14px;
  color: #6b7280;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatusColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;

  svg {
    font-size: 22px;
  }
`;

const PresentBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #d1fae5;
  color: #059669;
  font-weight: 600;
  font-size: 14px;

  svg {
    color: #10b981;
  }
`;

const AbsentBadge = styled(PresentBadge)`
  background: #fee2e2;
  color: #dc2626;

  svg {
    color: #ef4444;
  }
`;

const AttendanceSection = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/api/v1/attendance/getall');
      const data = response.data.attendance || [];
      setAttendanceData(data);
      
      const present = data.filter(a => a.present).length;
      const absent = data.filter(a => !a.present).length;
      setStats({
        present,
        absent,
        total: data.length,
        percentage: data.length > 0 ? Math.round((present / data.length) * 100) : 0
      });
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <PageHeader>
          <h1>📅 Attendance</h1>
          <p>Your attendance record and statistics</p>
        </PageHeader>

        <StatsGrid>
          <StatCard color="#667eea">
            <MdTrendingUp />
            <h3>{stats.percentage}%</h3>
            <p>Attendance Rate</p>
          </StatCard>
          <StatCard color="#10b981">
            <MdCheckCircle />
            <h3>{stats.present}</h3>
            <p>Present Days</p>
          </StatCard>
          <StatCard color="#ef4444">
            <MdCancel />
            <h3>{stats.absent}</h3>
            <p>Absent Days</p>
          </StatCard>
          <StatCard color="#f59e0b">
            <MdCalendarMonth />
            <h3>{stats.total}</h3>
            <p>Total Classes</p>
          </StatCard>
        </StatsGrid>

        <AttendanceList>
          {attendanceData.length > 0 ? (
            attendanceData.map((record) => (
              <AttendanceItem key={record._id}>
                <DateColumn>
                  <MdCalendarMonth />
                  <div>
                    <h4>{new Date(record.date).toLocaleDateString()}</h4>
                    <p>{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                  </div>
                </DateColumn>
                <SubjectColumn>{record.subject || 'General'}</SubjectColumn>
                <StatusColumn>
                  {record.present ? (
                    <PresentBadge>
                      <MdCheckCircle /> Present
                    </PresentBadge>
                  ) : (
                    <AbsentBadge>
                      <MdCancel /> Absent
                    </AbsentBadge>
                  )}
                </StatusColumn>
              </AttendanceItem>
            ))
          ) : (
            <AttendanceItem>
              <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1/-1' }}>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>No attendance records found</p>
              </div>
            </AttendanceItem>
          )}
        </AttendanceList>
      </Content>
    </AttendanceContainer>
  );
};

export default AttendanceSection;
