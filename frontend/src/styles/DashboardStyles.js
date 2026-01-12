// AdminDashboardStyles.js
import styled from 'styled-components';

export const AdminDashboardContainer = styled.div`
  display: flex;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
  margin-left: var(--sidebar-width, 250px);
  transition: margin-left 0.3s ease;
  overflow-y: auto;
`;

export const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

/* New TopBar styles for header/menu interactions */
export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchInput = styled.input`
  background: #fff;
  border: 1px solid #e6eef8;
  padding: 10px 12px;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 2px 8px rgba(16,24,40,0.04);
  transition: box-shadow 160ms ease, border-color 160ms ease;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 4px 18px rgba(0,123,255,0.08);
  }

  @media (max-width: 768px) {
    width: 180px;
  }
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
`;

export const Section = styled.section`
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #007bff, #0056b3);
    border-radius: 2px;
    margin-right: 12px;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e8ecf1;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #007bff, #0056b3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    border-color: #007bff;
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CardContent = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
`;

export const StudentDashboardContainer = styled.div`
  display: flex;
  background-color: #f5f7fa;
`;

export const TeacherDashboardContainer = styled.div`
  display: flex;
  background-color: #f5f7fa;
`;
/* ===== Teacher-specific header & metric styles ===== */
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Greeting = styled.div`
  h1 {
    margin: 0 0 6px 0;
    font-size: 24px;
    color: #1f2937;
  }
  p {
    margin: 0;
    color: #4b5563;
    font-size: 14px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
  color: white;
  padding: ${props => props.small ? '6px 10px' : '10px 16px'};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(102,126,234,0.18);
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover { transform: translateY(-2px); }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: #fff;
  color: #374151;
  box-shadow: 0 2px 8px rgba(16,24,40,0.06);
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 18px;
  margin-top: 12px;
`;

export const MetricCard = styled.div`
  background: linear-gradient(180deg,#ffffff 0%,#f8fafc 100%);
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(14,30,37,0.04);
  border: 1px solid #e6eef8;
  display:flex;
  align-items:center;
  gap: 14px;
`;

export const MetricIcon = styled.div`
  background: linear-gradient(135deg,#eef2ff 0%,#e9d5ff 100%);
  color: #4f46e5;
  padding: 12px;
  border-radius: 10px;
  font-size: 20px;
  display: inline-flex;
  align-items:center;
  justify-content:center;
`;

export const MetricLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const MetricValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
`;

export const ClassesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(15,23,42,0.04);
  td, th {
    padding: 12px 16px;
    text-align: left;
  }
  tbody tr:nth-child(odd){ background:#fbfafd }
`;

export const TableHeader = styled.th`
  background: linear-gradient(180deg,#f8fafc,#eef2ff);
  color:#374151;
  font-weight:600;
`;

export const ActivityList = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
`;

export const ActivityItem = styled.div`
  background:#fff;
  padding:10px 12px;
  border-radius:8px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:#374151;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  small { color:#6b7280; }
`;
