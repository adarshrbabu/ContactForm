const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: [true, "please add the name "],
    },
    email: {
      type: String,
      required: [true, "please add the email "],
    },
    phone: {
      type: String,
      required: [true, "please add the phone "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);
