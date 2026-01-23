// StudentSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import { StudentsContainer, Content, StudentsContent, StudentsHeader, StudentList, StudentItem, AddStudentForm, AddStudentInput, 
  AddStudentButton } from '../../styles/StudentsStyles';

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/students/getall');
      setStudents(response.data.students || []);
      setError('');
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>📚 Students List</StudentsHeader>
          {loading ? (
            <StudentList>
              <StudentItem style={{ textAlign: 'center', color: '#999' }}>Loading students...</StudentItem>
            </StudentList>
          ) : error ? (
            <StudentList>
              <StudentItem style={{ textAlign: 'center', color: '#e74c3c' }}>{error}</StudentItem>
            </StudentList>
          ) : students.length === 0 ? (
            <StudentList>
              <StudentItem style={{ textAlign: 'center', color: '#999' }}>No students found</StudentItem>
            </StudentList>
          ) : (
            <StudentList>
              {students.map((student) => (
                <StudentItem key={student._id || student.id}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{student.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Reg: {student.registrationNumber}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Class: {student.class || 'N/A'}</div>
                  {student.email && <div style={{ fontSize: '12px', color: '#666' }}>Email: {student.email}</div>}
                </StudentItem>
              ))}
            </StudentList>
          )}
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default StudentSection;
