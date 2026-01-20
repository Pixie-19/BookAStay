const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");

const validateListing  = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Index Route
router.get("/", wrapAsync(async (req,res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs" , {allListings});
    } catch(err) {
        console.log(err);
        res.send("Something went wrong!");
    }
}));

//NewRoute
router.get("/new",(req,res) => {
    res.render("listings/new.ejs")
});

//Show Route
router .get("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));


//Create Route
//app.post("/listings", async (req,res) => {
    //let {title,description,image,price,country,location} = req.body;
//    const newListing = new Listing(req.body.listing);
//    await newListing.save();
//    res.redirect("/listings");
//});
router.post("/",validateListing,
    wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing); 
    
    await newListing.save();
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , { listing });
}));

//Update Route
//app.put("/listings/:id", async (req,res) => {
//    let {id} = req.params;
//    await Listing.findByIdAndUpdate(id, {...req.body.listing});
//    res.redirect("/listings");
//});
router.put("/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, req.body); 
        res.redirect("/listings");
}));

//Delete Route
router.delete("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;