// ChooseUserStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChooseUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: moveBackground 20s linear infinite;
  }

  @keyframes moveBackground {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    padding: 60px;
  }
`;

export const UserSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  margin: 15px;
  width: 280px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 1;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-15px) scale(1.05);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.color || '#667eea'};
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${props => props.color || '#667eea'}, ${props => props.secondaryColor || '#764ba2'});
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.3;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    padding: 30px 20px;
    margin: 10px 0;
  }
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, ${props => props.color || '#667eea'}, ${props => props.secondaryColor || '#764ba2'});
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  ${UserSection}:hover & {
    transform: rotate(360deg) scale(1.1);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2d3748;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;

  ${UserSection}:hover & {
    color: ${props => props.color || '#667eea'};
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: #718096;
  margin-bottom: 25px;
  line-height: 1.6;
  min-height: 40px;
`;

export const Button = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, ${props => props.color || '#667eea'}, ${props => props.secondaryColor || '#764ba2'});
  color: white;
  border: none;
  padding: 14px 32px;
  margin-top: 10px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 768px) {
    padding: 12px 28px;
    font-size: 15px;
  }
`;

export const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 15px;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: -1px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 50px;
  max-width: 600px;
  line-height: 1.6;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
    padding: 0 10px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }
`;