let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// referance to the model
let Contact = require("../models/contact");

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render("contact/list",
            {
                title: "Contacts",
                ContactList: contactList,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.displayAddpage = (req, res, next) => {
    res.render("contact/add", 
    {
        title: "Add Contact",
        displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "company": req.body.company,
        "description": req.body.description,
        "email": req.body.email,
        "phone": req.body.phone
    });

    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.redirect("/contact-list");
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show edit view
            res.render("contact/edit", {
                title: "Edit Contact",
                contact: contactToEdit,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateContact = Contact({
        "_id": id,
        "name": req.body.name,
        "company": req.body.company,
        "description": req.body.description,
        "email": req.body.email,
        "phone": req.body.phone
    });

    Contact.updateOne({_id: id}, updateContact, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.redirect("/contact-list");
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh
            res.redirect("/contact-list");
        }
    });
}