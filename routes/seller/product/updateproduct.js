
//not done yet
const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/:id',redirectLogin, (req, res) => {
        const product_id = parseInt(req.params.id);
        const userDetails = "select *  from products where product_id = ?";
        connection.query(userDetails,[product_id],(err,rows1)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            console.log(rows1);
            res.render('seller_updateproduct',{product_data:rows1});
        })
    });

    router.post('/:id', redirectLogin, (req, res) => {
        const product_id = parseInt(req.params.id);
        const {image_url,product_name,price,quantity,description,status,catogory_id}=req.body;
        const productUpdate = "update products set image_url= ?,product_name = ? ,price = ?, quantity = ?, description = ? ,status=?,post_date=?,catogory_id=? where product_id = ?";
        connection.query(productUpdate,[image_url,product_name,price,quantity,description,status,new Date().toISOString().slice(0, 10),parseInt(catogory_id),product_id],(err,rows1)=>{
            if(err){
                console.log(err);
                res.render('some_error');
            }
            res.redirect('/seller-home-page');
        })        
    });
    return router;

}