const jwt = require("jsonwebtoken");
let router = require("express").Router();
require('dotenv').config();

function verifyJWT(req, res, next){

    const token = req.headers["x-access-token"]?.split(' ')[1];

    // Proceed if token is not equal to null
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err != null){
                return res.json({
                    message: "Failed to Authenticate.",
                    isLoggedIn: false
                })
            }
            else{
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                return res.json({
                    message: "Authenticated successfully.",
                    isLoggedIn: true,
                    username: req.user.username
                })
            }
        })
    } else {
        
        // If the JWT is incorrect set 'isLoggedIn' to false
        return res.json({message: "Incorrect JSON web token provided.", isLoggedIn: false})
    }
}


module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new User
    router.post("/register", users.register);

    // Login
    router.post("/login", users.login);

    router.get('/isUserAuth', verifyJWT)

    app.use('/api/', router);
};