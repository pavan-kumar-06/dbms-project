//done
const router = require('express').Router();

module.exports = (connection,redirectHome) => {
    
    router.get('/', redirectHome, (req, res) => {
        res.render('login', {errmsg: ""});
    });

    router.post('/', redirectHome, (req, res) => {
        const {username, password} = req.body;
        console.log(req.body);
        if (username && password) {
            const queryForLogin = "select user_id from user_profile where user_name = ? and user_password = ?";
            connection.query(queryForLogin, [username, password], (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    if (!rows[0]) {
                        res.render('login', {errmsg : "Username or Password is incorrect"});
                    } 
                    else if (!rows[0].user_id) {
                        res.render('login', {errmsg : "Username or Password is incorrect"});
                    }
                    else {
                            console.log('Login successful for username : ', username);
                            req.session.userIdInSession = rows[0].user_id;
                            req.session.usernameInSession = username;
                            res.redirect('/home');
                    }
                }
            });
        }
        else {
            res.render('login', {errmsg : "Username or Password is blank"});
        }
    });

    return router;
};