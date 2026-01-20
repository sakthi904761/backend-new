// TeacherAnnouncementSection.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';
import Sidebar from './Sidebar';
import { BsXCircle, BsClock, BsPersonCircle, BsPencil, BsTrash } from 'react-icons/bs';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 250px);
  padding: 40px 30px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
  background: white;
  padding: 30px 35px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 15px;
  margin: 0;
`;

const FormSection = styled.div`
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  border-left: 4px solid #667eea;
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0 0 25px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const AnnouncementListSection = styled.div`
  margin-top: 40px;
`;

const ListTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const AnnouncementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AnnouncementCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #10b981;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

const AnnouncementHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorIcon = styled.div`
  font-size: 28px;
  color: #667eea;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0;
`;

const AuthorRole = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 2px 0 0 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #9ca3af;
  transition: all 0.2s ease;
  padding: 6px;

  &:hover {
    color: ${props => props.danger ? '#ef4444' : '#667eea'};
  }
`;

const AnnouncementText = styled.p`
  color: #374151;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 12px 0;
`;

const AnnouncementMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #9ca3af;
`;

const TimeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  color: #d1d5db;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  color: #9ca3af;
  font-size: 15px;
  margin: 0;
`;

const AlertMessage = styled.div`
  padding: 14px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  ${props => props.type === 'error' ? `
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  ` : `
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  `}
`;

const CheckAnnouncementSection = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Failed to load announcements');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!announcement.trim()) {
      setError('Please enter an announcement');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post('/api/v1/announcements', {
        announcement: announcement,
      });
      setSuccess('Announcement posted successfully!');
      setAnnouncement('');
      fetchAnnouncements();
      setTimeout(() => setSuccess(null), 4000);
    } catch (error) {
      console.error('Error sending announcement:', error);
      setError('Error posting announcement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAnnouncement('');
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      setError(null);
      console.log('Deleting announcement with ID:', id);
      const response = await api.delete(`/api/v1/announcements/${id}`);
      console.log('Delete response:', response.data);
      setSuccess('Announcement deleted successfully!');
      fetchAnnouncements();
      setTimeout(() => setSuccess(null), 4000);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error deleting announcement. Please try again.';
      setError(errorMsg);
      console.error('Full error response:', error.response);
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <Title>Announcements</Title>
          <Subtitle>Post and manage announcements for your students and staff</Subtitle>
        </Header>

        {error && <AlertMessage type="error"><BsXCircle /> {error}</AlertMessage>}
        {success && <AlertMessage type="success">✓ {success}</AlertMessage>}

        <FormSection>
          <FormTitle>📢 Post New Announcement</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="announcement">Announcement Message *</Label>
              <TextArea
                id="announcement"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Write your announcement here... (e.g., Class cancellation, Important notice, Assignment deadline, etc.)"
                disabled={loading}
              />
            </FormGroup>

            <ButtonGroup>
              <Button primary type="submit" disabled={loading}>
                {loading ? 'Publishing...' : '📤 Post Announcement'}
              </Button>
              <Button type="button" onClick={handleClear} disabled={loading}>
                Clear
              </Button>
            </ButtonGroup>
          </form>
        </FormSection>

        <AnnouncementListSection>
          <ListTitle>📝 Recent Announcements</ListTitle>
          {announcements.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📭</EmptyIcon>
              <EmptyText>No announcements yet. Start by posting your first announcement above!</EmptyText>
            </EmptyState>
          ) : (
            <AnnouncementList>
              {announcements.map((ann) => (
                <AnnouncementCard key={ann._id}>
                  <AnnouncementHeader>
                    <AuthorSection>
                      <AuthorIcon><BsPersonCircle /></AuthorIcon>
                      <AuthorInfo>
                        <AuthorName>School Portal</AuthorName>
                        <AuthorRole>Teacher Announcement</AuthorRole>
                      </AuthorInfo>
                    </AuthorSection>
                    <ActionButtons>
                      <IconButton title="Edit">
                        <BsPencil />
                      </IconButton>
                      <IconButton danger title="Delete" onClick={() => handleDelete(ann._id)}>
                        <BsTrash />
                      </IconButton>
                    </ActionButtons>
                  </AnnouncementHeader>
                  
                  <AnnouncementText>{ann.announcement}</AnnouncementText>
                  
                  <AnnouncementMeta>
                    <TimeIcon>
                      <BsClock />
                      {new Date(ann.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TimeIcon>
                  </AnnouncementMeta>
                </AnnouncementCard>
              ))}
            </AnnouncementList>
          )}
        </AnnouncementListSection>
      </Content>
    </Container>
  );
};

export default CheckAnnouncementSection;
