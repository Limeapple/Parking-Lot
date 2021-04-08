import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const Sidebar = ({ getButtonOption, getParkingOption, save, getMessage, userInfo }) => {
  const SAVE_PARKING_LOT = gql`
    mutation saveParkingLot($id: [Int]!, $ownerID: [String]!, $ParkingSpaceID: [Int]!) {
      saveParkingLot(id: $id, ownerID: $ownerID, ParkingSpaceID: $ParkingSpaceID) {
        id
        ownerID
        ParkingSpaceID
      }
    }
  `;

  const [saveParkingLot] = useMutation(SAVE_PARKING_LOT, {
    onError(err) {
      console.log(err);
    },
  });

  const [parkingClick, setParkingClick] = useState([false, false, false, false]);

  const parkingSpaceOption = (e) => {
    if (parkingClick[e.target.id - 1]) {
      setParkingClick((parkingClick[e.target.id - 1] = false));
      return getParkingOption(null);
    }
    let arr = [false, false, false, false];
    arr[e.target.id - 1] = true;
    setParkingClick(arr);
    return getParkingOption(e.target.id);
  };

  const clearParkingLotButton = (e) => {
    getMessage("Parking lot cleared");
    return getButtonOption(e.target.id);
  };

  const saveParkingLotButton = (e) => {
    let arr = [],
      arr2 = [],
      arr3 = [];
    for (let i = 0; i < 1000; i++) {
      arr[i] = save[i].id;
      arr2[i] = save[i].ownerID;
      arr3[i] = save[i].parkingID;
    }
    console.log(save);
    console.log(arr3);
    saveParkingLot({
      variables: {
        id: arr,
        ownerID: arr2,
        ParkingSpaceID: arr3,
      },
    });
    getMessage("Parking lot saved");
  };

  return (
    <div style={container}>
      <div>Welcome {userInfo.firstName}</div>
      <div
        id='1'
        style={{
          ...topDownParking,
          borderTopColor: "transparent",
          background: parkingClick[0] ? "hsla(12, 55%, 55%, 1)" : null,
        }}
        onClick={parkingSpaceOption}></div>
      <div
        id='2'
        style={{
          ...topDownParking,
          borderBottomColor: "transparent",
          background: parkingClick[1] ? "hsla(12, 55%, 55%, 1)" : null,
        }}
        onClick={parkingSpaceOption}></div>
      <div
        id='3'
        style={{
          ...leftRightParking,
          borderRightColor: "transparent",
          background: parkingClick[2] ? "hsla(12, 55%, 55%, 1)" : null,
        }}
        onClick={parkingSpaceOption}></div>
      <div
        id='4'
        style={{
          ...leftRightParking,
          borderLeftColor: "transparent",
          background: parkingClick[3] ? "hsla(12, 55%, 55%, 1)" : null,
        }}
        onClick={parkingSpaceOption}></div>
      <button id='1' style={deleteButton} onClick={clearParkingLotButton}>
        Clear Parking Lot
      </button>
      <button id='2' style={saveButton} onClick={saveParkingLotButton}>
        Save Parking lot
      </button>
    </div>
  );
};

const container = {
  background: "hsla(0, 0%, 14%, 1)",
  width: "25%",
  height: "100%",
  color: "white",
  padding: 20,
  textAlign: "center",
};

const topDownParking = {
  width: 40,
  height: 60,
  border: "5px solid black",
  margin: "auto",
  marginBottom: 20,
  cursor: "pointer",
};

const leftRightParking = {
  width: 60,
  height: 40,
  border: "5px solid black",
  margin: "auto",
  marginBottom: 20,
  cursor: "pointer",
};

const deleteButton = {
  background: "hsla(0, 60%, 35%, 1)",
  color: "hsla(0, 70%, 90%, 1)",
  padding: 5,
  margin: 10,
  borderRadius: 5,
  cursor: "pointer",
  border: "none",
  width: "80%",
};

const saveButton = {
  background: "hsla(120, 60%, 35%, 1)",
  color: "hsla(120, 70%, 90%, 1)",
  padding: 5,
  margin: 10,
  borderRadius: 5,
  cursor: "pointer",
  border: "none",
  width: "80%",
};
export default Sidebar;
