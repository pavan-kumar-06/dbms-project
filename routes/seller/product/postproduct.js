//done
const router = require('express').Router();
module.exports = (connection,redirectLogin) => {   

    router.get('/',redirectLogin, (req, res) => {
        res.render('seller_postproduct', {errmsg: ''});
    });

    router.post('/',redirectLogin, (req, res) => {
        const {
            Productname,
            image_url,
            Quantity,
            Description,
            Price,
            status,
            catogory_id
        } = req.body;
        const countRowsQuery = "select max(product_id) as pid  from products";
        connection.query(countRowsQuery,(err,rows1,fields) => {
            if(err) {
                console.log(err);
                res.render('some_error');
            }
            console.log(rows1);
            let product_id = rows1[0].pid+1;
            if(!rows1[0].pid)product_id=1;
            const insertProduct = "insert into products values(?,?,?,?,?,?,?,?,?,?)";
            const user_id = req.session.userIdInSession;
            connection.query(insertProduct,[product_id,user_id,image_url,Productname,Description,parseInt(Price),Quantity,status,new Date().toISOString().slice(0, 10),parseInt(catogory_id)],(err,rows2)=>{
                if(err){
                    console.log(err);
                    res.render('some_error');
                }else{
                    console.log('Product successfully created ', rows2);
                    res.redirect('/sell/postproduct');
                }
            })
        })
    });

    return router;
};