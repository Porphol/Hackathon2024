const createnav = require('./nav.js');
const mysql = require('mysql');
var path = require('path');

function getnav(req) {
    let nav = createnav.offline;
    if (req.cookies.login) {
        // console.log("User id " + req.cookies.userID + " is online");
        nav = createnav.online;
    }
    return nav;
}

function btCreateBlog(req) {
    let html = `<a href="/tocreatecontent" class="btn" style="display: none;">Create Blog</a>`
    if (req.cookies.login) {
        html = `<a href="/tocreatecontent" class="btn">Create Blog</a>`;
    }
    return html
}

const dbconnect = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    port: process.env.DBPORT
});

function errorSQL(req, res, errorSQL) {
    // console.log(errorSQL.stack);
    res.render(path.join(__dirname + '/../frontend/page/unsuccessfully.ejs'), {
        nav: getnav(req),
        message: "Try again, Please contact admin.",
        goto: "<a href=\"/\">Return to blog</a>"
    });
}


module.exports = {
    getnav: getnav,
    btCreateBlog: btCreateBlog,
    dbconnect: dbconnect,
    errorSQL: errorSQL
};