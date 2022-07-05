
//not done yet
const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/:id',redirectLogin, (req, res) => {
        const product_id = parseInt(req.params.id);
        const updateStatus = "update products set status = 'unavailable' where  product_id = ?";
        connection.query(updateStatus,[product_id],(err,rows1)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            console.log(rows1);
            res.redirect('/seller-home-page');
        })
    });

    return router;

}