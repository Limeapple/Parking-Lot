const { model, Schema } = require("mongoose");

const parkingLotSchema = new Schema({
  id: [Number],
  ParkingSpaceID: [Number],
  ownerID: [String],
});

module.exports = model("ParkingLot", parkingLotSchema);
