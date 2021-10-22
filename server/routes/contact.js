let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

let contactController = require("../controllers/contact.js");

// function for guard purpose
function requireAuth(req, res, next)
{
    // check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect("/login");
    }
    next();
}


/* GET Route for Add page - CREATE */
router.get("/add", requireAuth, contactController.displayAddpage);
/* POST Route for Add page - CREATE */
router.post("/add", requireAuth, contactController.processAddPage);
/* GET Route for Contact List page - READ */
router.get("/", contactController.displayContactList);
/* GET Route for Edit page - UPDATE */
router.get("/edit/:id", requireAuth, contactController.displayEditPage);
/* POST Route for Edit page - UPDATE */
router.post("/edit/:id", requireAuth, contactController.processEditPage);
/* GET Route for Contact List page - DELETE */
router.get("/delete/:id", requireAuth, contactController.performDelete);

module.exports = router;