const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL= "mongodb://127.0.0.1:27017/BookAStay";
main()
    .then(() => {
        console.log("connected to DB");
    }).catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req,res) => {
    res.send("hi, i am root");
});

app.get("/listings", async (req,res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs" , {allListings});
    } catch(err) {
        console.log(err);
        res.send("Something went wrong!");
    }
});

//NewRoute
app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs")
});

//Show Route
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route
//app.post("/listings", async (req,res) => {
    //let {title,description,image,price,country,location} = req.body;
//    const newListing = new Listing(req.body.listing);
//    await newListing.save();
//    res.redirect("/listings");
//});
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body); // ✅ FIXED
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , { listing });
});

//Update Route
//app.put("/listings/:id", async (req,res) => {
//    let {id} = req.params;
//    await Listing.findByIdAndUpdate(id, {...req.body.listing});
//    res.redirect("/listings");
//});
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body); // ✅ FIXED
    res.redirect("/listings");
});

//Delete Route
app.delete("/listings/:id", async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

//    app.get("/testListing" , async (req,res) => {
//      let sampleListing = new Listing ({
//           title: "My New Villa",
//            description: "By the beach",
//            price: 1200,
//            location: "Calangute,Goa",
//            country: "India",
//        });
//
//        await sampleListing.save();
//        console.log("sample was saved");
//        res.send("successful testing");
//    });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
}); 



/* const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// =======================
// Database Connection
// =======================
const MONGO_URL = "mongodb://127.0.0.1:27017/BookAStay";

main()
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// =======================
// App Configuration
// =======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // parses form data
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// =======================
// Routes
// =======================

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to BookAStay 🏨");
});

// Index Route - All Listings
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    console.log("Error fetching listings:", err);
    res.send("Something went wrong while fetching listings!");
  }
});

// New Route - Show new listing form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - View one listing
app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.log("Error fetching listing:", err);
    res.send("Listing not found!");
  }
});

// Create Route - Add a new listing
app.post("/listings", async (req, res) => {
  try {
    // ✅ FIXED: req.body.listing is properly handled (form must use listing[title], etc.)
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log("✅ New listing created:", newListing);
    res.redirect("/listings");
  } catch (err) {
    console.log("❌ Error creating listing:", err.message);
    res.send("Validation failed. Please make sure all required fields (like title) are filled in.");
  }
});

// Edit Route - Show edit form
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.log("Error fetching listing for edit:", err);
    res.send("Error loading edit form!");
  }
});

// Update Route - Apply edits
app.put("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ FIXED: correctly spreads req.body.listing
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    console.log("✅ Listing updated:", id);
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.log("❌ Error updating listing:", err);
    res.send("Error updating listing!");
  }
});

// Delete Route - Remove a listing
app.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log("🗑️ Deleted listing:", deletedListing);
    res.redirect("/listings");
  } catch (err) {
    console.log("Error deleting listing:", err);
    res.send("Error deleting listing!");
  }
});

// =======================
// Server
// =======================
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
*/
