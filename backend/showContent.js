var path = require('path'); // npm install path
// Functional
const functional = require('./functional');
const { log } = require('util');


// Put blog
// Type SIT
function putTypeSIT(req, res) {
    const sql = "SELECT idPost, urlpicture, postTitle, typeSIT, typeIT, typeCS, typeDSI,"
            + " popularRate, name, DATE_FORMAT(editDate, '%Y-%m-%d') AS editDate, idAuthor, name"
            + " FROM content JOIN userInfo ON content.idAuthor = userInfo.id"
            + " WHERE typeSIT = true ORDER BY popularRate DESC;";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            // console.log(result);
            res.render(path.join(__dirname + '/../frontend/index.ejs'), { 
                nav: functional.getnav(req),
                btCreateBlog: functional.btCreateBlog(req),
                putContent: result,
                head: "Popular SIT Blogs"
            });
        }
    });
}

// Type IT
function putTypeIT(req, res) {
    const sql = "SELECT idPost, urlpicture, postTitle, typeSIT, typeIT, typeCS, typeDSI,"
            + " popularRate, name, DATE_FORMAT(editDate, '%Y-%m-%d') AS editDate, idAuthor, name"
            + " FROM content JOIN userInfo ON content.idAuthor = userInfo.id"
            + " WHERE typeIT = true ORDER BY popularRate DESC;";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            // console.log(result);
            res.render(path.join(__dirname + '/../frontend/index.ejs'), { 
                nav: functional.getnav(req),
                btCreateBlog: functional.btCreateBlog(req),
                putContent: result,
                head: "Popular IT Blogs"
            });
        }
    });
}

// Type CS
function putTypeCS(req, res) {
    const sql = "SELECT idPost, urlpicture, postTitle, typeSIT, typeIT, typeCS, typeDSI,"
            + " popularRate, name, DATE_FORMAT(editDate, '%Y-%m-%d') AS editDate, idAuthor, name"
            + " FROM content JOIN userInfo ON content.idAuthor = userInfo.id"
            + " WHERE typeCS = true ORDER BY popularRate DESC;";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            // console.log(result);
            res.render(path.join(__dirname + '/../frontend/index.ejs'), { 
                nav: functional.getnav(req),
                btCreateBlog: functional.btCreateBlog(req),
                putContent: result,
                head: "Popular CS Blogs"
            });
        }
    });
}

// Type DSI
function putTypeDSI(req, res) {
    const sql = "SELECT idPost, urlpicture, postTitle, typeSIT, typeIT, typeCS, typeDSI,"
            + " popularRate, name, DATE_FORMAT(editDate, '%Y-%m-%d') AS editDate, idAuthor, name"
            + " FROM content JOIN userInfo ON content.idAuthor = userInfo.id"
            + " WHERE typeDSI = true ORDER BY popularRate DESC;";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            // console.log(result);
            res.render(path.join(__dirname + '/../frontend/index.ejs'), { 
                nav: functional.getnav(req),
                btCreateBlog: functional.btCreateBlog(req),
                putContent: result,
                head: "Popular DSI Blogs"
            });
        }
    });
}



// Open content
function openContent(req, res) {
    const userID = req.cookies.userID;
    const sql = "SELECT idAuthor, idPost, urlpicture, postTitle, description, typeSIT, typeIT,"
            + " typeCS, typeDSI, popularRate, name, DATE_FORMAT(editDate, '%Y-%m-%d') AS editDate, name"
            + " FROM content JOIN userInfo ON content.idAuthor = userInfo.id"
            + " WHERE idPost = " + req.query.idPost + ";";
    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            res.render(path.join(__dirname + '/../frontend/page/content.ejs'), { 
                nav: functional.getnav(req),
                putContent: result,
                userID: userID
            });
        }
    });
    
}


module.exports = {
    putTypeSIT: putTypeSIT,
    putTypeIT: putTypeIT,
    putTypeCS: putTypeCS,
    putTypeDSI: putTypeDSI,
    openContent: openContent
};
