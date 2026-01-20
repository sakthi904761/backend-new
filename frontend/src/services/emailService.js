import { api } from './api';

export const emailService = {
  sendEmail: async (emailData) => {
    try {
      const response = await api.post('/api/v1/email/send', {
        to: emailData.to,
        subject: emailData.subject,
        message: emailData.message,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send email';
      throw new Error(errorMessage);
    }
  },
};
