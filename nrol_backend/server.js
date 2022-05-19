const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

// import models
const db = require("./app/models");
const User = require('./app/models/user.model');

const app = express();

corsOptions = {
    origin: "http://localhost:3000",
}

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// initalize database
db.mongoose
    .connect(db.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("SUCCESS - Connection to MongoDB established.")
    })
    .catch(err => {
        console.log("FAILURE - Cannot establish a connection to MongoDB.", err);
        process.exit();
    })


// initialize routes
require("./app/routes/launch.routes.js")(app);
require("./app/routes/user.routes.js")(app);




app.get("/", (req, res) => {
    res.json({
        message: "Hello, World!"
    })
});

// listen to requests on PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`SUCCESS - Server is running on port ${PORT}`)
    console.log("SUCCESS - Server is listening for React on port 3000")
})

