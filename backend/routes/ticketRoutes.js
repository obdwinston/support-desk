const express = require("express");
const router = express.Router();

const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTickets).post(protect, createTicket);
// route allows method chaining
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
