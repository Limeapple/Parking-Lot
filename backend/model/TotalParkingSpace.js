const { model, Schema } = require("mongoose");

const totalParkingSpaceSchema = new Schema({
  totalParkingSpace: { type: Number, default: 0 },
});

module.exports = model("TotalParkingSpace", totalParkingSpaceSchema);
