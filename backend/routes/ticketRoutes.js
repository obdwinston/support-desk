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

// .route allows method chaining
router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:ticketId")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

// note routes
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

module.exports = router;
