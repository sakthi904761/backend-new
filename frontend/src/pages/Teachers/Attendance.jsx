// CheckAttendanceSection.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';
import Sidebar from './Sidebar';
import { AttendanceContainer, Content, AttendanceContent, AttendanceHeader, AttendanceList, AttendanceItem, StudentName, 
  CheckboxLabel, Divider, SubmitButton } from '../../styles/AttendanceStyles'; 

const StatsContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  h3 { margin: 0 0 5px 0; font-size: 14px; opacity: 0.9; }
  .value { font-size: 24px; font-weight: bold; }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #667eea;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5568d3;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const WarningButton = styled(Button)`
  background: #ff9800;
  &:hover {
    background: #e68900;
  }
`;

const SendEmailButton = styled(Button)`
  background: #28a745;
  &:hover {
    background: #218838;
  }
`;

const PercentageDisplay = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  font-weight: 600;
`;

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/v1/students/getall');
      const studentsArr = response.data?.students || [];
      setStudents(studentsArr);
      initializeAttendanceData(studentsArr);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const initializeAttendanceData = (students = []) => {
    const initialAttendanceData = (students || []).map((student) => ({
      id: student._id || student.id,
      name: student.name,
      status: 'Present', // Default to 'Present'
    }));
    setAttendanceData(initialAttendanceData);
  };

  const handleStatusChange = (id, status) => {
    const updatedData = attendanceData.map((student) => {
      if (student.id === id) {
        return { ...student, status };
      }
      return student;
    });
    setAttendanceData(updatedData);
  };

  const handleSubmit = async () => {
    if (!attendanceData || attendanceData.length === 0) {
      console.warn('No attendance data to submit');
      return;
    }

    try {
      // Send attendance data to the database with date
      const formattedData = attendanceData.map(({ id, status }) => ({ 
        student: id, 
        status,
        date: attendanceDate 
      }));
      const response = await api.post('/api/v1/attendance', { 
        attendanceData: formattedData,
        date: attendanceDate 
      });
      console.log('Attendance data submitted:', response.data);
      setSuccess(true);
      // Hide success after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
      setError('Failed to submit attendance');
    }
  };

  const calculateAttendancePercentage = () => {
    if (attendanceData.length === 0) return 0;
    const presentCount = attendanceData.filter(s => s.status === 'Present').length;
    return Math.round((presentCount / attendanceData.length) * 100);
  };

  const getAttendanceStats = () => {
    const present = attendanceData.filter(s => s.status === 'Present').length;
    const absent = attendanceData.filter(s => s.status === 'Absent').length;
    const apology = attendanceData.filter(s => s.status === 'Absent with apology').length;
    return { present, absent, apology };
  };

  const handleSendEmailReport = async () => {
    if (!attendanceData || attendanceData.length === 0) {
      setError('No attendance data to send');
      return;
    }

    setSendingEmail(true);
    try {
      const stats = getAttendanceStats();
      const percentage = calculateAttendancePercentage();
      
      // Get unique class from students
      const studentClass = students.length > 0 ? (students[0].class || 'All') : 'All';

      const emailData = {
        grade: studentClass,
        date: attendanceDate,
        attendanceDetails: attendanceData,
        present: stats.present,
        absent: stats.absent,
        apologyAbsent: stats.apology,
        percentage: percentage,
        total: attendanceData.length
      };

      console.log('📧 Sending attendance report with data:', emailData);
      
      // Use the new immediate endpoint
      const response = await api.post('/api/v1/email/attendance-report-immediate', emailData);
      console.log('✅ Email report sent:', response.data);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('❌ Error sending email:', error);
      setError(error.response?.data?.message || 'Failed to send attendance report email');
    } finally {
      setSendingEmail(false);
    }
  };

  const markAll = (status) => {
    const updated = attendanceData.map((s) => ({ ...s, status }));
    setAttendanceData(updated);
  };

  const clearAll = () => {
    const updated = attendanceData.map((s) => ({ ...s, status: '' }));
    setAttendanceData(updated);
  };

  const toggleEdit = (id) => {
    setAttendanceData((prev) => prev.map(s => s.id === id ? { ...s, editing: !s.editing } : s));
  };

  const setStatusFor = (id, status) => {
    setAttendanceData((prev) => prev.map(s => s.id === id ? { ...s, status, editing: false } : s));
  };

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>Attendance Management</AttendanceHeader>
          
          <div style={{ marginBottom: 20, background: 'white', padding: 15, borderRadius: 8 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Attendance Date:
            </label>
            <input 
              type="date" 
              value={attendanceDate} 
              onChange={(e) => setAttendanceDate(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
            />
          </div>

          {/* Statistics */}
          {attendanceData.length > 0 && (
            <StatsContainer>
              <StatCard>
                <h3>Total Present</h3>
                <div className="value">{getAttendanceStats().present}</div>
                <PercentageDisplay>{Math.round((getAttendanceStats().present / attendanceData.length) * 100)}%</PercentageDisplay>
              </StatCard>
              <StatCard style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <h3>Total Absent</h3>
                <div className="value">{getAttendanceStats().absent}</div>
                <PercentageDisplay>{Math.round((getAttendanceStats().absent / attendanceData.length) * 100)}%</PercentageDisplay>
              </StatCard>
              <StatCard style={{ background: 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)' }}>
                <h3>Absent (Apology)</h3>
                <div className="value">{getAttendanceStats().apology}</div>
                <PercentageDisplay>{Math.round((getAttendanceStats().apology / attendanceData.length) * 100)}%</PercentageDisplay>
              </StatCard>
              <StatCard style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <h3>Attendance %</h3>
                <div className="value">{calculateAttendancePercentage()}%</div>
                <PercentageDisplay>Present Rate</PercentageDisplay>
              </StatCard>
            </StatsContainer>
          )}

          <ButtonGroup>
            <Button onClick={() => markAll('Present')}>Mark All Present</Button>
            <Button onClick={() => markAll('Absent')}>Mark All Absent</Button>
            <Button onClick={() => markAll('Absent with apology')}>Mark Apology</Button>
            <WarningButton onClick={clearAll}>Clear All</WarningButton>
            <SendEmailButton onClick={handleSendEmailReport} disabled={sendingEmail || attendanceData.length === 0}>
              {sendingEmail ? 'Sending Email...' : '📧 Send Email Report'}
            </SendEmailButton>
          </ButtonGroup>
          {loading ? (
            <div>Loading students...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : students.length === 0 ? (
            <div>No students found</div>
          ) : (
            <>
              <AttendanceList>
                {students.map((student, index) => (
                  <React.Fragment key={student._id || student.id}>
                    <AttendanceItem>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                        <div style={{ flex: 1 }} onClick={() => toggleEdit(student._id || student.id)}>
                          <StudentName>{student.name}</StudentName>
                        </div>
                        {attendanceData[index]?.editing ? (
                          <select
                            value={attendanceData[index]?.status || ''}
                            onChange={(e) => setStatusFor(attendanceData[index]?.id || (student._id || student.id), e.target.value)}
                          >
                            <option value="">--select--</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Absent with apology">Absent with apology</option>
                          </select>
                        ) : (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <label>
                              <input
                                type="checkbox"
                                checked={attendanceData[index]?.status === 'Present'}
                                onChange={() => attendanceData[index] && setStatusFor(attendanceData[index].id, 'Present')}
                                disabled={!attendanceData[index]}
                              />
                              <span style={{ marginLeft: 6 }}>Present</span>
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={attendanceData[index]?.status === 'Absent'}
                                onChange={() => attendanceData[index] && setStatusFor(attendanceData[index].id, 'Absent')}
                                disabled={!attendanceData[index]}
                              />
                              <span style={{ marginLeft: 6 }}>Absent</span>
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={attendanceData[index]?.status === 'Absent with apology'}
                                onChange={() => attendanceData[index] && setStatusFor(attendanceData[index].id, 'Absent with apology')}
                                disabled={!attendanceData[index]}
                              />
                              <span style={{ marginLeft: 6 }}>Absent with apology</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </AttendanceItem>
                    {index !== students.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </AttendanceList>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <SubmitButton onClick={handleSubmit} disabled={attendanceData.length === 0} style={{ flex: 1 }}>
                  ✓ Save to Database
                </SubmitButton>
              </div>
            </>
          )}

          {success && (
            <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#28a745', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
              Attendance submitted
            </div>
          )}
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default CheckAttendanceSection;
