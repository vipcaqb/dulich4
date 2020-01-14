const mongoose = require('mongoose');
const bscrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'username can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'password can\'t be empty'
    }
});

//Events 
userSchema.pre('save',function(next) {
    bscrypt.hash(this.password,1,(err,hash)=>{
        this.password = hash;
        next();
    });
});


const User =  mongoose.model('User',userSchema);
mongoose.model('User',userSchema);