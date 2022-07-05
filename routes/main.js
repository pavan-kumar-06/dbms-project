const router = require('express').Router();

module.exports = () => {
    
    router.get('/', (req, res) => {
        res.render('main');
    });

    return router;
};