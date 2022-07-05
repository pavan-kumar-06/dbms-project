const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/', redirectLogin,(req, res) => {
        const getOrdersCanceled = "select o.delivered_date,p.product_id,p.product_name,p.image_url,o.price,o.quantity,o.order_id from orders o,products p where o.user_id = ? and o.product_id = p.product_id and o.status='canceled'";
        const getOrdersDelivered = "select o.delivered_date,p.product_id,p.product_name,p.image_url,o.price,o.quantity,o.order_id from orders o,products p where o.user_id = ? and o.product_id = p.product_id and o.status='delivered'";
        connection.query(getOrdersCanceled,[req.session.userIdInSession],(err,cancel)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }else{
                connection.query(getOrdersDelivered,[req.session.userIdInSession],(err,deliver)=>{
                    if(err){
                        console.log(err);
                        res.render('some_error');
                    }else{
                        res.render('buyer_history',{canceledProducts : cancel,deliveredProducts:deliver});
                    }
                })
            }
        })
    });
    return router;
};