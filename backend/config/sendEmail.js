import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyLink}">${verifyLink}</a>
    `
  };

  await sgMail.send(msg);
};