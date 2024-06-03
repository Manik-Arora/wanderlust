const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingcontroller = require("../controllers/listings");

//Index Route
router.get("/", wrapAsync(listingcontroller.index));

//New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingcontroller.showListing));

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingcontroller.createListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm)
);

//update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingcontroller.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.destroyListing)
);

module.exports = router;
