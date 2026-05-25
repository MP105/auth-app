
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require("dotenv").config();
require("./Models/db");
const AuthRouter =require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
    res.send("pong");
});
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products', ProductRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});