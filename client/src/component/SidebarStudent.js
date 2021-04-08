import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

const SidebarStudent = ({
  parkingSpaceInfo,
  parkingType,
  userInfo,
  parkingMap,
  selectedParkingSpot,
  displayReserveButton,
  getMessage,
  data,
  saveParkingLot,
  setUpdate,
  setSelectedParkingSpot,
}) => {
  const RESERVE_PARKING_SPOT = gql`
    mutation reserveParkingSpot($reserveSpot: [String]!, $id: String!) {
      reserveParkingSpot(reserveSpot: $reserveSpot, id: $id)
    }
  `;
  const [reserveParkingSpot] = useMutation(RESERVE_PARKING_SPOT, {
    onError(err) {
      console.log(err);
    },
    onCompleted(data) {
      getMessage(data.reserveParkingSpot);
    },
  });

  useEffect(() => {
    console.log(selectedParkingSpot);
  }, [selectedParkingSpot, displayReserveButton]);

  const UNREGISTER_PARKING_SPOT = gql`
    mutation unregisterParkingSpot($reserveSpot: [String]!, $id: String!) {
      unregisterParkingSpot(reserveSpot: $reserveSpot, id: $id)
    }
  `;
  const [unregisterParkingSpot] = useMutation(UNREGISTER_PARKING_SPOT, {
    onError(err) {
      console.log(err);
    },
    onCompleted(data) {
      getMessage(data.unregisterParkingSpot);
    },
  });

  const updateParkingLot = (parkingMap, data) => {
    for (let i = 0; i < 1000; i++) {
      saveParkingLot((parkingMap[i].ownerID = data.ParkingLotInfo.ownerID[i]));
    }
    setUpdate(true);
    setSelectedParkingSpot({ id: "", owner: "", selected: [], parkingTotals: 0 });
  };

  console.log("fdsa", userInfo);

  return (
    <div style={container}>
      <div>Welcome {userInfo.firstName}, Choose a Parking Lot:</div>
      {selectedParkingSpot.selected.length != 0 ? (
        <div>
          <div style={parkingSpace}>
            <div
              style={
                selectedParkingSpot.parkingTotals === 21
                  ? parkingBottom
                  : selectedParkingSpot.parkingTotals === 57
                  ? parkingTop
                  : selectedParkingSpot.parkingTotals === 93
                  ? parkingRight
                  : selectedParkingSpot.parkingTotals === 129
                  ? parkingLeft
                  : null
              }
            />
          </div>
          <div>Parking Space ID: {selectedParkingSpot.id}</div>
          <div>Owner ID: {selectedParkingSpot.owner}</div>
        </div>
      ) : (
        <div>
          <div style={parkingSpace}>
            <div
              style={
                parkingType === 21
                  ? parkingBottom
                  : parkingType === 57
                  ? parkingTop
                  : parkingType === 93
                  ? parkingRight
                  : parkingType === 129
                  ? parkingLeft
                  : null
              }
            />
          </div>
          <div>
            Parking Space ID:{" "}
            {parkingSpaceInfo && parkingSpaceInfo.parkingID !== 0
              ? parkingSpaceInfo.parkingID
              : null}
          </div>
          <div>
            Owner ID:{" "}
            {parkingSpaceInfo &&
            parkingSpaceInfo.ownerID !== "0" &&
            parkingSpaceInfo.parkingID !== 0
              ? parkingSpaceInfo.ownerID
              : null}
          </div>
        </div>
      )}
      {displayReserveButton &&
      data.ParkingLotInfo.ownerID[selectedParkingSpot.ownerIndex] === "" ? (
        <button
          id='2'
          style={saveButton}
          onClick={(e) => {
            let tempArr = [];
            for (let i = 0; i < parkingMap.length; i++) tempArr[i] = parkingMap[i].ownerID;
            reserveParkingSpot({ variables: { reserveSpot: tempArr, id: userInfo.id } });
            updateParkingLot(parkingMap, data);
          }}>
          Register Parking Space
        </button>
      ) : selectedParkingSpot.owner === userInfo.id ? (
        <button
          id='2'
          style={deleteButton}
          onClick={(e) => {
            let tempArr = [];
            for (let i = 0; i < parkingMap.length; i++) tempArr[i] = parkingMap[i].ownerID;
            unregisterParkingSpot({ variables: { reserveSpot: tempArr, id: userInfo.id } });
            updateParkingLot(parkingMap, data);
          }}>
          Unregister Parking Space
        </button>
      ) : null}
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

const parkingSpace = {
  height: "45vh",
  background: "hsla(0, 0%, 12%, 1)",
  borderRadius: 20,
  margin: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const parkingTop = {
  height: "60%",
  width: "35%",
  borderTop: "1px solid orange",
  borderRight: "1px solid orange",
  borderBottom: "none",
  borderLeft: "1px solid orange",
};

const parkingBottom = {
  height: "60%",
  width: "35%",
  borderTop: "none",
  borderRight: "1px solid orange",
  borderBottom: "1px solid orange",
  borderLeft: "1px solid orange",
};

const parkingRight = {
  height: "35%",
  width: "75%",
  borderTop: "1px solid orange",
  borderRight: "none",
  borderBottom: "1px solid orange",
  borderLeft: "1px solid orange",
};

const parkingLeft = {
  height: "35%",
  width: "75%",
  borderTop: "1px solid orange",
  borderRight: "1px solid orange",
  borderBottom: "1px solid orange",
  borderLeft: "none",
};

const saveButton = {
  background: "hsla(120, 60%, 35%, 1)",
  color: "hsla(120, 70%, 90%, 1)",
  padding: 5,
  margin: 10,
  borderRadius: 5,
  cursor: "pointer",
};
const deleteButton = {
  background: "red",
  color: "white",
  padding: 5,
  margin: 10,
  borderRadius: 5,
  cursor: "pointer",
};
export default SidebarStudent;
