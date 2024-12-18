const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_UPDATE_SUCCESS_TEMPLATE,
} = require('../mailtrap/emailTemplate');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config();

const sender = { name: 'Subloop', email: 'subloopapp@gmail.com' };

exports.sendWelcomeEmail = async (username, email) => {
  const recipient = [{ email }];

  // Template ID: d-7989385fbd0a4f39b6aa495f68a36ccb
  try {
    const response = await sgMail.send({
      from: sender,
      to: recipient,
      templateId: 'd-7989385fbd0a4f39b6aa495f68a36ccb',
      dynamicTemplateData: { username: username },
    });

    console.log('Welcome email sent successfully');

    // console.log('Welcome email sent successfully', response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending Welcome email: ${error}`);
  }
};

exports.sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    const response = await sgMail.send({
      from: sender,
      to: recipient,
      subject: 'Please verify your email, valid for 10 minutes',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationCode
      ),
      text: `Your Subloop verification code is: ${verificationCode}`,
    });

    console.log('Verification email sent successfully');

    // console.log('Verification email sent successfully', response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

exports.sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await sgMail.send({
      from: sender,
      to: recipient,
      subject: `Reset You Password (valid for 10 mins)`,
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      text: `Your Subloop reset url is: ${resetURL}`,
    });

    console.log('Password reset email sent');
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending Password reset email: ${error}`);
  }
};

exports.sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await sgMail.send({
      from: sender,
      to: recipient,
      subject: `Password Reset Successful`,
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log('Password reset successful');
  } catch (error) {
    console.log(error);
    throw new Error(`Error in reseting password: ${error}`);
  }
};

exports.sendPasswordUpdatedEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await sgMail.send({
      from: sender,
      to: recipient,
      subject: `Password Updated Succesfully`,
      html: PASSWORD_UPDATE_SUCCESS_TEMPLATE,
    });

    console.log('Password update successful');
  } catch (error) {
    console.log(error);
    throw new Error(`Error in update password: ${error}`);
  }
};
