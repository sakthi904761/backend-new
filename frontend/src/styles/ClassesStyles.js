// ClassesStyles.js
import styled from 'styled-components';

export const ClassesContainer = styled.div`
  display: flex;
  /* Sidebar is fixed; content will offset using the CSS variable */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 250px);
  transition: margin-left 0.3s ease;
`;

export const ClassesContent = styled.div`
  padding: 20px;
`;

export const ClassesHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 18px;
  display:flex;
  align-items:center;
  gap:12px;
`;

export const Toolbar = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
  margin-bottom: 18px;
  flex-wrap:wrap;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  min-width: 260px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

export const ClassItem = styled.li`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 14px 16px;
  box-shadow: 0 6px 18px rgba(6,8,18,0.06);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  transition: transform 120ms ease, box-shadow 120ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(6,8,18,0.08);
  }
`;

export const ClassName = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const ClassActions = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
`;

export const ActionButton = styled.button.attrs({ type: 'button' })`
  border: none;
  background: transparent;
  padding: 6px 8px;
  border-radius: 6px;
  cursor:pointer;
  color: #374151;

  &:hover { background: rgba(15,23,42,0.04); }
`;

export const AddClassForm = styled.form`
  margin-bottom: 18px;
  display:flex;
  gap:8px;
  align-items:center;
`;

export const AddClassInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const AddClassButton = styled.button`
  padding: 8px 12px;
  background: linear-gradient(90deg,#2563eb,#1e40af);
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;


export const ClassContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  /* Sidebar is fixed; wrapper should not reserve space */
  flex: 0 0 0;
  width: 0;
`;

export const ClassHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const GradeHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;
