const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/', redirectLogin,(req, res) => {
        const getOrdersCanceled = "select o.delivered_date,u.address,p.product_id,p.product_name,p.image_url,o.price,o.quantity,o.order_id from user_profile u,orders o,products p where p.user_id = ? and o.product_id = p.product_id and o.status='canceled' and u.user_id= o.user_id";
        const getOrdersDelivered = "select o.delivered_date,u.address, p.product_id,p.product_name,p.image_url,o.price,o.quantity,o.order_id from orders o,products p,user_profile u where p.user_id = ? and o.product_id = p.product_id and o.status='delivered' and u.user_id = o.user_id";
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
                        let total_sales =0;
                        for(let i=0;i<deliver.length;i++){
                            total_sales+=deliver[0].quantity*deliver[0].price;
                        }
                        res.render('seller_history',{canceledProducts : cancel,deliveredProducts:deliver,total:total_sales});
                    }
                })
            }
        })
    });
    return router;
};