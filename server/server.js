var express = require('express');
var path = require('path');
var app = express();
var index = require('./routes/index');
var mailer = require('./routes/mailer');
var bodyParser = require('body-parser')
var angularRoute = require('./routes/angularRoute');


app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/emailRequest",mailer);
app.use(["/home","/about","/services","/causes","/process"],angularRoute);
app.use("/", index);


app.listen(app.get("port"), function(){
    console.log("listening on port: 5000");
});