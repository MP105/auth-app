
const ensureAuthenticated = require('../Middlewares/auth');
const router = require('express').Router();

router.get('/',ensureAuthenticated , (req, res) => {
    res.status(200).json([
       {
        name: "mobile",
        price: 1099
      
       },
       {
        name: "tv",
        price: 3099
      
       },
    ]);
}
);




module.exports = router;