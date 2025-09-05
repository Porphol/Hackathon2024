var exp = require('express'); // npm install express
var app = exp();
var router = exp.Router();
var path = require('path'); // npm install path
var port = 40555;
var mysql = require('mysql'); // npm install mysql
require('dotenv').config(); // npm install dotenv
var cookieParser = require('cookie-parser'); // npm install cookie-parser
var ejs = require('ejs'); // npm install ejs

// Import file
const createnav = require('./nav.js');
const manageAccount = require('./manageAccount.js');
const manageContent = require('./manageContent.js');
const showContent = require('./showContent.js');
const personal = require('./personal.js');

// Functional
const functional = require('./functional')

app.use(cookieParser());
app.use(exp.static(path.join(__dirname, '../frontend')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));



// Routes
router.get('/', showContent.putTypeSIT);
router.get('/IT', showContent.putTypeIT);
router.get('/CS', showContent.putTypeCS);
router.get('/DSI', showContent.putTypeDSI);



// Manage account
// Signup
router.get('/tosignup', manageAccount.tosignup);
router.get('/signup', manageAccount.signup);

// Login
router.get('/tologin', manageAccount.tologin);
router.get('/login', manageAccount.login);

// Forgot password
router.get('/toforgot', manageAccount.toforgot);
router.get('/forgot', manageAccount.forgot);

// Reset password
router.get('/toreset', manageAccount.toreset);
router.get('/reset', manageAccount.reset);

// Profile
router.get('/toprofile', personal.showProfile);

// Edit profile
router.get('/toeditprofile', personal.editProfile);

// Logout
router.get('/logout', manageAccount.logout);

// Rename
router.get('/rename', manageAccount.rename);



// Manage content
//  Create content
router.get('/tocreatecontent', manageContent.tocreateContent);
router.get('/postcontent', manageContent.postContent);

// Update content
router.get('/toeditContent', manageContent.toeditContent);
router.get('/updateContent', manageContent.updateContent);

// Open content
router.get('/tocontent', showContent.openContent);

// Like and exit
router.get('/likeReturn', manageContent.likeReturn);

// Delete content
router.get('/deleteContent', manageContent.deleteContent);



app.use('/', router);
var server = app.listen(port, '10.4.53.25', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("SIT BLOG App is deployed at " + host + " on " + port);
}); // node mainRouter.js
