const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Création du modèle: Please add a name"] },
    email: {
      type: String,
      required: [true, "Création du modèle: Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Création du modèle: Please add an password"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
