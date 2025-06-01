import nodemailer from "nodemailer"

export const sendMail=async(email,isUser)=>{
    try {
        
        let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  
  auth: {
    user: "kay.dickinson30@ethereal.email",
    pass: "4rUdKZcxDQHXzv2xpc",
  },
});
let message
if(isUser){
    
message = {
        from:"kay.dickinson30@ethereal.email",
        to: email,
        subject: 'User Invited you for see the expense',
        text: 'Hello',
        html: '<p><b>User</b> added ivited you to see the expenses what you all did !</p>'
    };
}else{
    message = {
        from:"kay.dickinson30@ethereal.email",
        to: email,
        subject: 'User Invited you for see the expense',
        text: 'Hello',
        html: '<p><b>User</b> Can you please register with this url :http://localhost:5173 to se the expense!</p>'
    };
}

    const info = await transporter.sendMail(message);

    return {
      success: true,
      message: "Invitation sent successfully",
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
    } catch (error) {
      console.error("Error occurred while sending email:", err);
    return {
      success: false,
      message: "Failed to send email",
      error: err.message,
    };  
    }
    

}