// EventCalendarStyles.js
import styled from 'styled-components';

export const EventCalendarContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 250px);
  transition: margin-left 0.3s ease;
  padding: 0;
  
  @media (max-width: 768px) {
    margin-left: 80px;
  }
`;

export const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 20px;
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const HeaderSubtitle = styled.p`
  margin: 8px 0 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
`;

export const CurrentTime = styled.div`
  font-size: 14px;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 500;
  
  @media (max-width: 768px) {
    margin-top: 15px;
    width: 100%;
    text-align: center;
  }
`;

export const MainContent = styled.div`
  padding: 40px 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 40px;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

export const FormTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FormTitleIcon = styled.span`
  font-size: 24px;
`;

export const AddEventForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const EventInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: #f8f9ff;
  }
  
  &::placeholder {
    color: #cbd5e0;
  }
  
  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AddEventButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const AddEventButtonIcon = styled.span`
  font-size: 18px;
`;

export const ErrorText = styled.p`
  color: #e53e3e;
  margin-top: 12px;
  padding: 12px 16px;
  background: #fff5f5;
  border-left: 4px solid #e53e3e;
  border-radius: 6px;
  font-size: 14px;
`;

export const SuccessText = styled.p`
  color: #22863a;
  margin-top: 12px;
  padding: 12px 16px;
  background: #f0f9ff;
  border-left: 4px solid #22863a;
  border-radius: 6px;
  font-size: 14px;
`;

export const EventsSection = styled.div`
  margin-top: 40px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SectionTitleIcon = styled.span`
  font-size: 24px;
`;

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Event = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-left-color: #764ba2;
  }
`;

export const EventContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex: 1;
`;

export const EventNumber = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  min-width: 40px;
  text-align: center;
  background: rgba(102, 126, 234, 0.1);
  padding: 8px;
  border-radius: 8px;
`;

export const EventText = styled.p`
  margin: 0;
  color: #2d3748;
  font-size: 15px;
  line-height: 1.6;
  word-wrap: break-word;
  flex: 1;
`;

export const EventActions = styled.div`
  display: flex;
  gap: 8px;
  min-width: fit-content;
`;

export const DeleteButton = styled.button`
  background: #fff5f5;
  border: 2px solid #feb2b2;
  color: #c53030;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  
  &:hover {
    background: #fc8181;
    border-color: #c53030;
    color: white;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const EmptyText = styled.p`
  color: #718096;
  font-size: 16px;
  margin: 0;
`;

export const CalendarContainer = styled.div`
  display: none;
`;
