const express = require("express");
const router = express.Router({ mergeParams: true });
// mergeParams in noteRoutes
// add noteRouter to ticketRoutes

const { getNotes, createNote } = require("../controllers/noteControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, createNote);

module.exports = router;
