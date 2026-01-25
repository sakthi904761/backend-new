import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import html2pdf from 'html2pdf.js';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Content = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width, 270px);
  padding: 40px;
  transition: margin-left 300ms ease;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px;
  }
`;

const Header = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  h1 {
    margin: 0 0 10px 0;
    color: #1f3a57;
    font-size: 32px;
  }

  p {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

const ResumeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: fit-content;
`;

const SectionTitle = styled.h2`
  color: #667eea;
  font-size: 20px;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    color: #374151;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: all 200ms ease;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GenerateButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const DownloadButton = styled(Button)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
`;

const ResetButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;

  &:hover {
    background: #e5e7eb;
  }
`;

const PreviewSection = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-height: 800px;
`;

const ResumePreview = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;

  .resume-header {
    text-align: center;
    border-bottom: 3px solid #667eea;
    padding-bottom: 20px;
    margin-bottom: 25px;

    h1 {
      margin: 0 0 5px 0;
      font-size: 28px;
      color: #1f3a57;
    }

    .contact-info {
      font-size: 12px;
      color: #6b7280;

      span {
        margin: 0 15px;

        &::before {
          content: '•';
          margin-right: 8px;
        }

        &:first-child::before {
          content: '';
          margin-right: 0;
        }
      }
    }
  }

  .resume-section {
    margin-bottom: 25px;

    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #667eea;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .entry {
      margin-bottom: 15px;

      .entry-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        .entry-title {
          font-weight: 700;
          color: #1f3a57;
          font-size: 14px;
        }

        .entry-date {
          color: #6b7280;
          font-size: 12px;
          font-style: italic;
        }
      }

      .entry-subtitle {
        color: #667eea;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .entry-description {
        color: #4b5563;
        font-size: 13px;
        line-height: 1.5;
        margin: 5px 0 0 0;
      }
    }
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Alert = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
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

const Resume = () => {
  const [studentData, setStudentData] = useState(null);
  const [resumeData, setResumeData] = useState({
    email: '',
    phone: '',
    address: '',
    objective: '',
    experience: '',
    skills: '',
    education: '',
    certifications: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const student = JSON.parse(localStorage.getItem('studentData') || '{}');
      setStudentData(student);
      setResumeData((prev) => ({
        ...prev,
        email: student.email || '',
      }));
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateResume = (e) => {
    e.preventDefault();
    if (!studentData || !studentData.name) {
      setMessageType('error');
      setMessage('Student data not found. Please login again.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    setMessageType('success');
    setMessage('Resume preview updated! Click "Download Resume" to save as PDF.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDownloadResume = async () => {
    if (!studentData || !studentData.name) {
      setMessageType('error');
      setMessage('Student data not found.');
      return;
    }

    try {
      setLoading(true);
      const element = document.getElementById('resumePreview');
      const opt = {
        margin: 10,
        filename: `${studentData.name.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };
      html2pdf().set(opt).from(element).save();
      setMessageType('success');
      setMessage('Resume downloaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessageType('error');
      setMessage('Failed to download resume. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeData({
      email: studentData?.email || '',
      phone: '',
      address: '',
      objective: '',
      experience: '',
      skills: '',
      education: '',
      certifications: '',
    });
    setMessage('');
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1>Professional Resume Builder</h1>
          <p>Create and download your professional resume in PDF format</p>
        </Header>

        {message && (
          messageType === 'success' ? (
            <SuccessAlert>{message}</SuccessAlert>
          ) : (
            <ErrorAlert>{message}</ErrorAlert>
          )
        )}

        <ResumeContainer>
          <FormSection>
            <SectionTitle>Resume Information</SectionTitle>
            <form onSubmit={handleGenerateResume}>
              <FormGroup>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={resumeData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={resumeData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., +1 (555) 123-4567"
                />
              </FormGroup>

              <FormGroup>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={resumeData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., City, State"
                />
              </FormGroup>

              <FormGroup>
                <label>Professional Objective</label>
                <textarea
                  name="objective"
                  value={resumeData.objective}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your career goals and strengths..."
                />
              </FormGroup>

              <FormGroup>
                <label>Experience</label>
                <textarea
                  name="experience"
                  value={resumeData.experience}
                  onChange={handleInputChange}
                  placeholder="Job Title | Company | Duration&#10;Description of responsibilities and achievements..."
                />
              </FormGroup>

              <FormGroup>
                <label>Skills</label>
                <textarea
                  name="skills"
                  value={resumeData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., Communication, Leadership, Programming, Problem Solving..."
                />
              </FormGroup>

              <FormGroup>
                <label>Education</label>
                <textarea
                  name="education"
                  value={resumeData.education}
                  onChange={handleInputChange}
                  placeholder="School/University | Degree | Year&#10;Additional education details..."
                />
              </FormGroup>

              <FormGroup>
                <label>Certifications & Achievements</label>
                <textarea
                  name="certifications"
                  value={resumeData.certifications}
                  onChange={handleInputChange}
                  placeholder="List any certifications, awards, or achievements..."
                />
              </FormGroup>

              <ButtonGroup>
                <GenerateButton type="submit">Generate Resume</GenerateButton>
                <ResetButton type="button" onClick={handleReset}>
                  Reset Form
                </ResetButton>
              </ButtonGroup>
            </form>
          </FormSection>

          <div>
            <PreviewSection>
              <ResumePreview id="resumePreview">
                <div className="resume-header">
                  <h1>{studentData?.name || 'Your Name'}</h1>
                  <div className="contact-info">
                    <span>{resumeData.email}</span>
                    {resumeData.phone && <span>{resumeData.phone}</span>}
                    {resumeData.address && <span>{resumeData.address}</span>}
                  </div>
                </div>

                {resumeData.objective && (
                  <div className="resume-section">
                    <div className="section-title">Professional Objective</div>
                    <div className="entry">
                      <div className="entry-description">{resumeData.objective}</div>
                    </div>
                  </div>
                )}

                {resumeData.experience && (
                  <div className="resume-section">
                    <div className="section-title">Professional Experience</div>
                    <div className="entry">
                      <div className="entry-description">{resumeData.experience}</div>
                    </div>
                  </div>
                )}

                {resumeData.skills && (
                  <div className="resume-section">
                    <div className="section-title">Skills</div>
                    <div className="entry">
                      <div className="entry-description">{resumeData.skills}</div>
                    </div>
                  </div>
                )}

                {resumeData.education && (
                  <div className="resume-section">
                    <div className="section-title">Education</div>
                    <div className="entry">
                      <div className="entry-description">{resumeData.education}</div>
                    </div>
                  </div>
                )}

                {resumeData.certifications && (
                  <div className="resume-section">
                    <div className="section-title">Certifications & Achievements</div>
                    <div className="entry">
                      <div className="entry-description">{resumeData.certifications}</div>
                    </div>
                  </div>
                )}
              </ResumePreview>

              <ButtonGroup style={{ marginTop: '20px' }}>
                <DownloadButton onClick={handleDownloadResume} disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner /> Downloading...
                    </>
                  ) : (
                    '⬇️ Download Resume (PDF)'
                  )}
                </DownloadButton>
              </ButtonGroup>
            </PreviewSection>
          </div>
        </ResumeContainer>
      </Content>
    </Container>
  );
};

export default Resume;
