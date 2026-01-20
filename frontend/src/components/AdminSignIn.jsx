import { api } from '../services/api';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/v1/users/admin/signin', {
        email: email,
        password: password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data.success) {
        alert("Admin Login Successful");
        navigate("/admin/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <BackgroundAnimation />
      <LoginCard>
        <LogoContainer>
          <AdminIcon>👨‍💼</AdminIcon>
          <Title>Admin Portal</Title>
          <Subtitle>Sign in to manage your school</Subtitle>
        </LogoContainer>

        <Form onSubmit={handleSignIn}>
          <InputGroup>
            <Label>Email Address</Label>
            <InputWrapper>
              <EmailIcon>✉️</EmailIcon>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <InputWrapper>
              <LockIcon>🔒</LockIcon>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ShowPasswordBtn
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </ShowPasswordBtn>
            </InputWrapper>
          </InputGroup>

          <ForgotPassword href="#">Forgot Password?</ForgotPassword>

          <SignInButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <Arrow>→</Arrow>}
          </SignInButton>
        </Form>

        <Divider>
          <DividerLine />
          <DividerText>OR</DividerText>
          <DividerLine />
        </Divider>

        <Footer>
          <BackToHome onClick={() => navigate("/")}>
            ← Back to Home
          </BackToHome>
        </Footer>
      </LoginCard>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: movePattern 30s linear infinite;

  @keyframes movePattern {
    0% { transform: translate(0, 0); }
    100% { transform: translate(60px, 60px); }
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  padding: 50px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 460px;
  position: relative;
  z-index: 1;
  animation: slideUp 0.6s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 480px) {
    padding: 40px 30px;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const AdminIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  animation: bounce 2s ease infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #718096;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const EmailIcon = styled.span`
  position: absolute;
  left: 16px;
  font-size: 20px;
  pointer-events: none;
`;

const LockIcon = styled.span`
  position: absolute;
  left: 16px;
  font-size: 20px;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 50px;
  font-size: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #cbd5e0;
  }
`;

const ShowPasswordBtn = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ForgotPassword = styled.a`
  text-align: right;
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Arrow = styled.span`
  font-size: 20px;
  transition: transform 0.3s ease;

  ${SignInButton}:hover & {
    transform: translateX(4px);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`;

const DividerText = styled.span`
  padding: 0 16px;
  color: #a0aec0;
  font-size: 14px;
  font-weight: 600;
`;

const Footer = styled.div`
  text-align: center;
`;

const BackToHome = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

export default AdminSignIn;
