const express= require('express')
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/', function(req,res){
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "bluntappservice@gmail.com",
            pass: "@Freddy999"
        }
    });

// setup e-mail data with unicode symbols
    const mailOptions = {
        from: "bluntappservice@gmail.com", // sender address
        to: 'mcfwaterproofing@gmail.com', // list of receivers
        subject: "New Inquiry", // Subject line
        text: "From : " + req.body.firstName + ' ' + req.body.lastName + '\nNumber : ' + req.body.number + '\nEmail : ' + req.body.email + '\nAddress : ' + req.body.address + ' ' + req.body.city + ', ' + req.body.state
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.send({'error': true, 'errorMessage': error})
        }else{
            res.send({'error': false});
        }
        // if you don't want to use this transport object anymore, uncomment following line
        // shut down the connection pool, no more messages
    });
    smtpTransport.close()
});

module.exports = router;