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

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 2px solid #e5e7eb;
`;

const Tab = styled.button`
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? '#667eea' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 14px;
  cursor: pointer;
  transition: all 200ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    color: #667eea;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const FilterSection = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 200ms ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #f9fafb;
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #1e40af;
  font-size: 13px;
`;

const FeesReportContainer = styled.div`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
`;

const FeesReportHeader = styled.h3`
  margin: 0 0 15px 0;
  color: #1f3a57;
  font-size: 18px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
`;

const FeesReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeesItem = styled.div`
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #667eea;

  label {
    display: block;
    font-size: 12px;
    color: #6b7280;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  span {
    display: block;
    font-size: 16px;
    color: #111827;
    font-weight: 600;
  }
`;

const TotalFeesItem = styled(FeesItem)`
  grid-column: span 2;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-left-color: #667eea;

  span {
    font-size: 24px;
    color: #667eea;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const SearchButton = styled(Button)`
  background: #10b981;
  color: white;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SendEmail = () => {
  const [emailMode, setEmailMode] = useState('direct'); // 'direct', 'attendance', or 'fees'
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
    class: '',
    startDate: '',
    endDate: '',
    rollNumber: '',
    studentEmail: '',
    parentEmail: '',
  });
  const [feesData, setFeesData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchRollNumber = async () => {
    if (!formData.rollNumber.trim()) {
      setErrorMessage('Please enter a roll number');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setSearching(true);
    setErrorMessage('');
    setFeesData(null);
    setStudentData(null);

    try {
      const response = await api.get(`/api/v1/studentfees/search/${formData.rollNumber.trim()}`);
      
      if (response.data.success) {
        setFeesData(response.data.fees);
        setStudentData(response.data.student);
      } else {
        setErrorMessage(response.data.message || 'Student fees record not found');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to search student fees. Please try again.';
      setErrorMessage(errorMsg);
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleModeChange = (mode) => {
    setEmailMode(mode);
    setFormData({
      to: '',
      subject: '',
      message: '',
      class: '',
      startDate: '',
      endDate: '',
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleDirectEmailSubmit = async (e) => {
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
        setFormData(prev => ({ ...prev, to: '', subject: '', message: '' }));
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

  const handleAttendanceReportSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.class || !formData.startDate || !formData.endDate) {
      setErrorMessage('Please fill in all fields');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setErrorMessage('Start date must be before end date');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('/api/v1/email/attendance-report', {
        grade: formData.class,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      if (response.data.success) {
        setSuccessMessage(`✓ Attendance reports sent to ${response.data.results.successful} parent(s)!`);
        setFormData(prev => ({ ...prev, class: '', startDate: '', endDate: '' }));
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send attendance reports. Please try again.';
      setErrorMessage(errorMsg);
      console.error('Attendance report error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeesReportSubmit = async (e) => {
    e.preventDefault();
    
    if (!feesData || !studentData) {
      setErrorMessage('Please search for a student first');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    if (!formData.studentEmail && !formData.parentEmail) {
      setErrorMessage('Please enter at least one email address (student or parent)');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('/api/v1/email/fees-report', {
        rollNumber: formData.rollNumber,
        studentEmail: formData.studentEmail || null,
        parentEmail: formData.parentEmail || null,
      });

      if (response.data.success) {
        const recipients = [];
        if (formData.studentEmail) recipients.push('student');
        if (formData.parentEmail) recipients.push('parent');
        
        setSuccessMessage(`✓ Fees report sent to ${recipients.join(' & ')}!`);
        setFormData(prev => ({ 
          ...prev, 
          rollNumber: '',
          studentEmail: '',
          parentEmail: '',
        }));
        setFeesData(null);
        setStudentData(null);
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send fees report. Please try again.';
      setErrorMessage(errorMsg);
      console.error('Fees report error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      to: '',
      subject: '',
      message: '',
      class: '',
      startDate: '',
      endDate: '',
    });
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
            <Subtitle>Communicate with students and parents</Subtitle>
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

          <TabContainer>
            <Tab 
              active={emailMode === 'direct'} 
              onClick={() => handleModeChange('direct')}
              disabled={loading}
            >
              📧 Direct Email
            </Tab>
            <Tab 
              active={emailMode === 'attendance'} 
              onClick={() => handleModeChange('attendance')}
              disabled={loading}
            >
              📊 Attendance Report
            </Tab>
            <Tab 
              active={emailMode === 'fees'} 
              onClick={() => handleModeChange('fees')}
              disabled={loading}
            >
              💰 Student Fees Report
            </Tab>
          </TabContainer>

          {emailMode === 'direct' ? (
            <Form onSubmit={handleDirectEmailSubmit}>
              <FormGroup>
                <Label htmlFor="to">Recipient Email Address</Label>
                <Input
                  id="to"
                  type="email"
                  name="to"
                  placeholder="student@school.com or parent@gmail.com"
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
          ) : emailMode === 'attendance' ? (
            <Form onSubmit={handleAttendanceReportSubmit}>
              <FilterSection>
                <FormGroup>
                  <Label htmlFor="class">Class</Label>
                  <Select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="A">Class A</option>
                    <option value="B">Class B</option>
                    <option value="C">Class C</option>
                    <option value="D">Class D</option>
                    <option value="E">Class E</option>
                    <option value="F">Class F</option>
                    <option value="G">Class G</option>
                    <option value="H">Class H</option>
                    <option value="I">Class I</option>
                    <option value="J">Class J</option>
                    <option value="K">Class K</option>
                    <option value="L">Class L</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </FormGroup>
              </FilterSection>

              <InfoBox>
                <p style={{ margin: 0, fontSize: '13px' }}>
                  ℹ️ Attendance reports will be automatically sent to parents of students in the selected class for the specified date range.
                </p>
              </InfoBox>

              <ButtonGroup>
                <SendButton type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner /> Sending Reports...
                    </>
                  ) : (
                    '📊 Send Attendance Reports'
                  )}
                </SendButton>
                <ResetButton type="button" onClick={handleReset} disabled={loading}>
                  Clear
                </ResetButton>
              </ButtonGroup>
            </Form>
          ) : (
            <Form onSubmit={handleFeesReportSubmit}>
              <FormGroup>
                <Label htmlFor="rollNumber">Search by Roll Number</Label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Input
                    id="rollNumber"
                    type="text"
                    name="rollNumber"
                    placeholder="Enter student roll number (e.g., STU001)"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    disabled={loading || searching}
                    style={{ flex: 1 }}
                  />
                  <SearchButton 
                    type="button" 
                    onClick={handleSearchRollNumber}
                    disabled={loading || searching}
                  >
                    {searching ? '🔍 Searching...' : '🔍 Search'}
                  </SearchButton>
                </div>
              </FormGroup>

              {feesData && studentData && (
                <>
                  <FeesReportContainer>
                    <FeesReportHeader>📋 Student Fees Report</FeesReportHeader>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '15px' }}>
                        <FeesItem>
                          <label>Student Name</label>
                          <span>{feesData.studentName}</span>
                        </FeesItem>
                        <FeesItem>
                          <label>Roll Number</label>
                          <span>{feesData.rollNumber}</span>
                        </FeesItem>
                        <FeesItem>
                          <label>Department</label>
                          <span>{feesData.department}</span>
                        </FeesItem>
                        <FeesItem>
                          <label>Email</label>
                          <span style={{ fontSize: '13px', wordBreak: 'break-all' }}>{studentData.email || 'Not provided'}</span>
                        </FeesItem>
                      </div>
                    </div>

                    <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px' }}>
                      <h4 style={{ margin: '0 0 15px 0', color: '#1f3a57' }}>Fee Breakdown</h4>
                      <FeesReportGrid>
                        <FeesItem>
                          <label>Tuition Fees</label>
                          <span>₹{feesData.tuitionFees?.toLocaleString() || '0'}</span>
                        </FeesItem>
                        <FeesItem>
                          <label>Hostel Fees</label>
                          <span>₹{feesData.hostelFees?.toLocaleString() || '0'}</span>
                        </FeesItem>
                        <FeesItem>
                          <label>Mess Fees</label>
                          <span>₹{feesData.messFees?.toLocaleString() || '0'}</span>
                        </FeesItem>
                        <FeesItem>
                          <label>Lab Fees</label>
                          <span>₹{feesData.labFees?.toLocaleString() || '0'}</span>
                        </FeesItem>
                        <TotalFeesItem>
                          <label>Total Fees</label>
                          <span>₹{feesData.totalFees?.toLocaleString() || '0'}</span>
                        </TotalFeesItem>
                      </FeesReportGrid>
                    </div>

                    {studentData.parentEmail && (
                      <div style={{ marginTop: '15px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#065f46' }}>
                          ✓ Parent email on file: <strong>{studentData.parentEmail}</strong>
                        </p>
                      </div>
                    )}
                  </FeesReportContainer>

                  <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px', marginTop: '20px' }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#1f3a57' }}>📧 Enter Email Address(es) to Send Report</h4>
                    
                    <FormGroup>
                      <Label htmlFor="studentEmail">Student Email Address</Label>
                      <Input
                        id="studentEmail"
                        type="email"
                        name="studentEmail"
                        placeholder="student@school.com (optional)"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '5px 0 0 0' }}>Leave empty to skip sending to student</p>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="parentEmail">Parent Email Address</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        name="parentEmail"
                        placeholder="parent@gmail.com (optional)"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '5px 0 0 0' }}>Leave empty to skip sending to parent</p>
                    </FormGroup>
                  </div>
                </>
              )}

              <InfoBox>
                <p style={{ margin: 0, fontSize: '13px' }}>
                  ℹ️ Search for a student by roll number to view their fees report. Then enter email address(es) and send the report.
                </p>
              </InfoBox>

              <ButtonGroup>
                <SendButton type="submit" disabled={loading || !feesData}>
                  {loading ? (
                    <>
                      <LoadingSpinner /> Sending Report...
                    </>
                  ) : (
                    '💰 Send Fees Report'
                  )}
                </SendButton>
                <ResetButton type="button" onClick={handleReset} disabled={loading}>
                  Clear
                </ResetButton>
              </ButtonGroup>
            </Form>
          )}
        </Card>
      </Content>
    </Container>
  );
};

export default SendEmail;
