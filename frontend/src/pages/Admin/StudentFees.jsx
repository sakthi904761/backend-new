import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import {
  StudentFeesContainer,
  Content,
  StudentFeesContent,
  StudentFeesHeader,
  AddStudentFeesForm,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonGroup,
  AddStudentFeesButton,
  ResetButton,
  StudentFeesList,
  StudentFeesCard,
  CardHeader,
  StudentName,
  CardActions,
  EditButton,
  DeleteButton,
  CardContent,
  CardField,
  CardLabel,
  CardValue,
  TotalFees,
  EmptyMessage,
  SuccessMessage,
  ErrorMessage,
} from '../../styles/StudentFeesStyles';

const StudentFees = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    department: '',
    tuitionFees: '',
    hostelFees: '',
    messFees: '',
  });

  const [studentFees, setStudentFees] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudentFees();
  }, []);

  const fetchStudentFees = async () => {
    try {
      const response = await api.get('/api/v1/studentfees/getall');
      setStudentFees(response.data.studentFees || []);
    } catch (error) {
      console.error('Error fetching student fees:', error);
      showMessage('error', 'Failed to fetch student fees');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.studentName.trim() ||
      !formData.rollNumber.trim() ||
      !formData.department.trim() ||
      !formData.tuitionFees ||
      !formData.hostelFees ||
      !formData.messFees
    ) {
      showMessage('error', 'Please fill all fields');
      return false;
    }
    return true;
  };

  const handleAddOrUpdateFees = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing) {
        // Update existing fees
        const response = await api.put(`/api/v1/studentfees/${editingId}`, formData);
        setStudentFees(
          studentFees.map((fee) =>
            fee._id === editingId ? response.data.studentFees : fee
          )
        );
        showMessage('success', 'Student fees updated successfully');
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new fees
        const response = await api.post('/api/v1/studentfees/', formData);
        fetchStudentFees();
        showMessage('success', 'Student fees added successfully');
      }

      // Reset form
      setFormData({
        studentName: '',
        rollNumber: '',
        department: '',
        tuitionFees: '',
        hostelFees: '',
        messFees: '',
      });
    } catch (error) {
      console.error('Error saving student fees:', error);
      const errorMsg =
        error.response?.data?.message || 'Failed to save student fees';
      showMessage('error', errorMsg);
    }
  };

  const handleEditFees = (fee) => {
    setFormData({
      studentName: fee.studentName,
      rollNumber: fee.rollNumber,
      department: fee.department,
      tuitionFees: fee.tuitionFees,
      hostelFees: fee.hostelFees,
      messFees: fee.messFees,
    });
    setIsEditing(true);
    setEditingId(fee._id);

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteFees = async (id) => {
    if (window.confirm('Are you sure you want to delete this student fees record?')) {
      try {
        await api.delete(`/api/v1/studentfees/${id}`);
        setStudentFees(studentFees.filter((fee) => fee._id !== id));
        showMessage('success', 'Student fees deleted successfully');
      } catch (error) {
        console.error('Error deleting student fees:', error);
        showMessage('error', 'Failed to delete student fees');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      rollNumber: '',
      department: '',
      tuitionFees: '',
      hostelFees: '',
      messFees: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <StudentFeesContainer>
      <Sidebar />
      <Content>
        <StudentFeesContent>
          <StudentFeesHeader>Student Fees Details</StudentFeesHeader>

          {message.text && (
            message.type === 'success' ? (
              <SuccessMessage>{message.text}</SuccessMessage>
            ) : (
              <ErrorMessage>{message.text}</ErrorMessage>
            )
          )}

          <AddStudentFeesForm onSubmit={handleAddOrUpdateFees}>
            <h3>{isEditing ? 'Edit Student Fees' : 'Add Student Fees'}</h3>

            <FormRow>
              <FormGroup>
                <FormLabel>Student Name *</FormLabel>
                <FormInput
                  type="text"
                  name="studentName"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Roll Number *</FormLabel>
                <FormInput
                  type="text"
                  name="rollNumber"
                  placeholder="Enter roll number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Department *</FormLabel>
                <FormInput
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel>Tuition Fees (₹) *</FormLabel>
                <FormInput
                  type="number"
                  name="tuitionFees"
                  placeholder="Enter tuition fees"
                  value={formData.tuitionFees}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Hostel Fees (₹) *</FormLabel>
                <FormInput
                  type="number"
                  name="hostelFees"
                  placeholder="Enter hostel fees"
                  value={formData.hostelFees}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Mess Fees (₹) *</FormLabel>
                <FormInput
                  type="number"
                  name="messFees"
                  placeholder="Enter mess fees"
                  value={formData.messFees}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </FormGroup>
            </FormRow>

            <ButtonGroup>
              <AddStudentFeesButton type="submit">
                {isEditing ? 'Update Fees' : 'Add Fees'}
              </AddStudentFeesButton>
              <ResetButton type="button" onClick={handleReset}>
                Reset
              </ResetButton>
            </ButtonGroup>
          </AddStudentFeesForm>

          <StudentFeesList>
            {studentFees.length === 0 ? (
              <EmptyMessage>No student fees records found. Add one to get started!</EmptyMessage>
            ) : (
              studentFees.map((fee) => (
                <StudentFeesCard key={fee._id}>
                  <CardHeader>
                    <StudentName>{fee.studentName}</StudentName>
                    <CardActions>
                      <EditButton onClick={() => handleEditFees(fee)}>
                        Edit
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteFees(fee._id)}>
                        Delete
                      </DeleteButton>
                    </CardActions>
                  </CardHeader>

                  <CardContent>
                    <CardField>
                      <CardLabel>Roll Number</CardLabel>
                      <CardValue>{fee.rollNumber}</CardValue>
                    </CardField>

                    <CardField>
                      <CardLabel>Department</CardLabel>
                      <CardValue>{fee.department}</CardValue>
                    </CardField>

                    <CardField>
                      <CardLabel>Tuition Fees</CardLabel>
                      <CardValue>₹{parseFloat(fee.tuitionFees).toFixed(2)}</CardValue>
                    </CardField>

                    <CardField>
                      <CardLabel>Hostel Fees</CardLabel>
                      <CardValue>₹{parseFloat(fee.hostelFees).toFixed(2)}</CardValue>
                    </CardField>

                    <CardField>
                      <CardLabel>Mess Fees</CardLabel>
                      <CardValue>₹{parseFloat(fee.messFees).toFixed(2)}</CardValue>
                    </CardField>

                    <CardField>
                      <CardLabel>Total Fees</CardLabel>
                      <TotalFees>₹{parseFloat(fee.totalFees).toFixed(2)}</TotalFees>
                    </CardField>
                  </CardContent>
                </StudentFeesCard>
              ))
            )}
          </StudentFeesList>
        </StudentFeesContent>
      </Content>
    </StudentFeesContainer>
  );
};

export default StudentFees;
