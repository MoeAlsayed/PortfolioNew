const express = require("express")
const path = require("path");
const fs = require("fs");
const app = express()
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const nodemailer = require("nodemailer");
require("dotenv").config({
    path: "./variables.env"
});

// database models
const MailModel = require("./model/MailsModel")

// setting nodemailer transporter
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.post("/email", async (req, res, next) => {
    const newMail = new MailModel(req.body);
    const mail = await newMail.save();
    console.log(newMail);
    const html = newMail.message.replace(new RegExp("\n", "g"), "<br>");
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: "mohamad.alsayed93@gmail.com",
        subject: `New E-mail From "${newMail.mail}"`,
        text: newMail.message,
        html: `<div style="border-top: 0.5px solid #ccc; padding: 2%;">
    <p style="font-size:1.5em;">" <strong style="color: skyblue;">${
      newMail.name
    } </strong>" Has Sent You :</p>
    <p style="font-size:1.3em;">${html}</p>
    </div>`
    };

    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("the error is ", err);
            res.status(304).json("not done");
        } else {
            console.log("the info is ", info);
            /* res.sendFile(path.join(__dirname + '/public/thank.html')); */
            // res.send('your Email was sent')

            fs.readFile(path.join(__dirname + '/public/thank.html'), 'utf-8', (err, data) => {
                console.log(err);

                //let html = Jtringify(data) SON.s
                res.send(data)
            })
        }
    })
})


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
})
const db = mongoose.connection;
db.on("error", err => {
    console.log(`conaction error is ${err}`);
})

db.once("open", () => {
    console.log("database conaction is open");
})

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`server is runing on port ${port}`);
})