var express = require('express');
var router = express.Router();
const userController = require('../controller/users');
const otpController = require('../controller/otp');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', userController.renderSignup);

// Handle user signup
router.post('/signup', userController.signup);

// Render login form
router.get('/login', userController.renderLogin);

// Handle user login
router.post('/login', userController.login);

// for verification of the OTP 
router.get('/verify-otp',(req,res)=>{
  res.render('otp')
})
router.get('/send-otp',(req,res)=>{
  res.render('otp-send')
})
router.post('/send-otp', otpController.sendOTP);
router.post('/verify-otp', otpController.verifyOTP);

router.get('/kyc',(req,res)=>{
  res.render('kyc');
})

router.get('/kyc',userController.renderfind);
router.get('/kyc/:username?',userController.finding)

router.get('/profile',userController.renderUserProfile);



module.exports = router;
