const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/', redirectLogin,(req, res) => {
        const getOrders = "select p.product_id,p.product_name,p.image_url,o.price,o.quantity,o.order_id from orders o,products p where o.user_id = ? and o.product_id = p.product_id and o.status='placed'";
        connection.query(getOrders,[req.session.userIdInSession],(err,rows)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }else{
                console.log(rows);
                res.render('buyer_orders',{products : rows});
            }
        })
    })
    router.post('/',redirectLogin, (req, res) => {
        const {
            quantity,
            pid,
            price
        } = req.body;
                const countRowsQuery = "select count(*) as cnt from orders";
                connection.query(countRowsQuery,(err,rows1,fields) => {
                    if(err) {
                        console.log(err);
                        res.render('some_error');
                    }
                    let order_id = rows1[0].cnt+1;
                    if(!rows1[0].cnt)order_id =0;
                    const insertProduct = "insert into orders values(?,?,?,?,?,?,?,?)";
                    const user_id = req.session.userIdInSession;
                    connection.query(insertProduct,[order_id,pid,user_id,quantity,parseInt(price),'placed',new Date().toISOString().slice(0, 10),new Date().toISOString().slice(0, 10)],(err,rows2)=>{
                        if(err){
                            console.log(err);
                            res.render('some_error');
                        }else{
                            res.redirect('/orders')
                        }
                    })
                })        
    });
    return router;
};