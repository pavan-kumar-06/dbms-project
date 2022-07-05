const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    
    router.get('/',redirectLogin, (req, res) => {
        const getAllProducts = "select * from products";
            connection.query(getAllProducts,(err,rows)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                res.render('home', {products : rows,uid : req.session.userIdInSession,seller:false});
            })
    });

    router.post('/search',redirectLogin, (req, res) => {
        const search = req.body.search;
        const getAllProducts = "select * from products where product_name like '%"+search+"%' or description like '%"+search+"%' ";
        connection.query(getAllProducts,(err,rows)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                res.render('home', {products : rows,uid : req.session.userIdInSession,seller:false});
            })
    });

    router.post('/catogory',redirectLogin, (req, res) => {
        const id = parseInt(req.body.filter);
        const getAllProducts = "select * from products where catogory_id=? ";
        connection.query(getAllProducts,[id],(err,rows)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                res.render('home', {products : rows,uid : req.session.userIdInSession,seller:false});
            })
    });

    router.post('/',redirectLogin, (req, res) => {
        const cat = req.body.cat;
        let query;
        if(cat=="pricelh"){
            query = "select * from products order by price";
        }else if(cat =="pricehl"){
            query = "select * from products order by price desc";
        }
        else if(cat=="available"){
            query = "select * from products where status= 'available'";
        }else if(cat == "recentposts"){
            query = "select * from products order by post_date desc";
        }
        connection.query(query,(err,rows)=>{
                if(err) {
                    console.log(err);
                    res.render('some_error');
                }            
                res.render('home', {products : rows,uid : req.session.userIdInSession,seller:false});
            })
    });


    return router;
};