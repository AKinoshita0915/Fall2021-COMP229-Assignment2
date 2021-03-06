let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            requried: "username is required"
        },
        //
        password: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        //
        email:
        {
            type: String,
            default: "",
            trim: true,
            requried: "email address is required"
        },
        displayName: 
        {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required"
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

// configure options for user model
let options = ({missingPasswordError: "Error: Please enter password"});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model("User", User);