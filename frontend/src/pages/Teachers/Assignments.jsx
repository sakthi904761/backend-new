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
            <AddAssignmentButton type="submit">Add Assignment</AddAssignmentButton>
          </AddAssignmentForm>
          <AssignmentList>
            {assignments.map((assignment, index) => (
              assignment ? (
                <AssignmentItem key={assignment._id || assignment.id || index}>
                  <strong>{assignment.title || ''}: </strong>
                  {assignment.description || ''}, {assignment.grade || ''}, {assignment.deadline || ''}
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
