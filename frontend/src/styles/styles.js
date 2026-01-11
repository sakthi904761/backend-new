// styles.js - Improved with modern gradients and effects
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 60px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  color: #1a1f3a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);

  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px 24px;
  }
`;

export const Logo = styled.img`
  width: 64px;
  height: auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3));

  &:hover {
    transform: scale(1.15) rotate(8deg);
    filter: drop-shadow(0 8px 20px rgba(102, 126, 234, 0.5));
  }

  @media screen and (max-width: 768px) {
    width: 56px;
    margin-bottom: 16px;
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NavLink = styled.a`
  color: #1a1f3a;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  padding: 8px 4px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  }

  &:hover {
    color: #667eea;
    transform: translateY(-2px);
  }

  &:hover::after {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const LoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 36px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.5);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px);
  }

  @media screen and (max-width: 768px) {
    padding: 12px 28px;
    font-size: 14px;
  }
`;

export const SignUpButton = styled.button`
  color: #667eea;
  border: 2px solid #667eea;
  padding: 14px 36px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  background-color: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    border-color: #764ba2;
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:active {
    transform: translateY(-1px);
  }

  @media screen and (max-width: 768px) {
    padding: 12px 28px;
    font-size: 14px;
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  min-height: 100vh;
  padding: 140px 32px 80px;
  position: relative;
  overflow: hidden;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    25% { background-position: 50% 75%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 25%; }
    100% { background-position: 0% 50%; }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 40%);
    pointer-events: none;
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: movePattern 40s linear infinite;
  }

  @keyframes movePattern {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(50px, 50px) rotate(360deg); }
  }

  @media screen and (max-width: 768px) {
    padding: 120px 24px 60px;
  }
`;

export const SchoolInfo = styled.div`
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SchoolImage = styled.img`
  width: 85%;
  max-width: 1100px;
  max-height: 65vh;
  object-fit: contain;
  margin-top: 60px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.3));
  animation: floatImage 8s ease-in-out infinite;
  border-radius: 24px;
  transition: all 0.4s ease;

  @keyframes floatImage {
    0%, 100% { 
      transform: translateY(0px) scale(1);
    }
    25% { 
      transform: translateY(-15px) scale(1.02);
    }
    50% { 
      transform: translateY(-30px) scale(1.04);
    }
    75% { 
      transform: translateY(-15px) scale(1.02);
    }
  }

  &:hover {
    filter: drop-shadow(0 32px 64px rgba(0, 0, 0, 0.4));
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    width: 95%;
    margin-top: 40px;
  }
`;

export const Title = styled.h1`
  font-size: 72px;
  font-weight: 900;
  color: white;
  text-shadow: 
    0 4px 40px rgba(0, 0, 0, 0.5),
    0 8px 80px rgba(102, 126, 234, 0.3);
  letter-spacing: -3px;
  margin-bottom: 32px;
  animation: slideInDown 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, transparent, white, transparent);
    border-radius: 2px;
    animation: expandWidth 1.5s ease-in-out infinite;
  }

  @keyframes expandWidth {
    0%, 100% { width: 120px; opacity: 1; }
    50% { width: 160px; opacity: 0.7; }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 48px;
    letter-spacing: -2px;
  }

  @media screen and (max-width: 480px) {
    font-size: 36px;
    letter-spacing: -1px;
  }
`;

export const LoremTextContainer = styled.div`
  max-width: 900px;
  margin: 32px auto;
  font-size: 20px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.98);
  text-align: center;
  padding: 0 40px;
  font-weight: 400;
  text-shadow: 
    0 2px 12px rgba(0, 0, 0, 0.3),
    0 4px 24px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1.6s ease;
  backdrop-filter: blur(2px);
  background: rgba(255, 255, 255, 0.05);
  padding: 32px 48px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }

  p {
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    font-size: 17px;
    padding: 24px 32px;
    line-height: 1.8;
  }

  @media screen and (max-width: 480px) {
    font-size: 15px;
    padding: 20px 24px;
  }
`;