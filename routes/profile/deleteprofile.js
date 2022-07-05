//done
const router = require('express').Router();

module.exports = (connection,redirectLogin,SESS_NAME) => {

    router.get('/', redirectLogin, (req, res) => {
        const uid = req.session.userIdInSession;
        const deleteProducts = "delete from products where user_id = ?"
        const deleteUserProfile = "delete from user_profile where user_id = ?"
            connection.query(deleteProducts, [uid], (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.render('some_error');
                }
                else {
                    connection.query(deleteUserProfile, [uid], (err, rows1, fields) => {
                        if (err) {
                            console.log(err);
                            res.render('some_error');
                        }
                        req.session.destroy(err => {
                            if (err) {
                                console.log(err);
                                res.render('some_error');
                            }
                            else {
                                res.redirect('/home');
                            }
                        });
                
                        res.clearCookie(SESS_NAME);
                    });
                }
            });
    });

    return router;
};