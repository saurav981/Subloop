const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_UPDATE_SUCCESS_TEMPLATE,
} = require('./emailTemplate');
const { mailtrapClient, sender } = require('./mailtrapConfig');

exports.sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Please verify your email, valid for 10 minutes',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationCode
      ),
      category: 'Email Verification',
    });

    console.log('Verification email sent successfully');

    // console.log('Verification email sent successfully', response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

exports.sendWelcomeEmail = async (fullName, email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: '19e0f228-86cc-4cee-8289-3f37aca50117',
      template_variables: {
        company_info_name: 'Convo App',
        first_name: fullName,
      },
    });

    console.log('Welcome email sent successfully');

    // console.log('Welcome email sent successfully', response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending Welcome email: ${error}`);
  }
};

exports.sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `Reset You Password (valid for 10 mins)`,
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset',
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
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `Password Reset Successful`,
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
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
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `Password Updated Succesfully`,
      html: PASSWORD_UPDATE_SUCCESS_TEMPLATE,
      category: 'Password Updated Successful',
    });

    console.log('Password update successful');
  } catch (error) {
    console.log(error);
    throw new Error(`Error in update password: ${error}`);
  }
};
