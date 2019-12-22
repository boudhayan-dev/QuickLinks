const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/User");
const UserRepository = require("../repository/UserRepository");





// Passport JS
passport.serializeUser(function (user, done) {
    done(null, user.email);
});


passport.deserializeUser(function (email, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            console.error('There was an error accessing the records of' +
                ' user with email: ' + email);
            return console.log(err.message);
        }
        return done(null, user);
    })
});


// signup strategy
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        process.nextTick(function () {
            console.log("REQ object from form -")
            console.log(JSON.stringify(req.body))
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return err.message;
                }
                if (user) {
                    console.log('user already exists');
                    return done(null, false, { error: 'user already exists' });
                }
                else {
                    let newUser = new User();
                    newUser.username = req.body.username;
                    newUser.email = req.body.email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log('New user successfully created...', newUser.email);
                        console.log(newUser);
                        return done(null, newUser);
                    });
                }
            });
        });
}));


// Loging strategy
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log(error.message)
            }
            if (!user) {
                return done(null, false, {
                    error: "User does not exist"
                });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { error: 'Invalid password try again' });
            }
            return done(null, user);
        });

    }));


    module.exports = passport