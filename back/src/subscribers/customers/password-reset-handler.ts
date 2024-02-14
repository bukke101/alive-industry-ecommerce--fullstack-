// src/subscribers/password-reset-handler.ts
import { EventBusService } from "@medusajs/medusa";
import sgMail from '@sendgrid/mail';

// Set your SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default (container) => {
  const eventBus: EventBusService = container.resolve("eventBusService");

  const sendPasswordResetEmail = async (event) => {
    const { id, email, token } = event;

    // Construct the reset password URL
    const resetPasswordUrl = `http://localhost:5174/new-password?token=${token}`;


  // Prepare the email message using SendGrid template
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM,
    templateId: process.env.SENDGRID_CUSTOMER_PASSWORD_RESET_ID,
    dynamic_template_data: {
      resetPasswordUrl,
    },
  };

  // Send the email
  try {
    await sgMail.send(msg);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email', error);
    throw error;
  }
}

eventBus.subscribe("customer.password_reset", sendPasswordResetEmail);
};
