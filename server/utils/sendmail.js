require("dotenv").config();
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = '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'

exports.sendOTP =async (email, otp) => {
try{
  await new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "ENTER THIS OTP TO VERIFY YOURSELF!",
      sender: { email: "jaswanidipesh8@gmail.com", name: "CENTA" },
      replyTo: { email: `jaswanidipesh8@gmail.com`, name: "CENTA" },
      to: [{ name: "dip", email: `${email}` }],
      htmlContent:
        `<html lang="en"><body><h1>${otp}</h1></body></html>`,
      params: { bodyMessage: "Made just for you!" },
    })
}
catch(err){
    console.log(err)
}
    
};

exports.confirmation = async (email) =>{
    try{
        await new SibApiV3Sdk.TransactionalEmailsApi()
          .sendTransacEmail({
            subject: "THANKYOU FOR REGISTERING TO CENTA!",
            sender: { email: "jaswanidipesh8@gmail.com", name: "CENTA" },
            replyTo: { email: `jaswanidipesh8@gmail.com`, name: "CENTA" },
            to: [{ name: "dip", email: `${email}` }],
            htmlContent:
              `<html lang="en"><body><h3>We will soon share your test admit card.</h3></body></html>`,
            params: { bodyMessage: "Made just for you!" },
          })
      }
      catch(err){
          console.log(err)
      }       
}

