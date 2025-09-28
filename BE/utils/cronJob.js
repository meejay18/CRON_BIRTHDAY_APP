const cron = require('node-cron')
const userModel = require('../model/userModel')
const emailSender = require('../middleware/nodemailer')

exports.cronSchedule = () => {
  cron.schedule('0 7 * * *', async () => {
    console.log('checking birthdays')

    try {
      const today = new Date()
      const month = today.getMonth()
      const date = today.getDate()

      const birthdaysUsers = await userModel.find()

      birthdaysUsers.forEach((el) => {
        const DOB = new Date(el.dateOfBirth)

        if (DOB.getDate() === date && DOB.getMonth() === month) {
          const emailOptions = {
            email: el.email,
            subject: 'Birthday Notification',
            html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Birthday Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color:rgb(244, 7, 7);
                background-color: #2c2c2c; /* Dark background */
                margin: 0;
                padding: 0;
            }
            .container {
                width: 80%;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background-color: #f4f4f4; /* Light grey background */
            }
            .header {
                background: #333333;
                padding: 20px;
                text-align: center;
                border-bottom: 1px solid #ddd;
                color: #ffffff;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                color: #333333;
            }
            .button-container {
                text-align: center;
                margin: 20px 0;
            }
            .button {
                display: inline-block;
                background-color: #28a745; /* Green background */
                color: #ffffff;
                padding: 15px 30px;
                font-size: 18px;
                text-decoration: none;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #218838;
            }
            .footer {
                background: #333333;
                padding: 10px;
                text-align: center;
                border-top: 1px solid #ddd;
                font-size: 0.9em;
                color: #cccccc;
                border-radius: 0 0 10px 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Birthday Message</h1>
            </div>
            <div class="content">
               <p>Happy Birthday, ${el.userName} 🎉</p>
                <p>May this special day bring you joy, success, and lasting happiness. We are truly grateful to have you as part of our community and look forward to many more years of celebrating milestones with you.</p>
             <p> Wishing you good health, prosperity, and all the wonderful things life has to offer.</p>
              <p>Best regards,<br>Channels Incorporation</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} . All rights reserved.</p>
            </div>  
        </div>
    </body>
    </html>
    
  
    `,
          }

          emailSender(emailOptions)
        }
      })
    } catch (error) {
      console.log(`Error with cron job: ${error.message} `)
    }
  })
}
