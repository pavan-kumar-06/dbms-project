//done

const { route } = require('express/lib/application');

const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    router.get('/',redirectLogin,  (req, res) => {
            const uid = req.session.userIdInSession;
            console.log(uid);
            const getUserDetails = "select * from user_profile where user_id = ?";
            connection.query(getUserDetails,[uid],(err,rows)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                console.log(rows);
                res.render('buyer_profile', {details : rows});
            })
    });
    return router;
};