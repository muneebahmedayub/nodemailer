import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("working!!!");
});

app.post("/api/v1/nodemailer", async (req, res) => {
  try {
    const { name, email, subject, description } = req.body;
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let info = await transporter.sendMail({
      from: '"Fantasy Cottage" <info@oxbit.io>', // sender address
      to: "muneebahmedayub01@gmail.com", // list of receivers
      subject: subject, // Subject line
      text: description, // plain text body
      html: `<b>Hi, I am ${name} and my email is ${email}.<br/>${description}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.json({message: "Email sent successfully"});
  } catch (error) {
    console.log(error);
    res.json({message: "Email not sent"});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
