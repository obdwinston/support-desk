const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLease enter name"],
    },
    email: {
      type: String,
      required: [true, "PLease enter name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
// MongoDB autoatically derives collection name from plural form of model name
