const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    
    router.get('/',redirectLogin, (req, res) => {
        const user_id = req.session.userIdInSession;
        const unavailableProducts = "select p.image_url,p.status,c.*,p.product_name,p.price from products p,cart c where  p.product_id = c.product_id and (p.status = 'unavailable' or p.quantity<c.quantity) and c.user_id = ?";
            connection.query(unavailableProducts,[user_id],(err,unProducts)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                
                const availableProducts = "select p.image_url,p.status,c.*,p.product_name,p.price from products p,cart c where p.product_id = c.product_id and p.status = 'available' and c.user_id = ? and p.quantity>=c.quantity";
                connection.query(availableProducts,[user_id],(err,avaProducts)=>{
                    if(err) {
                        console.log(err);
                        res.render('some_error');
                    }            
                    console.log(avaProducts);
                    console.log(unProducts);
                    let total =0;
                    for (let i = 0; i < avaProducts.length; i++) {
                        total += avaProducts[i].quantity * avaProducts[i].price;
                    }
                    res.render('buyer_cart',{available:avaProducts,unavailable:unProducts,total:total});
                })
            })
    });

    return router;
};