// CheckAttendanceSection.js
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Sidebar from './Sidebar';
import { AttendanceContainer, Content, AttendanceContent, AttendanceHeader, AttendanceList, AttendanceItem, StudentName, 
  CheckboxLabel, Divider, SubmitButton } from '../../styles/AttendanceStyles'; 

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      // Send attendance data to the database
      const formattedData = attendanceData.map(({ id, status }) => ({ student: id, status }));
      const response = await api.post('/api/v1/attendance', { attendanceData: formattedData });
      console.log('Attendance data submitted:', response.data);
      setSuccess(true);
      // Hide success after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
      setError('Failed to submit attendance');
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
          <AttendanceHeader>Attendance</AttendanceHeader>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button onClick={() => markAll('Present')} style={{ padding: '6px 10px' }}>Mark All Present</button>
            <button onClick={() => markAll('Absent')} style={{ padding: '6px 10px' }}>Mark All Absent</button>
            <button onClick={() => markAll('Absent with apology')} style={{ padding: '6px 10px' }}>Mark All Absent (Apology)</button>
            <button onClick={clearAll} style={{ padding: '6px 10px' }}>Clear All</button>
          </div>
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
              <SubmitButton onClick={handleSubmit} disabled={attendanceData.length === 0}>Submit</SubmitButton>
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
