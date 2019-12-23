const express = require("express")
const passport = require("../config/passport")
const validUrl = require("valid-url")

const Links = require("../models/Links");
const User = require("../models/User");



let router = express.Router()

// initialize pasport session 
router.use(passport.initialize());
router.use(passport.session());


// middleware to check if the request is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}


// dashboard
router.get("/dashboard", isLoggedIn, async (req, res) => {
    
    let user = await User.findById(req.user.id).populate("links")
    let quickLinks = user.links
    let username = user.username
    res.render('dashboard', {
        quickLinks,
        username
    })
})


// sign-up page
router.route("/signup")
    .get(function (req, res) {
        if (req.isAuthenticated()) {
            return res.redirect("dashboard")
        }
        res.render('signup');
    })
    .post(function (req,res,next){
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                console.log("error in signing up")
                return next(err); 
            }
            if (!user) {
                console.log("error in reg user " +JSON.stringify(info))
                return res.status(409).render('signup', {
                    "errorMessage": info.error
                });
            }
            req.login(user, function (err) {
                if (err) {
                    console.error(err);
                    return res.status(409).render('signup', {
                        "errorMessage": err
                    });
                }
                return res.redirect('/dashboard');
            });
        })(req, res, next);
    })


// login page
router.route("/login")
      .get(function(req,res){
          if(req.isAuthenticated()){
              return res.redirect("dashboard")
          }
          res.render("login")
      })
      .post(function(req,res,next){
          passport.authenticate('local-login', function (err, user, info) {
              if (err) {
                  console.log("error logging in")
                  return next(err); 
              }
              if (!user) {
                  console.log(info.error)
                  return res.render('login', {
                      "errorMessage":info.error
                  });
              }
              req.login(user, function (err) {
                  if (err) {
                      console.error(err);
                      return next(err);
                  }
                  return res.redirect('/dashboard');
              });
          })(req, res, next);
      })


// logout
router.get('/logout', isLoggedIn,  function (req, res) {
    req.logout();
    req.session.destroy();
    return res.redirect('/login');
});


// add new links
router.post("/add", isLoggedIn, async (req, res) => {
    let payload = req.body
    if ((payload.link.length < 0) || (payload.name.length < 0)){
        
        return res.send( {
            "errorMessage": "Missing mandatory fields"
        })
    }
    // check for valid url
    if(!validUrl.isUri(payload.link)){
        console.log("malfirmed url")
        return res.send({
            "errorMessage": "Malformed URL"
        })
    }
    // check if link already exists in db for user
    let existingLink = await Links.findOne({ link:payload.link, user:req.user.id })
    if(existingLink){
        return res.send({
            "errorMessage": "You have already saved this link."
        })
    }
    // Error if image size is more than 5 mb
    let imageSize = new Buffer(payload.imageB64, 'base64').length
    if((imageSize/(1e+6))>5){
        return res.send({
            "errorMessage": "Use an image smaller than 5 mb."
        })
    }
    // trim payload name and descripton (if present) to  50 words
    payload.name = (payload.name).trim().substring(0, 50)
    payload.description = (payload.description).trim().substring(0, 50)
    
    let links = new Links({ ...payload, "user":req.user.id })
    try {
        await links.save()
        return res.status(200).send({
            "status":"Successfully added"
        })
    } catch (error) {
        return res.send( {
            "errorMessage": "Something went wrong ! Try again"
        })
    } 
})



router.delete("/deleteLink", isLoggedIn, async(req,res)=>{
    try {
        await Links.deleteMany({ link:req.body.link, user:req.user.id });
        return res.status(200).send({
            "status":"successfully deleted"
        })
    } catch (error) {
        return res.status(400).send({
            "errorMessage":"Something went wrong while deleting"
        })
    }
})


router.post("/deleteUserProfile", isLoggedIn, async(req,res)=>{
    // delete user from database
    try {
        await Links.deleteMany({ user:req.user.id })
        await User.findByIdAndDelete(req.user.id)
        req.logout();
        req.session.destroy();
        return res.redirect('/login');
    } catch (error) {
        console.log("Error deleting profile")
        return res.render("dashboard")
    } 
})


router.all("*",(req,res)=>{
    if (req.isAuthenticated()) {
        res.render("/dashboard")
    }
    return res.redirect("/signup")
})

module.exports = router