// AssignmentSection.js
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Sidebar from './Sidebar';
import { AssignmentsContainer, Content, AssignmentsContent, AssignmentsHeader, AssignmentList, AssignmentItem, AddAssignmentForm, 
  AddAssignmentInput, AddAssignmentTextArea, AddAssignmentButton } from '../../styles/AssignmentsStyles'; 

const AssignmentSection = () => {
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/api/v1/assignments/getall');
      setAssignments(response.data.assignments || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
      try {
        const response = await api.post('/api/v1/assignments', newAssignment);
        // Some environments return the created object, others return only a message with 201 status.
        const created = response.data && response.data.assignment ? response.data.assignment : null;
        if (created) {
          setAssignments(prev => [...prev, created]);
        } else if (response.status === 201) {
          // Backend accepted creation but didn't return the object; refresh list to sync UI
          await fetchAssignments();
        } else {
          // unexpected response
          console.warn('Unexpected add-assignment response', response);
          window.alert('Assignment added, but unexpected response from server; refreshing list.');
          await fetchAssignments();
        }
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        const serverMessage = error?.response?.data?.message || error.message || 'Add failed';
        window.alert(`Error adding assignment: ${serverMessage}`);
      }
    } else {
      window.alert('Please fill all fields');
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        if (!assignmentId || assignmentId.trim() === '') {
          window.alert('Invalid assignment ID');
          return;
        }
        await api.delete(`/api/v1/assignments/${assignmentId}`);
        setAssignments(prev => prev.filter(a => (a._id || a.id) !== assignmentId));
        window.alert('Assignment deleted successfully');
      } catch (error) {
        console.error('Error deleting assignment:', error);
        const serverMessage = error?.response?.data?.message || error.message || 'Delete failed';
        window.alert(`Error deleting assignment: ${serverMessage}`);
      }
    }
  };

  const handleDeleteAllAssignments = async () => {
    if (window.confirm('Are you sure you want to delete ALL assignments? This action cannot be undone!')) {
      try {
        await api.delete('/api/v1/assignments/delete-all');
        setAssignments([]);
        window.alert('All assignments deleted successfully!');
      } catch (error) {
        console.error('Error deleting all assignments:', error);
        const serverMessage = error?.response?.data?.message || error.message || 'Delete all failed';
        window.alert(`Error deleting all assignments: ${serverMessage}`);
      }
    }
  };

  return (
    <AssignmentsContainer>
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Assignments</AssignmentsHeader>
          <AddAssignmentForm onSubmit={handleAddAssignment}>
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder="Enter assignment description"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment grade"
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment deadline"
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            />
            <AddAssignmentButton type="submit">Add Assignment</AddAssignmentButton>          {assignments.length > 0 && (
            <button 
              type="button"
              onClick={handleDeleteAllAssignments}
              style={{
                background: '#c0392b',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                marginLeft: '10px'
              }}
            >
              🗑️ Delete All Assignments
            </button>
          )}          </AddAssignmentForm>
          <AssignmentList>
            {assignments.map((assignment, index) => (
              assignment ? (
                <AssignmentItem key={assignment._id || assignment.id || index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>
                      <strong>{assignment.title || ''}: </strong>
                      {assignment.description || ''}, {assignment.grade || ''}, {assignment.deadline || ''}
                    </span>
                    <button 
                      onClick={() => handleDeleteAssignment(assignment._id || assignment.id)}
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
                  </div>
                </AssignmentItem>
              ) : null
            ))}
          </AssignmentList>
        </AssignmentsContent>
      </Content>
    </AssignmentsContainer>
  );
};

export default AssignmentSection;
