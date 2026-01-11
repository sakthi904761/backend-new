import { api } from './api';

export const sendEmail = async (emailData) => {
  try {
    const response = await api.post('/api/v1/email/send', emailData);
    return response.data;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};