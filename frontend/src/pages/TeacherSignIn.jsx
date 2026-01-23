import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import styled from 'styled-components';

const SignInContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const SignInCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Header = styled.h1`
  color: #667eea;
  text-align: center;
  margin-bottom: 10px;
  font-size: 28px;
`;

const SubHeader = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
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
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SignInButton = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-size: 13px;
  margin-bottom: 15px;
  
  ${props => props.type === 'error' ? `
    background-color: #fee;
    color: #c33;
    border: 1px solid #fcc;
  ` : `
    background-color: #efe;
    color: #3c3;
    border: 1px solid #cfc;
  `}
`;

const InfoBox = styled.div`
  background-color: #f0f4ff;
  border-left: 4px solid #667eea;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  font-size: 13px;
  color: #333;

  strong {
    color: #667eea;
  }
`;

const TeacherSignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields!');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/v1/teachers/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        
        // Store teacher info in localStorage
        localStorage.setItem('teacherAuth', JSON.stringify(response.data.teacher));
        
        // Redirect to teacher panel after 1.5 seconds
        setTimeout(() => {
          navigate('/teacher/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInContainer>
      <SignInCard>
        <Header>👨‍🏫 Teacher Panel</Header>
        <SubHeader>Sign in to your account</SubHeader>

        {message && (
          <Message type={messageType}>
            {message}
          </Message>
        )}

        <Form onSubmit={handleSignIn}>
          <FormGroup>
            <Label htmlFor="email">📧 Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@school.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">🔐 Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormGroup>

          <SignInButton type="submit" disabled={loading}>
            {loading ? '⏳ Signing in...' : '🔓 Sign In'}
          </SignInButton>
        </Form>

        <InfoBox>
          <strong>📝 Note:</strong> Contact your administrator to register if you don't have an account. Credentials are provided by the admin panel.
        </InfoBox>
      </SignInCard>
    </SignInContainer>
  );
};

export default TeacherSignIn;
