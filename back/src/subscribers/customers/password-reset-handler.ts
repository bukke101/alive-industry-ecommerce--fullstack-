// src/subscribers/customer-password-reset-handler.js
const { type, SubscriberArgs, SubscriberConfig } = require("@medusajs/medusa");

async function customerPasswordResetHandler({ data, eventName, container }) {
  const sendGridService = container.resolve("sendGridService");
  const { customer_id, token } = data;

  // Retrieve the customer's email from the database
  const customerService = container.resolve("customerService");
  const customer = await customerService.retrieve(customer_id);

  // Construct the password reset URL
  const passwordResetUrl = `http://localhost:5174/new-password?token=${token}`;

  // Send the email with SendGrid
  await sendGridService.sendEmail({
    to: customer.email,
    from: process.env.SENDGRID_FROM,
    templateId: process.env.SENDGRID_CUSTOMER_PASSWORD_RESET_ID,
    dynamicTemplateData: {
      passwordResetUrl,
    },
  });
}

const config = {
  event: "customer.password_reset",
  context: {
    subscriberId: "customer-password-reset-handler",
  },
};

module.exports = {
  default: customerPasswordResetHandler,
  config,
};
