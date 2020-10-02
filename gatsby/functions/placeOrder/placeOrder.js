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

// email generation function

function generateOrderEmail({ name, order, orderTotal }) {
  return `<div>
    <h2>Hey ${name}! Here Is Your Recent Order from Slick's Slices</h2>
    <p>Please start walking over, we will have your order ready in the next 15-20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${orderTotal}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

async function waitUp(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async function (event, context) {
  // TODO
  // validate data coming in
  // send email
  // send success/error message
  const body = JSON.parse(event.body);
  // check for honeypot input
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Don't fill the pot! ERR: 90210` }),
    };
  }
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `Oops! You are missing the ${field} field`,
        }),
      };
    }
    if (!body.order.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Why would you order nothing you goon??',
        }),
      };
    }
  }
  await transporter.sendMail({
    from: "Slick's Slices <slicks@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail(body),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success! Your order will be ready in 15-20 minutes!',
    }),
  };
};
