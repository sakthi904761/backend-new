// Students.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { api } from '../../services/api';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 260px);
  padding: 40px 30px;
  transition: margin-left 240ms ease;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  background: white;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AddButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const RefreshButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;

  &:hover {
    background: #e5e7eb;
  }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  align-items: flex-end;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  transition: all 200ms ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #f9fafb;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  transition: all 200ms ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    tr {
      th {
        padding: 16px;
        text-align: left;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-size: 12px;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #e5e7eb;
      transition: background-color 200ms ease;

      &:hover {
        background: #f9fafb;
      }

      &:last-child {
        border-bottom: none;
      }

      td {
        padding: 16px;
        color: #374151;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  text-transform: uppercase;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditButton = styled(ActionButton)`
  background: #dbeafe;
  color: #1e40af;

  &:hover {
    background: #bfdbfe;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #fee2e2;
  color: #991b1b;

  &:hover {
    background: #fecaca;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;

  h3 {
    font-size: 18px;
    margin: 0 0 10px 0;
    color: #374151;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const Alert = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  animation: slideIn 300ms ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SuccessAlert = styled(Alert)`
  background: #ecfdf5;
  color: #065f46;
  border-left: 4px solid #10b981;
`;

const ErrorAlert = styled(Alert)`
  background: #fef2f2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;

  .label {
    font-size: 12px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .value {
    font-size: 28px;
    font-weight: 700;
    color: #667eea;
  }
`;

const Students = () => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    registrationNumber: '',
    class: '',
    email: '',
    parentName: '',
    parentEmail: '',
    parentPhone: ''
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/students/getall');
      setStudents(response.data.students || []);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching students:', error);
      setErrorMessage('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (
      !newStudent.name.trim() ||
      !newStudent.registrationNumber.trim() ||
      !newStudent.class.trim()
    ) {
      setErrorMessage('Please fill in required fields: Name, Registration Number, and Class');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/api/v1/students', newStudent);
      
      if (response.data.success) {
        setSuccessMessage('Student added successfully!');
        setNewStudent({
          name: '',
          registrationNumber: '',
          class: '',
          email: '',
          parentName: '',
          parentEmail: '',
          parentPhone: ''
        });
        fetchStudents();
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to add student');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setLoading(true);
        await api.delete(`/api/v1/students/${studentId}`);
        setSuccessMessage('Student deleted successfully!');
        fetchStudents();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting student:', error);
        setErrorMessage('Failed to delete student');
        setTimeout(() => setErrorMessage(''), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditStudent = (student) => {
    setEditingId(student._id);
    setNewStudent({
      name: student.name,
      registrationNumber: student.registrationNumber,
      class: student.class,
      email: student.email || '',
      parentName: student.parentName || '',
      parentEmail: student.parentEmail || '',
      parentPhone: student.parentPhone || ''
    });
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    if (
      !newStudent.name.trim() ||
      !newStudent.registrationNumber.trim() ||
      !newStudent.class.trim()
    ) {
      setErrorMessage('Please fill in required fields: Name, Registration Number, and Class');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await api.put(`/api/v1/students/${editingId}`, newStudent);
      
      if (response.data.success) {
        setSuccessMessage('Student updated successfully!');
        setNewStudent({
          name: '',
          registrationNumber: '',
          class: '',
          email: '',
          parentName: '',
          parentEmail: '',
          parentPhone: ''
        });
        setEditingId(null);
        fetchStudents();
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating student:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to update student');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewStudent({
      name: '',
      registrationNumber: '',
      class: '',
      email: '',
      parentName: '',
      parentEmail: '',
      parentPhone: ''
    });
  };

  const grades = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const uniqueGrades = [...new Set(students.map(s => s.class))];

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <div>
            <Title>Student Management</Title>
            <Subtitle>Manage all students in the database</Subtitle>
          </div>
          <ButtonGroup>
            <RefreshButton onClick={fetchStudents} disabled={loading}>
              {loading ? <LoadingSpinner /> : '🔄'} Refresh
            </RefreshButton>
          </ButtonGroup>
        </Header>

        {successMessage && <SuccessAlert><span>✓</span>{successMessage}</SuccessAlert>}
        {errorMessage && <ErrorAlert><span>✕</span>{errorMessage}</ErrorAlert>}

        <Stats>
          <StatCard>
            <div className="label">Total Students</div>
            <div className="value">{students.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Classes</div>
            <div className="value">{uniqueGrades.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">With Email</div>
            <div className="value">{students.filter(s => s.email).length}</div>
          </StatCard>
          <StatCard>
            <div className="label">With Parent Info</div>
            <div className="value">{students.filter(s => s.parentEmail).length}</div>
          </StatCard>
        </Stats>

        <FormCard>
          <h3 style={{ margin: '0 0 20px 0', color: '#1f3a57' }}>
            {editingId ? '✏️ Edit Student' : '➕ Add New Student'}
          </h3>
          <Form onSubmit={editingId ? handleUpdateStudent : handleAddStudent}>
            <FormGroup>
              <Label>Student Name *</Label>
              <Input
                type="text"
                placeholder="John Doe"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Registration No. *</Label>
              <Input
                type="text"
                placeholder="STU001"
                value={newStudent.registrationNumber}
                onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Class *</Label>
              <Select
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                disabled={loading}
                required
              >
                <option value="">Select Class</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Class {grade}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Student Email</Label>
              <Input
                type="email"
                placeholder="student@school.com"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label>Parent Name</Label>
              <Input
                type="text"
                placeholder="Parent Name"
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label>Parent Email</Label>
              <Input
                type="email"
                placeholder="parent@email.com"
                value={newStudent.parentEmail}
                onChange={(e) => setNewStudent({ ...newStudent, parentEmail: e.target.value })}
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <Label>Parent Phone</Label>
              <Input
                type="tel"
                placeholder="1234567890"
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <AddButton type="submit" disabled={loading}>
                {loading ? <LoadingSpinner /> : (editingId ? '✏️' : '+')} {editingId ? 'Update' : 'Add'} Student
              </AddButton>
              {editingId && (
                <AddButton 
                  type="button" 
                  onClick={handleCancelEdit} 
                  disabled={loading}
                  style={{ background: '#f3f4f6', color: '#374151', marginLeft: '10px' }}
                >
                  ✕ Cancel
                </AddButton>
              )}
            </FormGroup>
          </Form>
        </FormCard>

        <TableContainer>
          {students.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Reg. No.</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Parent Name</th>
                  <th>Parent Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id || index}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td><strong>{student.registrationNumber}</strong></td>
                    <td>{student.class}</td>
                    <td>{student.email || '-'}</td>
                    <td>{student.parentName || '-'}</td>
                    <td>{student.parentEmail || '-'}</td>
                    <td>
                      <ActionButtons>
                        <EditButton 
                          onClick={() => handleEditStudent(student)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </EditButton>
                        <DeleteButton 
                          onClick={() => handleDeleteStudent(student._id)}
                          disabled={loading}
                        >
                          🗑️ Delete
                        </DeleteButton>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState>
              <h3>No Students Found</h3>
              <p>Start by adding your first student using the form above</p>
            </EmptyState>
          )}
        </TableContainer>
      </Content>
    </Container>
  );
};

export default Students;
