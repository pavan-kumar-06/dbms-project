//done

const router = require('express').Router();

module.exports = (connection,redirectLogin) => {
    router.post('/:id',redirectLogin,  (req, res) => {
        const product_id = req.params.id;
        const uid = req.session.userIdInSession;
        const deleteQuery = "delete from whishlist where product_id = ? and user_id = ?";
        connection.query(deleteQuery,[product_id,uid],(err,rows)=>{
            if(err) {
                console.log(err);
                res.render('some_error');
            }            
            console.log(rows);
            res.redirect('/whishlist');
        })
    });
    return router;
};