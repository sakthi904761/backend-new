// StudentAssignments.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import { MdAssignment, MdCheckCircle, MdSchedule, MdFileDownload, MdUploadFile } from 'react-icons/md';

const AssignmentsContainer = styled.div`
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

const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterButton = styled.button`
  padding: 10px 18px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e5e7eb'};
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
  }
`;

const AssignmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AssignmentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid ${props => props.status === 'completed' ? '#10b981' : props.status === 'overdue' ? '#ef4444' : '#f59e0b'};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '${props => props.status === 'completed' ? '✓' : props.status === 'overdue' ? '!' : ''}';
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${props => props.status === 'completed' ? '#d1fae5' : props.status === 'overdue' ? '#fee2e2' : 'transparent'};
    color: ${props => props.status === 'completed' ? '#10b981' : props.status === 'overdue' ? '#ef4444' : 'transparent'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
  }
`;

const AssignmentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;

  svg {
    color: #667eea;
    font-size: 28px;
    flex-shrink: 0;
  }
`;

const AssignmentTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1f3a57;
  padding-right: 40px;
`;

const AssignmentDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

const AssignmentMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;

  svg {
    color: #667eea;
    flex-shrink: 0;
  }

  strong {
    color: #1f3a57;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }
`;

const DownloadButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #f5f7fa;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.status === 'completed' ? '#d1fae5' : props.status === 'overdue' ? '#fee2e2' : '#fef3c7'};
  color: ${props => props.status === 'completed' ? '#059669' : props.status === 'overdue' ? '#dc2626' : '#d97706'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  svg {
    font-size: 64px;
    color: #d1d5db;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: #6b7280;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #9ca3af;
    font-size: 14px;
  }
`;

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/api/v1/assignments/getall');
      setAssignments(response.data.assignments || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAssignmentStatus = (assignment) => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    
    if (assignment.submitted) return 'completed';
    if (dueDate < now) return 'overdue';
    return 'pending';
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return getAssignmentStatus(assignment) === filter;
  });

  const handleSubmit = (assignmentId) => {
    // Implement submission logic
    console.log('Submitting assignment:', assignmentId);
  };

  const handleDownload = (assignmentId) => {
    // Implement download logic
    console.log('Downloading assignment:', assignmentId);
  };

  return (
    <AssignmentsContainer>
      <Sidebar />
      <Content>
        <PageHeader>
          <h1>📚 Assignments</h1>
          <p>Track and submit all your course assignments</p>
        </PageHeader>

        <FilterBar>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All Assignments
          </FilterButton>
          <FilterButton 
            active={filter === 'pending'} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </FilterButton>
          <FilterButton 
            active={filter === 'completed'} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </FilterButton>
          <FilterButton 
            active={filter === 'overdue'} 
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </FilterButton>
        </FilterBar>

        {filteredAssignments.length === 0 ? (
          <EmptyState>
            <MdAssignment />
            <h3>No Assignments</h3>
            <p>
              {filter === 'all' 
                ? 'No assignments available at the moment.' 
                : `No ${filter} assignments.`}
            </p>
          </EmptyState>
        ) : (
          <AssignmentsGrid>
            {filteredAssignments.map((assignment) => (
              <AssignmentCard 
                key={assignment._id} 
                status={getAssignmentStatus(assignment)}
              >
                <AssignmentHeader>
                  <MdAssignment />
                  <div>
                    <AssignmentTitle>{assignment.title}</AssignmentTitle>
                    <StatusBadge status={getAssignmentStatus(assignment)}>
                      {getAssignmentStatus(assignment)}
                    </StatusBadge>
                  </div>
                </AssignmentHeader>

                <AssignmentDescription>{assignment.description}</AssignmentDescription>

                <AssignmentMeta>
                  <MetaItem>
                    <MdSchedule />
                    <span>Due: <strong>{new Date(assignment.dueDate).toLocaleDateString()}</strong></span>
                  </MetaItem>
                  {assignment.subject && (
                    <MetaItem>
                      <MdFileDownload />
                      <span>Subject: <strong>{assignment.subject}</strong></span>
                    </MetaItem>
                  )}
                </AssignmentMeta>

                <ButtonGroup>
                  <SubmitButton 
                    onClick={() => handleSubmit(assignment._id)}
                    disabled={getAssignmentStatus(assignment) === 'completed'}
                  >
                    <MdUploadFile /> Submit
                  </SubmitButton>
                  <DownloadButton onClick={() => handleDownload(assignment._id)}>
                    <MdFileDownload /> Details
                  </DownloadButton>
                </ButtonGroup>
              </AssignmentCard>
            ))}
          </AssignmentsGrid>
        )}
      </Content>
    </AssignmentsContainer>
  );
};

export default StudentAssignments;
