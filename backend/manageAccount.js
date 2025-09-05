var path = require('path'); // npm install path
// Functional
const functional = require('./functional');
const { log } = require('console');


// Signup
function tosignup(req, res) { 
    res.render(path.join(__dirname + '/../frontend/page/signUp.ejs'), { nav: functional.getnav(req) });
}

function signup(req, res) {
    let userData = {
        name: req.query.name,
        mail: req.query.mail,
        password: req.query.password
    };

    const sqlSignup = "INSERT INTO userInfo (name, mail, password) VALUES"
        + " ('" + userData.name + "',"
        + " '" + userData.mail + "',"
        + " '" + userData.password + "');";

    const sqlCheck = "SELECT * FROM userInfo WHERE mail = '"+ userData.mail + "';"

    // console.log(sql);
    functional.dbconnect.query(sqlCheck, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(res, errorSQL);
        else {
            if (result.length === 1) {
                res.render(path.join(__dirname + '/../frontend/page/unsuccessfully.ejs'), {
                    nav: functional.getnav(req),
                    message: "This email has already been used.",
                    goto: "<a href=\"/tosignup\">Return to signup</a>"
                });
            } else {
                functional.dbconnect.query(sqlSignup, (errorSQL, result) => {
                    if (errorSQL) functional.errorSQL(res, errorSQL);
                    res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {
                        nav: functional.getnav(req),
                        message: "SignUp successfully ,Please return login again",
                        goto: "<a href=\"/tologin\">Return to login</a>"
                    });
                });
            }
        }
    });
}



// Login
function tologin(req, res) {
    res.render(path.join(__dirname + '/../frontend/page/logIn.ejs'), { nav: functional.getnav(req) });
}

function login(req, res) {
    const timeCookie = 86400000; // 24 hour = 86400000 mc
    let userData = {
        mail: req.query.mail,
        password: req.query.password
    };

    const sql = "SELECT id FROM userInfo WHERE"
        + " mail = '" + userData.mail + "' AND"
        + " password = '" + userData.password + "';";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            if (result.length === 0) {
                res.render(path.join(__dirname + '/../frontend/page/unsuccessfully.ejs'), {
                    nav: functional.getnav(req),
                    message: "Please check your mail or password",
                    goto: "<a href=\"/tologin\">Return to login</a>"
                });
            } else {
                userId = result[0].id;
                // console.log("User id " + userId + " Online.");

                // Create cookies
                res.cookie('userID', userId, { maxAge: timeCookie });
                res.cookie('login', true, { maxAge: timeCookie });

                res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {
                    nav: functional.getnav(req),
                    message: "Login successfully ,Have a good day.",
                    goto: "<a href=\"/\">Return to blog</a>"
                });
            }
        }
    });
}



// Forgot password
function toforgot(req, res) {
    res.render(path.join(__dirname + '/../frontend/page/forgot.ejs'), { nav: functional.getnav(req) });
}

function forgot(req, res) {
    let userData = {
        mail: req.query.mail,
        password: req.query.password
    };

    const sqlCheck = "SELECT * FROM userInfo WHERE"
        + " mail = '" + userData.mail + "';";

    const sqlReset = "UPDATE userInfo SET"
        + " password = '" + userData.password + "'"
        + " WHERE mail = '" + userData.mail + "';";

    // console.log(sqlCheck);
    // console.log(sqlReset);
    functional.dbconnect.query(sqlCheck, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            if (result.length === 0) {
                res.render(path.join(__dirname + '/../frontend/page/unsuccessfully.ejs'), {
                    nav: functional.getnav(req),
                    message: "Not found, Please check your mail",
                    goto: "<a href=\"/toforgot\">Pls try again</a>"
                });
            } else {
                functional.dbconnect.query(sqlReset, (errorSQL, result) => {
                    if (errorSQL) functional.errorSQL(req, res, errorSQL);
                    else {
                        res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {   
                            nav: functional.getnav(req),
                            message: "Reset password is successfully",
                            goto: "<a href=\"/tologin\">Return to login</a>"
                        });
                    }
                });
            }
        }
    });
}



// Reset password
function toreset(req, res) {
    res.render(path.join(__dirname + '/../frontend/page/reset.ejs'), { nav: functional.getnav(req) });
}

function reset(req, res) {
    let userData = {
        id: req.cookies.userID,
        old: req.query.oldPassword,
        new: req.query.newPassword
    };

    const sqlCheck =  "SELECT * FROM userInfo WHERE password = " + userData.old 
        + " AND id = " + userData.id + " ;";
    const sqlReset = "UPDATE userInfo SET"
        + " password = '" + userData.new + "'"
        + " WHERE id = " + userData.id + " ;";

    // console.log(sqlCheck);
    // console.log(sqlReset);
    functional.dbconnect.query(sqlCheck, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            if (result.length === 0) {
                res.render(path.join(__dirname + '/../frontend/page/unsuccessfully.ejs'), {
                    nav: functional.getnav(req),
                    message: "Please check your old password",
                    goto: "<a href=\"/toreset\">Pls try again</a>"
                });
            } else {
                functional.dbconnect.query(sqlReset, (errorSQL, result) => {
                    if (errorSQL) functional.errorSQL(req, res, errorSQL);
                    else {
                        res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {   
                            nav: functional.getnav(req),
                            message: "Reset password is successfully",
                            goto: "<a href=\"/toprofile\">Return to profile</a>"
                        });
                    }
                });
            }
        }
    });
}



// Logout
function logout(req, res) {
    res.clearCookie('userID');
    res.clearCookie('login');
    res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {   
        nav: functional.getnav(req),
        message: "Logout is successfully",
        goto: "<a href=\"/\">Return to blog</a>"
    });
}



// Rename
function rename(req, res) {
    const sql = "UPDATE userInfo SET name = '" + req.query.name + "' WHERE id = " + req.cookies.userID + ";"
    
    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {   
                nav: functional.getnav(req),
                message: "Rename is successfully",
                goto: "<a href=\"/toprofile\">Return to profile</a>"
            });
        }
    });
}


module.exports = {
    tosignup: tosignup,
    signup: signup,
    tologin: tologin,
    login: login,
    toforgot: toforgot,
    forgot: forgot,
    toreset: toreset,
    reset: reset,
    logout: logout,
    rename: rename
};
