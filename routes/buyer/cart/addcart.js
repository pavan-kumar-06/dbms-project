//done
const router = require('express').Router();
module.exports = (connection,redirectLogin) => {   
    router.post('/:id',redirectLogin, (req, res) => {
        const product_id = parseInt(req.params.id);
        const {
            quantity
        } = req.body;
        const user_id = req.session.userIdInSession;
        const insertIntoCart = "insert into cart values(?,?,?)";
        const updateCart = "update cart set quantity = ? where product_id = ? and user_id=?";
        const checkCart = "select * from cart where user_id = ? and product_id=?";
        connection.query(checkCart,[user_id,product_id], (err,rows1,fields) => {
            if(err) {
                console.log(err);
                res.render('some_error');
            }
            if(!rows1[0])//not present
            {
                connection.query(insertIntoCart,[user_id,product_id,parseInt(quantity)],(err,rows2)=>{
                    if(err){
                        console.log(err);
                        res.render('some_error');
                    }else{
                        console.log('Cart inserted into ', rows2);
                        res.redirect('/cart');
                    }
                })
            }else{
                connection.query(updateCart,[parseInt(quantity),product_id,user_id],(err,rows2)=>{
                    if(err){
                        console.log(err);
                        res.render('some_error');
                    }else{
                        console.log('Cart updated into ', rows2);
                        res.redirect('/cart');
                    }
                })
            }
        })
    });

    return router;
};