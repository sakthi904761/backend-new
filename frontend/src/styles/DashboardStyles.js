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