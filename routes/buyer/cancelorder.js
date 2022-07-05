
//not done yet
const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.post('/:id',redirectLogin, (req, res) => {
        const order_id = req.params.id;
        const updateOrder = "update orders set status = 'canceled',delivered_date = curdate() where order_id = ?";
        connection.query(updateOrder, [order_id],(err,order)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            res.redirect('/orders');
        })
    });

    return router;
}