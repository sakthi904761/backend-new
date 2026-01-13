// Classes.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import {
  ClassesContainer,
  Content,
  ClassesContent,
  ClassesHeader,
  ClassList,
  ClassItem,
  AddClassForm,
  AddClassInput,
  AddClassButton,
  Toolbar,
  ClassName,
  ClassActions,
  ActionButton,
} from '../../styles/ClassesStyles';

const Classes = () => {
  const [newClassName, setNewClassName] = useState('');
  const [classes, setClasses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        const response = await api.post('/api/v1/class', { grade: newClassName });
        const created = response.data && response.data.class ? response.data.class : null;
        if (created) {
          setClasses(prev => Array.isArray(prev) ? [...prev, created] : [created]);
        } else if (response.status === 201) {
          await fetchClasses();
        }
        setNewClassName('');
      } catch (error) {
        console.error('Error adding class:', error);
        window.alert('Add failed, see console');
      }
    }
  };

  const handleStartEdit = (c) => {
    setEditingId(c._id);
    setEditingValue(c.grade);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingValue('');
  };

  const handleSaveEdit = async (id) => {
    if (!editingValue.trim()) return window.alert('Class name cannot be empty');
    try {
      const res = await api.put(`/api/v1/class/${id}`, { grade: editingValue });
      const updated = res.data && res.data.class ? res.data.class : null;
      if (updated) {
        setClasses(prev => prev.map(p => p._id === updated._id ? updated : p));
      } else {
        await fetchClasses();
      }
      handleCancelEdit();
      window.alert('Updated');
    } catch (err) {
      console.error('Update failed', err);
      window.alert('Update failed');
    }
  };

  const handleDeleteClass = async (id) => {
    if (!id) return window.alert('Invalid class id');
    if (!window.confirm('Delete this class?')) return;
    try {
      const res = await api.delete(`/api/v1/class/${id}`);
      // success
      setClasses(prev => prev.filter(p => p._id !== id));
      window.alert(res.data && res.data.message ? `Deleted: ${res.data.message}` : 'Deleted');
    } catch (err) {
      console.error('Delete failed', err);
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err.message || 'Unknown error';
      const url = err?.response?.request?.responseURL || err?.config?.baseURL || err?.config?.url || 'unknown';
      window.alert(`Delete failed (${status || 'no-status'} - ${url}): ${msg}`);
    }
  };

  const filtered = classes;

  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassesHeader>Classes</ClassesHeader>
          <Toolbar>
            <AddClassForm onSubmit={handleAddClass}>
              <AddClassInput
                type="text"
                placeholder="New class name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
              <AddClassButton type="submit">Add Class</AddClassButton>
            </AddClassForm>
          </Toolbar>

          <ClassList>
            {Array.isArray(filtered) && filtered.map((classItem) => (
              <ClassItem key={classItem._id}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  {editingId === classItem._id ? (
                    <input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} />
                  ) : (
                    <ClassName>{classItem.grade}</ClassName>
                  )}
                </div>

                <ClassActions>
                  {editingId === classItem._id ? (
                    <>
                      <ActionButton onClick={(e) => { e.preventDefault(); handleSaveEdit(classItem._id); }}>Save</ActionButton>
                      <ActionButton onClick={(e) => { e.preventDefault(); handleCancelEdit(); }}>Cancel</ActionButton>
                    </>
                  ) : (
                    <>
                      <ActionButton onClick={(e) => { e.preventDefault(); handleStartEdit(classItem); }}>Edit</ActionButton>
                      <ActionButton onClick={(e) => { e.preventDefault(); handleDeleteClass(classItem._id); }}>Delete</ActionButton>
                    </>
                  )}
                </ClassActions>
              </ClassItem>
            ))}
          </ClassList>
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default Classes;
