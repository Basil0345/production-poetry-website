const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


//Route 1: Contact Api
router.post("/", async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_ADMIN,
            pass: process.env.NODEMAILER_ADMIN_PASSWORD
        }
    });
    let details = {
        from: process.env.NODEMAILER_ADMIN,
        to: process.env.CLIENT_MAIL_ID,
        subject: `New Message from your website`,
        text: `From: ${req.body.email}
Message: ${req.body.message}`
    }
    transporter.sendMail(details, (err) => {
        if (err) {
            res.status(400).json({ error: "something went wrong" })
            console.log(err.message);
        } else {
            res.json({ success: "Message has sent" })
        }
    })
})

module.exports = router;