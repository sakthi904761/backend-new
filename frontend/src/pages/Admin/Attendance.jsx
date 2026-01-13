// Attendance.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  StudentName,
  CheckboxLabel,
  Divider,
  SubmitButton,
  SuccessOverlay,
  SuccessModal,
  SuccessMessage,
  SuccessIcon,
  CloseButton,
} from '../../styles/AttendanceStyles';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/api/v1/students/getall');
      setStudents(response.data.students || []);
      initializeAttendanceData(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const initializeAttendanceData = (students) => {
    const initialAttendanceData = students.map((student) => ({
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
    try {
      // Send attendance data to the database
      const formattedData = attendanceData.map(({ id, status }) => ({ student: id, status }));
      const response = await api.post('/api/v1/attendance', { attendanceData: formattedData });
      console.log('Attendance data submitted:', response.data);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
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
      {showSuccessMessage && (
        <SuccessOverlay onClick={() => setShowSuccessMessage(false)}>
          <SuccessModal onClick={(e) => e.stopPropagation()}>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessMessage>Attendance Submitted Successfully!</SuccessMessage>
            <CloseButton onClick={() => setShowSuccessMessage(false)}>Close</CloseButton>
          </SuccessModal>
        </SuccessOverlay>
      )}
      <Content>
        <AttendanceContent>
          <AttendanceHeader>Attendance</AttendanceHeader>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button onClick={() => markAll('Present')} style={{ padding: '6px 10px' }}>Mark All Present</button>
            <button onClick={() => markAll('Absent')} style={{ padding: '6px 10px' }}>Mark All Absent</button>
            <button onClick={() => markAll('Absent with apology')} style={{ padding: '6px 10px' }}>Mark All Absent (Apology)</button>
            <button onClick={clearAll} style={{ padding: '6px 10px' }}>Clear All</button>
          </div>
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
                        onChange={(e) => setStatusFor(attendanceData[index].id, e.target.value)}
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
                            onChange={() => setStatusFor(attendanceData[index].id, 'Present')}
                          />
                          <span style={{ marginLeft: 6 }}>Present</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={attendanceData[index]?.status === 'Absent'}
                            onChange={() => setStatusFor(attendanceData[index].id, 'Absent')}
                          />
                          <span style={{ marginLeft: 6 }}>Absent</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={attendanceData[index]?.status === 'Absent with apology'}
                            onChange={() => setStatusFor(attendanceData[index].id, 'Absent with apology')}
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
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default Attendance;
