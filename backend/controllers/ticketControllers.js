const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc    gets user tickets
// @route   GET /api/tickets
// @access  private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  // req.user returned from protect in authMiddleware
  // recall req.user object does not have password property

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    gets user ticket
// @route   GET /api/tickets/:ticketId
// @access  private
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }

  res.status(200).json(ticket);
});

// @desc    deletes user ticket
// @route   DELETE /api/tickets/:ticketId
// @access  private
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }

  await Ticket.findByIdAndDelete(req.params.ticketId);

  res.status(200).json({ success: true });
});

// @desc    updates user ticket
// @route   DELETE /api/tickets/:ticketId
// @access  private
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    req.body,
    { new: true } // creates ticket if does not exist
  );

  res.status(200).json(updatedTicket);
});

// @desc    creates ticket
// @route   POST /api/tickets
// @access  private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add product and description");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
