import nodemailer from "nodemailer"
import { env } from "../../config/env.service"
import Mail from "nodemailer/lib/mailer"

const transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:env.googleEmail,
        pass:env.googleAppPassword
    }
})
export const sendEmail=async({to,subject,html}:Mail.Options)=>{
    const info =await transporter.sendMail({
        from :`Social Media App  ${env.googleEmail}`,
        to,
        subject,
        html
    })

}