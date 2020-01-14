require('./config/config');
require('./models/db');

var express = require('express');
var cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const rtsIndex = require('./routers/index.router');

var app = express();
var mongoose = require('mongoose');

const User = mongoose.model('User');

//middleware

app.use(express.static('public'));
app.use(bodyParse.json());
app.use(cors());
app.use('/',rtsIndex);
app.set('views', './views');
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.urlencoded({extended : false}));

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};


//login

app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render(login);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({username: username}).then(function (user) {
            if (!user) {
              console.log('sai thong tin username')
                res.redirect('/login');
            } else {
                bcrypt.compare(password, user.password, function(err, data) {
                  if(data) {
                  // Passwords match
                    req.session.user = user.dataValues;
                    console.log('dang nhap thanh cong')
                    res.redirect('/dashboard');
                  } else {
                  // Passwords don't match
                    console.log('sai mat khau');
                    res.redirect('/login');
                  } 
                });
                
            }
        });
    });
//logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});

//dashboard
app.get('/dashboard',(req,res) =>{
  if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard-home');
  }
  else {
    res.redirect('/login');
  }
})








//start server

app.listen(process.env.PORT,()=>{
    console.log("Server is starting in port"+process.env.PORT);
});
