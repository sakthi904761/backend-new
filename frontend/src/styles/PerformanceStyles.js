// PerformanceStyles.js
import styled from 'styled-components';

export const PerformanceContainer = styled.div`
  display: flex;
  /* Sidebar is fixed; content offset handled via --sidebar-width */
`;

export const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 250px);
  transition: margin-left 0.3s ease;
`;

export const PerformanceContent = styled.div`
  padding: 20px;
`;

export const PerformanceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const SchoolPerformance = styled.div`
  margin-bottom: 20px;
`;

export const IndividualPerformance = styled.div``;

export const SidebarContainer = styled.div`
  /* Sidebar is fixed; wrapper should not reserve space */
  flex: 0 0 0;
  width: 0;
`;

export const PerformanceInfo = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const PerformanceGraphContainer = styled.div`
  margin-bottom: 20px;
`;

export const TotalMarks = styled.div`
  font-weight: bold;
`;
