const nodemailer = require("nodemailer");

//sending confimation mail to registerd user using nodemailer libarary
const sendConfirmationEmail = async (email, username, confirmationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // any SMTP service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    //email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirm Your Account - Welcome to Innobyte",
      text: `
Hello, ${username}!

Thank you for registering with Innobyte. Please use the following confirmation code:

Confirmation Code: ${confirmationCode}

Steps to confirm:
1. Visit the email confirmation section.
2. Enter the above code to complete your signup.

Thank you,
Innobyte Team.
`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send confirmation email");
  }
};

module.exports = {
  sendConfirmationEmail,
};
