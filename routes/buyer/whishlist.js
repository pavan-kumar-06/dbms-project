const { route } = require('express/lib/application');
const router = require('express').Router();

module.exports = (connection,redirectLogin) => {

    router.get('/',redirectLogin,  (req, res) => {
        const uid = req.session.userIdInSession;
        const whishlistProducts = "select p.* from products p,whishlist w where w.user_id = ? and w.product_id = p.product_id";
        connection.query(whishlistProducts,[uid],(err,rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }            
            console.log(rows);
            res.render('buyer_whishlist', {products : rows});
        })
    });

    router.post('/',redirectLogin,(req,res)=>{
        const pid = req.body.id;
        const uid = req.session.userIdInSession;
        const checkInWhishlist = "select * from whishlist where product_id =? and user_id = ?";
        connection.query(checkInWhishlist,[parseInt(pid),uid],(err, rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }  
            console.log(rows);
            //if not exist in cart then only add in cart
            if(!rows[0]){
                const insertWhishlist = "insert into whishlist values(?,?)";
                connection.query(insertWhishlist,[uid,parseInt(pid)],(err, rows1)=>{
                    if(err) {
                        console.log(err);
                        res.render('some_error');
                    }  
                    console.log(rows1);
                    res.redirect('/product/'+pid);            
                })          
            }  
            else
            res.redirect('/product/'+pid);   
        })
    })
    return router;
};