import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 260px);
  padding: 40px 30px;
  transition: margin-left 240ms ease;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  background: white;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f3a57;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-top: 5px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 700px;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 200ms ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #f9fafb;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: all 200ms ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #f9fafb;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SendButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResetButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;
  flex: 1;

  &:hover {
    background: #e5e7eb;
  }
`;

const Alert = styled.div`
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 300ms ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SuccessAlert = styled(Alert)`
  background: #ecfdf5;
  color: #065f46;
  border-left: 4px solid #10b981;
`;

const ErrorAlert = styled(Alert)`
  background: #fef2f2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.to.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('/api/v1/email/send', {
        to: formData.to,
        subject: formData.subject,
        message: formData.message,
      });

      if (response.data.success) {
        setSuccessMessage('✓ Email sent successfully!');
        setFormData({ to: '', subject: '', message: '' });
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send email. Please try again.';
      setErrorMessage(errorMsg);
      console.error('Email send error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ to: '', subject: '', message: '' });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <div>
            <Title>Send Email</Title>
            <Subtitle>Communicate with students and staff</Subtitle>
          </div>
        </Header>

        <Card>
          {successMessage && (
            <SuccessAlert>
              <span>✓</span>
              {successMessage}
            </SuccessAlert>
          )}
          {errorMessage && (
            <ErrorAlert>
              <span>✕</span>
              {errorMessage}
            </ErrorAlert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="to">Recipient Email Address</Label>
              <Input
                id="to"
                type="email"
                name="to"
                placeholder="student@school.com"
                value={formData.to}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                type="text"
                name="subject"
                placeholder="e.g., Assignment Reminder, Class Update"
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="Write your email message here..."
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </FormGroup>

            <ButtonGroup>
              <SendButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoadingSpinner /> Sending...
                  </>
                ) : (
                  '📧 Send Email'
                )}
              </SendButton>
              <ResetButton type="button" onClick={handleReset} disabled={loading}>
                Clear
              </ResetButton>
            </ButtonGroup>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

export default SendEmail;
