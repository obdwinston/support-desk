const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      // references User model's object ID
    },
    product: {
      type: String,
      required: [true, "PLease select product"],
      enum: ["Mac", "iPad", "iPhone", "Watch"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
