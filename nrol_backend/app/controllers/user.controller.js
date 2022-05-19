const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const e = require('express');

exports.register = async (req, res) => {
    const user = req.body;
    
    // Check if either the username or email is already taken
    const takenUsername = await User.findOne({username: user.username});
    const takenEmail = await User.findOne({email: user.email});
    
    if( takenEmail || takenUsername ) {
        res.json({message: "FAILURE - Either the username or email is taken."});
    }
    
    else {
        // salt and hash the password
        user.password = await bcrypt.hash(req.body.password, 10);
        let currentUserEmail = user.email
        let currentUsername = user.username
        toString(currentUsername).toLowerCase()
        toString(currentUserEmail).toLowerCase()

        const dbUser = new User({
            password: user.password,
            username: currentUsername,
            email: currentUserEmail
        });
    
        dbUser.save();
        res.json({message: "SUCCESS - New user saved to database."});
    }
}

exports.login = (req, res) => {
    

    const currentUser = req.body;
    User.findOne({username: currentUser.username})
        .then( dbUser => {
            if( !dbUser ){
                console.log('FAILURE finding User')
                return res.json({message: "Invalid Username"})
            }
            else{
                bcrypt.compare(currentUser.password, dbUser.password)
                .then(match => {
                    if(match){
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username
                        }

                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET_KEY,
                            {expiresIn: 86400},
                            (err, token) => {
                                if (err) return res.json({message: "FAILURE - An error occured while trying to sign the JSON web token."});
                                return res.json({
                                    message: "SUCCESS - The JSON web token was signed.",
                                    token: `Bearer ${token}`,
                                    isLoggedIn: true
                                })
                            }
                        )
                    }
                    else{
                        console.log('Invalid Username or Password')
                        return res.json({message: "Invalid Username or Password"})
                    }
                })
            }
        })
}