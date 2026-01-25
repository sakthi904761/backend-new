import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import { MdSchool, MdSchedule, MdLocationOn, MdTimer, MdCheckCircle } from 'react-icons/md';

const ExamsContainer = styled.div`
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

const ExamsGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExamCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 5px solid ${props => props.color || '#667eea'};
  position: relative;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

const ExamHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
`;

const ExamIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => props.color || '#667eea'};
  opacity: 0.1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: ${props => props.color || '#667eea'};
  flex-shrink: 0;
`;

const ExamTitleSection = styled.div`
  flex: 1;
`;

const ExamTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f3a57;
`;

const ExamSubject = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

const ExamDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #667eea;
    flex-shrink: 0;
  }

  span {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
  }

  strong {
    color: #1f3a57;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.status === 'completed' ? '#d1fae5' : props.status === 'upcoming' ? '#e0e7ff' : '#fef3c7'};
  color: ${props => props.status === 'completed' ? '#059669' : props.status === 'upcoming' ? '#4f46e5' : '#d97706'};
  position: absolute;
  top: 20px;
  right: 20px;
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

const ExamSection = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await api.get('/api/v1/exams/getall');
      setExams(response.data.exams || []);
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExamStatus = (exam) => {
    const examDate = new Date(exam.date);
    const now = new Date();
    
    if (exam.result) return 'completed';
    if (examDate > now) return 'upcoming';
    return 'in-progress';
  };

  return (
    <ExamsContainer>
      <Sidebar />
      <Content>
        <PageHeader>
          <h1>🎓 Exams</h1>
          <p>View your scheduled exams and results</p>
        </PageHeader>

        {exams.length === 0 ? (
          <EmptyState>
            <MdSchool />
            <h3>No Exams Scheduled</h3>
            <p>Check back later for upcoming exam schedules.</p>
          </EmptyState>
        ) : (
          <ExamsGrid>
            {exams.map((exam) => (
              <ExamCard key={exam._id} color="#667eea">
                <StatusBadge status={getExamStatus(exam)}>
                  {getExamStatus(exam)}
                </StatusBadge>
                
                <ExamHeader>
                  <ExamIcon color="#667eea">
                    <MdSchool />
                  </ExamIcon>
                  <ExamTitleSection>
                    <ExamTitle>{exam.title}</ExamTitle>
                    <ExamSubject>{exam.subject}</ExamSubject>
                  </ExamTitleSection>
                </ExamHeader>

                <ExamDetails>
                  <DetailItem>
                    <MdSchedule />
                    <span><strong>{new Date(exam.date).toLocaleDateString()}</strong></span>
                  </DetailItem>
                  <DetailItem>
                    <MdTimer />
                    <span><strong>{exam.duration} mins</strong></span>
                  </DetailItem>
                  {exam.location && (
                    <DetailItem>
                      <MdLocationOn />
                      <span><strong>{exam.location}</strong></span>
                    </DetailItem>
                  )}
                  {exam.result && (
                    <DetailItem>
                      <MdCheckCircle />
                      <span>Score: <strong>{exam.result}/100</strong></span>
                    </DetailItem>
                  )}
                </ExamDetails>

                {exam.result && (
                  <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#0369a1' }}>
                      ✓ Result: <strong>{exam.result}/100</strong> - {exam.result >= 70 ? 'Passed' : 'Needs Improvement'}
                    </p>
                  </div>
                )}
              </ExamCard>
            ))}
          </ExamsGrid>
        )}
      </Content>
    </ExamsContainer>
  );
};

export default ExamSection;
