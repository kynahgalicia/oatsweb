const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })
    
    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Verify Email Address",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align: center; background-color: #F4F6F6;">
    <img 
        style="max-width: 50px;  margin: 2px;"
        src="cid:logoImagePng"/>
    <h3 style="text-align: center; text-transform: uppercase;color: #6B2025;"> 
    Online Archiving Thesis System</h5>
    <img 
    style="max-width: 200px;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;" src="cid:mailImageSVG"/>
    <h3>Welcome to OATS!</h3>
    <p> You're almost done in creating your account! <br> 
    Just click the button below to verify your email address: 
    </p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify</a>

    </div>
        `,
        attachments: [{
                filename: 'logo.png',
                path:'./backend/controller/img/logo.png',
                cid: 'logoImagePng' //same cid value as in the html img src
            },{
                filename: 'mail.png',
                path:'./backend/controller/img/mail.png',
                cid: 'mailImageSVG' //same cid value as in the html img src
            },
            ]
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) {
            console.log('Error:', err)
        }else{
            console.log('SENT!!!' + infor.response)
        }
    })
}

module.exports = sendEmail