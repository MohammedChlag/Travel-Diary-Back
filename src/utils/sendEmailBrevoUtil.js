import brevo from '@getbrevo/brevo';

import { SMPT_API_KEY, SMTP_USER } from '../../env.js';
import { generateErrorUtils } from './helpers.js';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMPT_API_KEY);

export const sendEmailBrevoUtil = async (to, subject, text) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.htmlContent = text;
        sendSmtpEmail.sender = { email: SMTP_USER, name: 'Equipo de Travel Diary' };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
        throw generateErrorUtils(500, 'SEND_EMAIL_ERROR', 'Error sending email');
    }
};
