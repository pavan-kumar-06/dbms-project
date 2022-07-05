
//not done yet
const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/',redirectLogin, (req, res) => {
        const uid = parseInt(req.session.userIdInSession);
        const userDetails = "select *  from user_profile where user_id = ?";
        connection.query(userDetails,[uid],(err,rows1)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            res.render('buyer_updateprofile',{user_data:rows1});
        })
    });

    router.post('/', redirectLogin, (req, res) => {
        const uid = parseInt(req.session.userIdInSession);
        const userDetails = "select *  from user_profile where user_id = ?";
        connection.query(userDetails,[uid],(err,rows1)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            const {user_password,user_name,full_name,address,phone_number,image_url}=req.body;
            const userUpdate = "update user_profile set user_name= ?,full_name = ? ,address = ?, phone_number = ?, user_password = ? ,image_url = ?where user_id = ?";
            connection.query(userUpdate,[user_name,full_name,address,phone_number,user_password,image_url,uid],(err,rows1)=>{
                if(err){
                    console.log(err);
                    res.render('some_error');
                }
                res.redirect('/profile');
            })        
        })
    });
    return router;

}