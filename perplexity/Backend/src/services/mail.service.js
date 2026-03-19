import nodeMailer from "nodemailer"


const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
})


transporter.verify()


const sendRegisterEmail = async ({to, subject, html}) =>{
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html
    }

    const details = await transporter.sendMail(mailOptions)
}

export default sendRegisterEmail