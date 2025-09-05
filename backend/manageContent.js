var path = require('path'); // npm install path
// Functional
const functional = require('./functional');
const { log } = require('util');
const { count } = require('console');


// Create content
function tocreateContent(req, res) {
    res.render(path.join(__dirname + '/../frontend/page/create.ejs'), { nav: functional.getnav(req) });
}

// Post content
function postContent(req,res) {
    const userID = req.cookies.userID;
    let userData = {
        id: userID,
        title: req.query.title,
        description: req.query.description,
        picture: req.query.picture,
        typeSIT: false,
        typeIT: false,
        typeCS: false,
        typeDSI: false,
    };
    
    if (req.query.SIT != null) {
        userData.typeSIT = true;
        userData.typeIT = true;
        userData.typeCS = true;
        userData.typeDSI = true;
    }
    if (req.query.IT != null) userData.typeIT = true;
    if (req.query.CS != null) userData.typeCS = true;
    if (req.query.DSI != null) userData.typeDSI = true;
    if (!req.query.SIT && !req.query.IT && !req.query.CS && !req.query.DSI) userData.typeSIT = true;
    if (req.query.description === '') userData.description = ' ';
    
   // Set default picture
   const defaultPicture = "https://www.sit.kmutt.ac.th/wp-content/uploads/2017/11/2560-11-06_05-29-16_004.jpg";
    if (!userData.picture || /^\s*$/.test(userData.picture) || !userData.picture.startsWith("https://")) {
        userData.picture = defaultPicture;
        // console.log("Fail to add picture, Add default picture");
    }

    // console.log(userData);
    const sql = "INSERT INTO content (idAuthor, editDate, postTitle, description, urlpicture,"
        + " typeSIT, typeIT, typeCS, typeDSI) VALUES"
        + " (" + userData.id + ","
        + " CURRENT_DATE(),"
        + " '" + userData.title + "',"
        + " '" + userData.description + "',"
        + " '" + userData.picture + "',"
        + " " + userData.typeSIT + ","
        + " " + userData.typeIT + ","
        + " " + userData.typeCS + ","
        + " " + userData.typeDSI + ");";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            // console.log(result);
            res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {
                nav: functional.getnav(req),
                message: "Post successfully",
                goto: "<a href=\"/\">Return to blog</a>"
            });
        }
    });
}



// Edit
// Put old content 
function toeditContent(req, res) {
    let oldContent = {};
    const idPost = req.query.idPost;
     
    const sql = "SELECT postTitle, description, urlpicture, typeSIT, typeIT, typeCS, typeDSI"
                + " FROM content WHERE idPost = " + idPost + ";";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL);
        else {
            if (result.length > 0) {
                oldContent.postTitle = result[0].postTitle;
                oldContent.description = result[0].description;
                oldContent.urlpicture = result[0].urlpicture;
                oldContent.typeSIT = result[0].typeSIT;
                oldContent.typeIT = result[0].typeIT;
                oldContent.typeCS = result[0].typeCS;
                oldContent.typeDSI = result[0].typeDSI;
            }
            
            res.render(path.join(__dirname + '/../frontend/page/edit.ejs'), {
                nav: functional.getnav(req),
                oldContent: oldContent,
                idPost: idPost,
            });
        }
    });
}



function updateContent(req,res) {
    const idPost = req.query.idPost;
    console.log(idPost)
    let userData = {
        idPost: idPost,
        title: req.query.title,
        description: req.query.description,
        picture: req.query.picture,
        typeSIT: false,
        typeIT: false,
        typeCS: false,
        typeDSI: false,
    };
    
    if (req.query.SIT != null) userData.typeSIT = true;
    if (req.query.IT != null) userData.typeIT = true;
    if (req.query.CS != null) userData.typeCS = true;
    if (req.query.DSI != null) userData.typeDSI = true;
    if (!req.query.SIT && !req.query.IT && !req.query.CS && !req.query.DSI) userData.typeSIT = true;
    if (req.query.description === '') userData.description = ' ';
    
   // Set default picture
   const defaultPicture = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sit.kmutt.ac.th%2F2560-11-06_05-29-16_004%2F&psig=AOvVaw1xCR0DrGSAf2KNI9aQ07dm&ust=1720379650867000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiXsuWPk4cDFQAAAAAdAAAAABBZ";
    if (!userData.picture || /^\s*$/.test(userData.picture) || !userData.picture.startsWith("https://")) {
        userData.picture = defaultPicture;
        console.log("Fail to add picture, Add default picture");
    }

    console.log(userData);
//    console.log(userData);
    const sql = "UPDATE content SET "
        + " editDate = CURRENT_DATE(),"
        + " postTitle = '" + userData.title + "',"
        + " description = '" + userData.description + "',"
        + " urlpicture = '" + userData.picture + "',"
        + " typeSIT = " + userData.typeSIT + ","
        + " typeIT = " + userData.typeIT + ","
        + " typeCS = " + userData.typeCS + ","
        + " typeDSI = " + userData.typeDSI
        + " WHERE id = " + userData.id + ";";

    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL); 
        else {
            // console.log(result);
            res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {
                nav: functional.getnav(req),
                message: "Edit post successfully",
                goto: "<a href=\"/\">Return to blog</a>",
                idPost: idPost
            });
        }
    });
}







// Like function
function likeReturn(req, res) {
    const showContent = require('./showContent')

    const idPost = req.query.idPost;
    const like = req.query.like;
    const sql = "UPDATE content SET popularRate = (popularRate + 1) WHERE idPost = " + idPost + ";";
    
    // console.log(like);
    // console.log(sql);
    if (like === 'like') {
        functional.dbconnect.query(sql, (errorSQL, result) => {
            if (errorSQL) functional.errorSQL(req, res, errorSQL); 
            else {
                showContent.putTypeSIT(req, res);
            }
        });
    } else {
        showContent.putTypeSIT(req, res);
    }
}



// Delete content
function deleteContent(req, res) {
    const sql = "DELETE FROM content WHERE idPost = " + req.query.idPost + ";"
    
    // console.log(sql);
    functional.dbconnect.query(sql, (errorSQL, result) => {
        if (errorSQL) functional.errorSQL(req, res, errorSQL); 
        else {
            res.render(path.join(__dirname + '/../frontend/page/successfully.ejs'), {
                nav: functional.getnav(req),
                message: "Delete post successfully",
                goto: "<a href=\"/\">Return to blog</a>"
            });
        }
    });
}


module.exports = {
    tocreateContent: tocreateContent,
    postContent: postContent,
    toeditContent: toeditContent,
    updateContent: updateContent,
    likeReturn: likeReturn,
    deleteContent: deleteContent
};
