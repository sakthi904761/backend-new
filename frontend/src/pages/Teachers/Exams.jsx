// CheckExamSection.js
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Sidebar from './Sidebar';
import { ExamContainer, SidebarContainer, Content, ExamHeader, ExamForm, FormLabel, FormInput, AddButton } 
from '../../styles/ExamStyles'; 

const CheckExamSection = () => {
  const [examData, setExamData] = useState([]);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [className, setClassName] = useState('');
  const [marks, setMarks] = useState('');

  useEffect(() => {
    fetchExams(); // Fetch exams on component mount
  }, []);

  const fetchExams = async () => {
    try {
      const response = await api.get('/api/v1/exam/getall');
      console.log('Exams response:', response.data); // Debug log
      setExamData(response.data.exams || []);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    const newExam = { name, registrationNumber, className, marks: parseInt(marks) };
    try {
      await api.post('/api/v1/exam', newExam);
      // refresh list after successful add
      await fetchExams();
      setName('');
      setRegistrationNumber('');
      setClassName('');
      setMarks('');
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam record?')) {
      try {
        // Make sure we have a valid ID
        if (!examId || examId.toString().trim() === '') {
          window.alert('Invalid exam ID');
          return;
        }
        console.log('Deleting exam with ID:', examId); // Debug log
        await api.delete(`/api/v1/exam/${examId}`);
        setExamData(prev => prev.filter(e => (e._id || e.id) !== examId));
        await fetchExams(); // Refresh the list to ensure sync
        window.alert('Exam record deleted successfully');
      } catch (error) {
        console.error('Error deleting exam:', error);
        console.error('Delete error response:', error?.response?.data); // Debug log
        const serverMessage = error?.response?.data?.message || error.message || 'Delete failed';
        window.alert(`Error deleting exam: ${serverMessage}`);
      }
    }
  };

  const handleDeleteAllExams = async () => {
    if (window.confirm('Are you sure you want to delete ALL exam records? This action cannot be undone!')) {
      try {
        await api.delete('/api/v1/exam/delete-all');
        setExamData([]);
        window.alert('All exam records deleted successfully!');
      } catch (error) {
        console.error('Error deleting all exams:', error);
        const serverMessage = error?.response?.data?.message || error.message || 'Delete all failed';
        window.alert(`Error deleting all exams: ${serverMessage}`);
      }
    }
  };

  const calculateTotalMarks = () => {
    let total = 0;
    for (let i = 0; i < examData.length; i++) {
      total += examData[i].marks;
    }
    return total;
  };

  return (
    <ExamContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ExamHeader>Exam Details</ExamHeader>
        <ExamForm onSubmit={handleAddExam}>
          <FormLabel>Name:</FormLabel>
          <FormInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormLabel>Registration Number:</FormLabel>
          <FormInput
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
          <FormLabel>Class:</FormLabel>
          <FormInput
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
          <FormLabel>Marks:</FormLabel>
          <FormInput
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
          <AddButton type="submit">Add Exam</AddButton>
        </ExamForm>
        <h2>Total Marks: {calculateTotalMarks()}</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>Exam Details:</h3>
          {examData.length > 0 && (
            <button
              onClick={handleDeleteAllExams}
              style={{
                background: '#c0392b',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                marginLeft: 'auto'
              }}
            >
              🗑️ Delete All
            </button>
          )}
        </div>
        <ul>
          {examData.map((exam, index) => (
            <li key={exam._id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
              <span>
                Name: {exam.name}, Registration Number: {exam.registrationNumber}, Class: {exam.className}, Marks: {exam.marks}
              </span>
              <button 
                onClick={() => handleDeleteExam(exam._id || exam.id)}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      </Content>
    </ExamContainer>
  );
};

export default CheckExamSection;
