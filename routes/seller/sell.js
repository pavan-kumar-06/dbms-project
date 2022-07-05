const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    
    router.get('/',redirectLogin, (req, res) => {        
        const user_id = req.session.userIdInSession;
        const getAllProducts = "select * from products where user_id = ?";
        connection.query(getAllProducts,[user_id],(err,rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }            
            res.render('home', {products : rows,uid : req.session.userIdInSession,seller:true});
        })
    });

    return router;
};