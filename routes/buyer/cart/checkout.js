const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/', redirectLogin,(req, res) => {
        const callProcedureCheckout = "call checkout(?)";
        connection.query(callProcedureCheckout,[req.session.userIdInSession],(err,rows)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }else{
                console.log(rows);
                res.redirect('/cart');
            }
        })
    })
    return router;
};