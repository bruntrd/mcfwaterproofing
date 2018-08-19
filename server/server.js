var express = require('express');
var path = require('path');
var app = express();
var index = require('./routes/index');
var angularRoute = require('./routes/angularRoute');


app.set("port", (process.env.PORT || 5000));

app.use(["/home","/about","/services","/causes","/process"],angularRoute);
app.use("/", index);


app.listen(app.get("port"), function(){
    console.log("listening on port: 5000");
});