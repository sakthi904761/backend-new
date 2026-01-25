import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

const ToggleLink = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
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

const StudentSignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    registrationNumber: '',
    class: '',
  });
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
      const response = await api.post('/api/v1/students/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        
        // Store student info in localStorage
        localStorage.setItem('studentAuth', JSON.stringify(response.data.student));
        
        // Redirect to student dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/student/dashboard');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.registrationNumber || !formData.class || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage('Please fill in all required fields!');
      setMessageType('error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      setMessageType('error');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters!');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/v1/students/register', {
        name: formData.name,
        registrationNumber: formData.registrationNumber,
        class: formData.class,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data.success) {
        setMessage('Registration successful! Please login to continue.');
        setMessageType('success');
        
        // Reset form and switch to login
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            email: response.data.student.email,
            password: '',
            confirmPassword: '',
            name: '',
            registrationNumber: '',
            class: '',
          });
          setMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInContainer>
      <SignInCard>
        <Header>👨‍🎓 Student Portal</Header>
        <SubHeader>{isLogin ? 'Sign in to your account' : 'Create your account'}</SubHeader>

        {message && (
          <Message type={messageType}>
            {message}
          </Message>
        )}

        <Form onSubmit={isLogin ? handleSignIn : handleRegister}>
          {!isLogin && (
            <>
              <FormGroup>
                <Label htmlFor="name">📝 Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="registrationNumber">🔢 Roll Number</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="class">🏫 Class/Grade</Label>
                <Input
                  id="class"
                  name="class"
                  type="text"
                  placeholder="e.g., 10-A, Class 12, Grade 9"
                  value={formData.class}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </FormGroup>
            </>
          )}

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
              placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormGroup>

          {!isLogin && (
            <FormGroup>
              <Label htmlFor="confirmPassword">🔐 Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </FormGroup>
          )}

          <SignInButton type="submit" disabled={loading}>
            {loading ? '⏳ Processing...' : isLogin ? '🔓 Sign In' : '✅ Register'}
          </SignInButton>
        </Form>

        <ToggleLink>
          {isLogin ? (
            <>
              Don't have an account? <a onClick={() => setIsLogin(false)}>Register here</a>
            </>
          ) : (
            <>
              Already have an account? <a onClick={() => setIsLogin(true)}>Sign in here</a>
            </>
          )}
        </ToggleLink>

        <InfoBox>
          <strong>📝 Note:</strong> {isLogin ? 'If you don\'t have an account, please register first using your roll number and class.' : 'Use your correct email and roll number for registration. You\'ll need these to login later.'}
        </InfoBox>
      </SignInCard>
    </SignInContainer>
  );
};

export default StudentSignIn;
