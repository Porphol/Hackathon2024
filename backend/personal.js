var path = require('path'); // npm install path
// Functional
const functional = require('./functional')

// Show profile
function showProfile(req, res) {
    let showData = {};
    const sqlData = "SELECT u.name , count(c.idPost) AS post , sum(c.popularRate) popularRate  FROM userInfo u"
            + " JOIN content c ON u.id = c.idAuthor WHERE u.id = " + req.cookies.userID + ";";

    const sqlContent = "SELECT idPost, urlpicture, postTitle, typeSIT, typeIT, typeCS, typeDSI,"
            + " popularRate, name, DATE_FORMAT(editDate, '%Y-%m-%d') AS editDate, idAuthor, name"
            + " FROM content JOIN userInfo ON content.idAuthor = userInfo.id"
            + " WHERE idAuthor = " + req.cookies.userID + ";";
    // console.log(sql);
    functional.dbconnect.query(sqlData, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            // console.log(result);
            showData.name = result[0].name;
            showData.postCount = result[0].post || 0;
            showData.likeCount = result[0].popularRate || 0 ;

            functional.dbconnect.query(sqlContent, (errorSQL, result) => {
                if (errorSQL) functional.errorSQL(req, res, errorSQL);
                else {
                    // console.log(result);

                    res.render(path.join(__dirname, '/../frontend/page/profile.ejs'), { 
                        nav: functional.getnav(req),
                        showData: showData,
                        putContent: result
                    });
                }
            });
        }
    });
}



// Edit profile
function editProfile(req, res) {
    const userID = req.cookies.userID
    const sql = "SELECT name FROM userInfo WHERE id = " + userID + ";";

    console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => { 
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            res.render(path.join(__dirname + '/../frontend/page/editProfile.ejs'), { 
                nav: functional.getnav(req),
                name: result[0].name
            });
        }
    });
}


module.exports = {
    showProfile: showProfile,
    editProfile: editProfile
};
