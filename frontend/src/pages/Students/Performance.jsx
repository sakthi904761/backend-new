// PerformanceSection.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import { MdTrendingUp, MdGrade, MdEmojiEvents, MdShowChart } from 'react-icons/md';

const PerformanceContainer = styled.div`
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-top: 4px solid ${props => props.color};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: 32px;
    color: ${props => props.color};
    margin-bottom: 12px;
  }

  h3 {
    margin: 0 0 4px 0;
    font-size: 32px;
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

const PerformanceList = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const SubjectRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 1fr;
  }
`;

const SubjectName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1f3a57;

  @media (max-width: 768px) {
    grid-column: 1/-1;
  }
`;

const GradeValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #667eea;

  svg {
    font-size: 20px;
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.percentage}%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    grid-column: 2/-1;
  }
`;

const TrendIcon = styled.span`
  font-size: 18px;
  ${props => props.trend === 'up' ? 'color: #10b981;' : 'color: #ef4444;'}
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
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

const PerformanceSection = () => {
  const [performance, setPerformance] = useState([]);
  const [stats, setStats] = useState({ avgGrade: '0', highestScore: '0', lowestScore: '0', subjectsCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const response = await api.get('/api/v1/performance/getall');
      const data = response.data.performance || [];
      setPerformance(data);
      
      if (data.length > 0) {
        const scores = data.map(p => p.score || 0);
        const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        setStats({
          avgGrade: avgScore,
          highestScore: Math.max(...scores),
          lowestScore: Math.min(...scores),
          subjectsCount: data.length
        });
      }
    } catch (error) {
      console.error('Error fetching performance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeFromScore = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    return 'C';
  };

  return (
    <PerformanceContainer>
      <Sidebar />
      <Content>
        <PageHeader>
          <h1>📊 Performance</h1>
          <p>Track your academic progress and grades</p>
        </PageHeader>

        <StatsGrid>
          <StatCard color="#667eea">
            <MdGrade />
            <h3>{stats.avgGrade}%</h3>
            <p>Average Score</p>
          </StatCard>
          <StatCard color="#10b981">
            <MdTrendingUp />
            <h3>{stats.highestScore}%</h3>
            <p>Highest Score</p>
          </StatCard>
          <StatCard color="#f59e0b">
            <MdShowChart />
            <h3>{stats.lowestScore}%</h3>
            <p>Lowest Score</p>
          </StatCard>
          <StatCard color="#8b5cf6">
            <MdEmojiEvents />
            <h3>{stats.subjectsCount}</h3>
            <p>Subjects</p>
          </StatCard>
        </StatsGrid>

        {performance.length === 0 ? (
          <EmptyState>
            <MdShowChart />
            <h3>No Performance Data</h3>
            <p>Your performance data will appear here as you complete assignments and exams.</p>
          </EmptyState>
        ) : (
          <PerformanceList>
            {performance.map((item) => (
              <SubjectRow key={item._id}>
                <SubjectName>{item.subject}</SubjectName>
                <GradeValue>
                  <span>{getGradeFromScore(item.score || 0)}</span>
                  <TrendIcon trend={item.trend === 'up' ? 'up' : 'down'}>
                    {item.trend === 'up' ? '↑' : '↓'}
                  </TrendIcon>
                </GradeValue>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1f3a57' }}>
                  {item.score || 0}%
                </div>
                <ProgressBar percentage={item.score || 0} />
              </SubjectRow>
            ))}
          </PerformanceList>
        )}

        <ChartContainer>
          <h2 style={{ margin: '0 0 20px 0', color: '#1f3a57', fontSize: '20px' }}>Performance Trend</h2>
          <p style={{ textAlign: 'center', color: '#9ca3af', margin: '40px 0' }}>
            📈 Performance analytics chart coming soon...
          </p>
        </ChartContainer>
      </Content>
    </PerformanceContainer>
  );
};

export default PerformanceSection;
