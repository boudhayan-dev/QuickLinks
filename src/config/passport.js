const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/User");

// Passport JS serialize user
passport.serializeUser(function (user, done) {
    done(null, user.email);
});


// Deserialize user
passport.deserializeUser(async function (email, done) {
    try {
        let user = await User.findOne({ email:email })
        return done(null,user)
    } catch (error) {
        return console.log(err.message);
    }
});


// Sign up strategy
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        try {
            // Check if all fields are present
            if (email.length < 0 || password.length < 0 || (req.body.username).length < 0) {
                return done(null, false, {
                    error: 'Please fill up mandatory fields'
                });
            }
            let user = await User.findOne({ email: email })
            if(user){
                return done(null, false, { 
                    error: 'Please use a different email' 
                });
            }
            else{
                let newUser = new User();
                newUser.username = req.body.username;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                await newUser.save()
                return done(null,newUser)
            }
        } catch (error) {
            return done(null, false, { 
                error: error.message
            });
        }

    }));


// Log in strategy
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        try {
            // Check if all fields are present
            if (email.length < 0 || password.length < 0) {
                return done(null, false, {
                    error: 'Please fill up mandatory fields'
                });
            }
            let user = await User.findOne({ email:email })
            if(!user){
                return done(null,false,{
                    error: "Uh ho! you are not registered with us. Please sign up."
                })
            }
            if (!user.validPassword(password)) {
                return done(null, false, { 
                    error: 'Invalid password try again !' 
                });
            }
            return done(null, user);

        } catch (error) {
            return done(null,false,{
                "error": error.message
            })
        }
}));



module.exports = passport