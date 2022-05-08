const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const cors = require('cors');
const productRoute = require("./routes/product");
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connection Successfull!"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: "20mb"}));

app.use('/api', userRoute);
app.use('/api/Product',productRoute);
app.listen(process.env.PORT || 8007, () => {
    console.log('Backend sever is running!');
});