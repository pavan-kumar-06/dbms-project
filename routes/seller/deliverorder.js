
//not done yet
const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.post('/:id', redirectLogin, (req, res) => {
        const order_id = parseInt(req.params.id);
        const orderUpdate = "update orders set status='delivered',delivered_date = curdate() where order_id = ?  ";
        connection.query(orderUpdate,[order_id],(err,rows1)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            res.redirect('/sell/orders');
        })        
    });
    return router;

}