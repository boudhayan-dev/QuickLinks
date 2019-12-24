require('dotenv').config();
const express = require("express");
const path = require('path')
const app = express()
const hbs = require("hbs")
// auth related imports
const session = require('express-session');
const mongoose = require('mongoose');
const mongodbStore = require('connect-mongo')(session);


const router = require("./router/routes");
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


let PORT = process.env.PORT || 3000

app.set("view engine", "hbs")
app.set("views", viewsPath)
app.use(express.static(staticPath))
hbs.registerPartials(partialsPath)
// Accept json as well as form data
app.use(express.json({ limit: "5mb"}))
app.use(express.urlencoded({ extended: true,  limit: '5mb' }))


// Connect to mongodb
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});



//session
app.use(session({
    name: 'quicklinks.sess', store: new mongodbStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600
    }), secret: process.env.SECRET, resave: false,
    saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 15 }
}));


// Register the routes
app.use("/", router)

app.listen(PORT, () => {
    console.log("Started on port " + PORT);

})