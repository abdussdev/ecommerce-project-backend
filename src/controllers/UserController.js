const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const transporter = require('../utilities/EmailTransporter');

// User login
exports.userLogin = async (req, res) => {
  try {
    const email = req.params.email;
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Email data
    const mailOptions = {
      from: 'This is a test message from <abdusjscript@gmail.com>',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP (One-Time Password) for verification is: ${otp}`
    };

    // Send the OTP email using the imported transporter
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.error('Error sending email: ', error);
        res.status(500).json({ error: 'Could not send OTP email' });
      } else {
        console.log('Email sent: ' + info.response);

        try {
          // Use findOneAndUpdate with upsert: true to create or update the user
          const user = await UserModel.findOneAndUpdate(
            { email },
            { $set: { otp } },
            { new: true, upsert: true }
          );

          // Return a success message
          res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Could not update user with OTP' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not process login' });
  }
};

// User verification
exports.verifyLogin = async (req, res) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    const user = await UserModel.findOne({email});

    if (!user || user.otp !== otp) {
      return res.status(401).json({ message: 'User verification failed' });
    }

    // Set the OTP to null
    await UserModel.updateOne({email:email}, {otp: null});

    // Generate a JWT token for the user
    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };

    const secretKey = "SecretKeyForJWT123";

    const token = jwt.sign(tokenPayload, secretKey, {
      expiresIn: "1d",
    });    

    // Respond with the token
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not verify user' });
  }
};

