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

const RefreshButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;

  &:hover {
    background: #e5e7eb;
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

const ViewButton = styled(ActionButton)`
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  h2 {
    color: #1f3a57;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e5e7eb;

    .label {
      font-weight: 600;
      color: #374151;
    }

    .value {
      color: #6b7280;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const CloseButton = styled.button`
  background: #f3f4f6;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 600;

  &:hover {
    background: #e5e7eb;
  }
`;

const StudentRegistrations = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      setErrorMessage('Failed to load student registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student registration?')) {
      try {
        await api.delete(`/api/v1/students/${id}`);
        setSuccessMessage('Student registration deleted successfully!');
        fetchStudents();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting student:', error);
        setErrorMessage('Failed to delete student registration');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <div>
            <Title>Student Portal Registrations</Title>
            <Subtitle>View and manage all student self-registrations</Subtitle>
          </div>
          <ButtonGroup>
            <RefreshButton onClick={fetchStudents} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </RefreshButton>
          </ButtonGroup>
        </Header>

        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}

        <Stats>
          <StatCard>
            <div className="label">Total Registrations</div>
            <div className="value">{students.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Pending Approval</div>
            <div className="value">{students.filter(s => !s.approved).length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Approved</div>
            <div className="value">{students.filter(s => s.approved).length}</div>
          </StatCard>
        </Stats>

        <TableContainer>
          {students.length === 0 ? (
            <EmptyState>
              <h3>No Student Registrations</h3>
              <p>No students have registered through the portal yet.</p>
            </EmptyState>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration #</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name || 'N/A'}</td>
                    <td>{student.email || 'N/A'}</td>
                    <td>{student.registrationNumber || 'N/A'}</td>
                    <td>{student.class || 'N/A'}</td>
                    <td>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: student.approved ? '#ecfdf5' : '#fef3c7',
                        color: student.approved ? '#065f46' : '#92400e'
                      }}>
                        {student.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <ActionButtons>
                        <ViewButton onClick={() => handleViewDetails(student)}>
                          View
                        </ViewButton>
                        <DeleteButton onClick={() => handleDeleteStudent(student._id)}>
                          Delete
                        </DeleteButton>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>

        <ModalOverlay isOpen={showModal} onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {selectedStudent && (
              <>
                <h2>{selectedStudent.name}</h2>
                <div className="detail-row">
                  <div className="label">Email</div>
                  <div className="value">{selectedStudent.email || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">Registration Number</div>
                  <div className="value">{selectedStudent.registrationNumber || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">Class</div>
                  <div className="value">{selectedStudent.class || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">Parent Name</div>
                  <div className="value">{selectedStudent.parentName || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">Parent Email</div>
                  <div className="value">{selectedStudent.parentEmail || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">Parent Phone</div>
                  <div className="value">{selectedStudent.parentPhone || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">Status</div>
                  <div className="value">
                    {selectedStudent.approved ? 'Approved' : 'Pending Approval'}
                  </div>
                </div>
                <div className="detail-row">
                  <div className="label">Registration Date</div>
                  <div className="value">
                    {selectedStudent.createdAt 
                      ? new Date(selectedStudent.createdAt).toLocaleDateString() 
                      : 'N/A'}
                  </div>
                </div>
              </>
            )}
            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      </Content>
    </Container>
  );
};

export default StudentRegistrations;
