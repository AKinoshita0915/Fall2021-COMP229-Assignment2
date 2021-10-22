let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create user model instance
let userModel = require("../models/user");
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { 
      title: 'Home',
      displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { 
      title: 'About',
      displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { 
      title: 'Products',
      displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { 
      title: 'Services',
      displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { 
      title: 'Contact',
      displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if user is already logged in
    if(!req.user)
    {
        res.render('auth/login', { 
            title: 'Login',
            messages: req.flash("loginMessage"),
            displayName: req.user ? req.user.displayName : ""
          });
    }
    else
    {
        return res.redirect("/")
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate("local", 
    (err, user, info) => {
        // server error
        if(err)
        {
            return next(err);
        }
        // user login error
        if(!user)
        {
            req.flash("loginMessage", "Authentication Error")
            return res.redirect("/login");
        }
        req.login(user, (err) => {
            // server error
            if(err)
            {
                return next(err);
            }
            return res.redirect("/contact-list");
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if user is not logged in
    if(!req.user)
    {
        res.render("auth/register",
        {
            title: "Register",
            messages: req.flash("registerMessage"),
            displayName: req.user ? req.user.displayName : ""
        });
    }
    else
    {
        return res.redirect("/");
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate user object
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting new User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    "registerMessage", 
                    "Registration Error: User already exists"
                );
                console.log("Error: user already exists")
            }
            return res.render("auth/register",
            {
                title: "Register", 
                messages: req.flash("registerMessage"),
                displayName: req.user ? req.user.displayName : ""
            });
        }
        else
        {
            // registration success
            return passport.authenticate("local")(req, res, () => {
                res.redirect("/contact-list")
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.Logout();
    res.redirect("/");
}