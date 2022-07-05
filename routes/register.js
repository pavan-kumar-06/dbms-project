const { add } = require('nodemon/lib/rules');

//done
const router = require('express').Router();
module.exports = (connection) => {   

    router.get('/', (req, res) => {
        res.render('register', {errmsg: ''});
    });

    router.post('/', (req, res) => {
        const {
            username,
            fullname,
            address,
            phonenumber,
            password,
            image_url
        } = req.body;
        if(phonenumber.length!=10){
            res.render('register', {errmsg : 'Please Enter valid phone number'})
        }
        else if (username && fullname && phonenumber && address && password) {
            const queryGetNumberOfUsers = "select max(user_id) as users_count from user_profile";//for id
            connection.query(queryGetNumberOfUsers, (err, rows1, fields) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    const queryGetUserForUsername = "select count(*) as user_count from user_profile where user_name = ?";//exist or not user_name
                    connection.query(queryGetUserForUsername, [username], (err, rows2, fields) => {
                        if (err) {
                            console.log(err);
                            res.render('some_error');
                        }
                        else {
                            if (rows2[0].user_count !== 0) {
                                res.render('register', {errmsg : 'Username already exists!!'})
                            }
                            else {
                                const user_id = rows1[0].users_count + 1;
                                const queryForRegister = "insert into user_profile values (?, ?, ?, ?, ?, ?,?)";
                                connection.query(queryForRegister, [
                                    user_id, 
                                    password, 
                                    username, 
                                    fullname, 
                                    address,
                                    phonenumber,
                                    image_url
                                ], (err, rows3, fields) => {
                                    if (err) {
                                        console.log(err);
                                        res.render('some_error');
                                    }
                                    else {
                                        req.session.userIdInSession = user_id;
                                        req.session.usernameInSession = username;
                                        console.log('User successfully registered. Details: ', rows3);
                                        res.redirect('/login');
                                    }
                                });
                            }
                        }
                    });                
                }
            });
        }
        else {
            res.render('register', {errmsg : 'Please fill all fields'})
        }
    });

    return router;
};