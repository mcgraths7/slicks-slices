const nodemailer = require('nodemailer');

// create a transport for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAIL_HOST,
  port: process.env.NODEMAIL_PORT,
  auth: {
    user: process.env.NODEMAIL_USERNAME,
    pass: process.env.NODEMAIL_PASSWORD,
  },
});

// TEST

exports.handler = async function (event, context) {
  const email = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New Order',
    html: `<p> Your new pizza order is here!</p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(email, undefined, 2),
  };
};
