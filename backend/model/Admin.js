const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  password: String,
  token: String,
});

module.exports = model("Admin", adminSchema);
