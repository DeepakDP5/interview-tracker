const nodemailer = require('nodemailer');

const sendEmail = async options => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "27d80501ec2f68",
          pass: "4233cee7168aa0"
        }
      });

  const mailoptions = {
    from: 'Kaustubh Shukla',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transport.sendMail(mailoptions);
};

module.exports = sendEmail;
