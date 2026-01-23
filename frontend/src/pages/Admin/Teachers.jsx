// Teachers.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import {
  TeachersContainer,
  Content,
  TeachersContent,
  TeachersHeader,
  TeacherList,
  TeacherItem,
  AddTeacherForm,
  AddTeacherInput,
  AddTeacherButton,
} from '../../styles/TeachersStyles'; // Import styled components from TeachersStyles.js

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '', subject: '' });
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/api/v1/teachers/getall');
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (newTeacher.name.trim() !== '' && newTeacher.email.trim() !== '' && newTeacher.password.trim() !== '' && newTeacher.subject.trim() !== '') {
      try {
        const response = await api.post('/api/v1/teachers/register', newTeacher);
        if (response.data.success) {
          const createdTeacher = response.data.teacher;
          setTeachers([...teachers, createdTeacher]);
          setNewTeacher({ name: '', email: '', password: '', subject: '' });
          setMessage('Teacher registered successfully! ✓');
          setTimeout(() => setMessage(''), 3000);
        }
      } catch (error) {
        console.error('Error adding teacher:', error);
        setMessage('Error registering teacher. Email may already exist.');
        setTimeout(() => setMessage(''), 3000);
      }
    } else {
      setMessage('Please fill all fields!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteTeacher = async (teacherId, teacherName) => {
    try {
      const response = await api.delete(`/api/v1/teachers/${teacherId}`);
      if (response.data.success) {
        setTeachers(teachers.filter(t => t._id !== teacherId));
        setMessage(`Teacher "${teacherName}" deleted successfully! ✓`);
        setDeleteConfirm(null);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      setMessage('Error deleting teacher. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <TeachersHeader>👨‍🏫 Teachers Management</TeachersHeader>
          
          {message && (
            <div style={{
              padding: '12px',
              marginBottom: '20px',
              backgroundColor: message.includes('Error') ? '#fee' : '#efe',
              color: message.includes('Error') ? '#c33' : '#3c3',
              borderRadius: '6px',
              fontSize: '14px',
              border: `1px solid ${message.includes('Error') ? '#fcc' : '#cfc'}`
            }}>
              {message}
            </div>
          )}

          <AddTeacherForm onSubmit={handleAddTeacher}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <AddTeacherInput
                type="text"
                placeholder="Teacher name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              />
              <AddTeacherInput
                type="email"
                placeholder="Teacher email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              />
              <AddTeacherInput
                type="password"
                placeholder="Password (for login)"
                value={newTeacher.password}
                onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
              />
              <AddTeacherInput
                type="text"
                placeholder="Subject"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
              />
            </div>
            <AddTeacherButton type="submit" style={{ marginTop: '10px', width: '100%' }}>
              ➕ Add Teacher
            </AddTeacherButton>
          </AddTeacherForm>

          <h3 style={{ marginTop: '30px', color: '#1f3a57' }}>📋 Registered Teachers ({teachers.length})</h3>
          <TeacherList>
            {teachers.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                No teachers registered yet.
              </div>
            ) : (
              teachers.map((teacher) => (
                <TeacherItem key={teacher._id || teacher.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: '#1f3a57', marginBottom: '5px' }}>
                        {teacher.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        📧 {teacher.email}
                      </div>
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                        📚 {teacher.subject}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                        🔐 Password protected account - Teacher can login with email and password
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {deleteConfirm === teacher._id ? (
                        <>
                          <button
                            onClick={() => handleDeleteTeacher(teacher._id, teacher.name)}
                            style={{
                              padding: '8px 12px',
                              background: '#d32f2f',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            ✓ Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            style={{
                              padding: '8px 12px',
                              background: '#999',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(teacher._id)}
                          style={{
                            padding: '8px 12px',
                            background: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            minWidth: '80px'
                          }}
                          title="Delete this teacher"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                </TeacherItem>
              ))
            )}
          </TeacherList>
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;
