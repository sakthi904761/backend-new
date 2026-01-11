// StudentFeesStyles.js
import styled from 'styled-components';

export const StudentFeesContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 250px);
  transition: margin-left 0.3s ease;
`;

export const StudentFeesContent = styled.div`
  padding: 20px;
`;

export const StudentFeesHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

export const AddStudentFeesForm = styled.form`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const AddStudentFeesButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #218838;
  }
`;

export const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #5a6268;
  }
`;

export const StudentFeesList = styled.div`
  display: grid;
  gap: 15px;
`;

export const StudentFeesCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

export const StudentName = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DeleteButton = styled.button`
  padding: 8px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #c82333;
  }
`;

export const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

export const CardField = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

export const CardLabel = styled.p`
  font-weight: bold;
  color: #666;
  margin: 0 0 5px 0;
  font-size: 12px;
  text-transform: uppercase;
`;

export const CardValue = styled.p`
  margin: 0;
  color: #333;
  font-size: 16px;
`;

export const TotalFees = styled(CardValue)`
  color: #28a745;
  font-weight: bold;
  font-size: 18px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
`;

export const SuccessMessage = styled.div`
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const ErrorMessage = styled.div`
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 15px;
`;
