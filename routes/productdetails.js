//done

const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    router.get('/:id', redirectLogin, (req, res) => {
        const id = req.params.id;
        const getAllProducts = "select * from products where product_id = ?";
        const getSellerDetails = "select u.* from user_profile u,products p where p.product_id = ? and p.user_id = u.user_id";
        connection.query(getAllProducts,[id],(err,rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }            
            connection.query(getSellerDetails,[id],(err,rows1)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                console.log('product details page');
                res.render('productdetails', {product : rows,seller: rows1});
            })
        })
    });
    return router;
};