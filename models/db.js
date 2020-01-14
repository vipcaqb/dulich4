const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},err =>{
    if (!err){
        console.log("Mongodb connection succeeded")
    }
    else {
        console.log("Error in mongodb connection "+ JSON.stringify(err,undefined,2));
    }
});
require('./topic.model');
require('./user.model');

