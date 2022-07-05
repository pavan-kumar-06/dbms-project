const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    
    router.get('/:id',redirectLogin, (req, res) => {    
        const product_id = req.params.id;    
        const getAllordersOfUser = "select p.product_id,p.product_name,o.order_id,o.price,o.quantity,u.address from orders o,products p,user_profile u where p.product_id = ? and p.user_id = ? and o.product_id = p.product_id and o.user_id = u.user_id and o.status='placed'";
        connection.query(getAllordersOfUser,[product_id,req.session.userIdInSession],(err,rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }
            console.log(rows);   
            res.render('seller_orders',{products:rows})
        })
    });
    //search request
    router.get('/',redirectLogin, (req, res) => {        
        const getAllordersOfUser = "select o.placed_date,p.image_url,u.address,p.product_id,p.product_name,o.order_id,o.price,o.quantity,u.address from orders o,products p,user_profile u where p.user_id = ? and o.product_id = p.product_id and o.user_id = u.user_id and o.status='placed' order by p.product_name ";
        connection.query(getAllordersOfUser,[req.session.userIdInSession],(err,rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }
            console.log(rows);   
            console.log(typeof(rows[0].placed_date));
            res.render('seller_orders',{products:rows})
        })
    });



    return router;
};