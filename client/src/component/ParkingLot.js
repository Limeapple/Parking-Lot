import { useState, useEffect } from "react";
import MouseTooltip from "react-sticky-mouse-tooltip";
import { gql, useQuery, refetch } from "@apollo/client";
import { Alert } from "react-bootstrap";
import "../index.css";
let arr = [];

const ParkingLot = ({
  parkingOption,
  clear,
  saveParkingLot,
  bannerMessage,
  getParkingSpaceInfo,
  setParkingType,
  setDisplayReserveButton,
  setSelectedParkingSpot,
  setData,
  parkingLotMap,
  update,
  setUpdate,
}) => {
  const [parkingMap, setparkingMap] = useState([]);
  const [parkingDisplay, setParkingDisplay] = useState({});
  const [invalidParkingSpace, setInvalidParkingSpace] = useState(false);
  const [parkingTotals, setParkingTotal] = useState(0);
  const GET_PARKING_LOT = gql`
    query ParkingLotInfo {
      ParkingLotInfo {
        id
        ownerID
        ParkingSpaceID
      }
    }
  `;

  const { loading, _, data } = useQuery(GET_PARKING_LOT, {
    onError(err) {
      console.log(err);
    },
    onCompleted() {
      for (let i = 0; i < 1000; i++) {
        arr.push({
          id: data.ParkingLotInfo.id[i],
          ownerID: data.ParkingLotInfo.ownerID[i],
          parkingID: data.ParkingLotInfo.ParkingSpaceID[i],
        });
      }
      saveParkingLot(arr);
      setparkingMap(arr);
    },
    pollInterval: 500,
  });

  useEffect(() => {
    if (update) {
      arr = [];
      for (let i = 0; i < 1000; i++) {
        arr.push({
          id: data.ParkingLotInfo.id[i],
          ownerID: data.ParkingLotInfo.ownerID[i],
          parkingID: data.ParkingLotInfo.ParkingSpaceID[i],
        });
      }
      saveParkingLot(arr);
      setparkingMap(arr);
      setUpdate(false);
    }
  }, [data]);

  useEffect(() => {
    findParkingDisplay();
  }, [parkingOption]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < 1000; i++) {
      arr[i] = { id: 0, ownerID: "", parkingID: 0 };
    }
    setparkingMap(arr);
    saveParkingLot(arr);
  }, [clear]);

  setData(data);

  const findParkingDisplay = () => {
    if (parkingOption === "1") setParkingDisplay(topParking);
    else if (parkingOption === "2") setParkingDisplay(bottomParking);
    else if (parkingOption === "3") setParkingDisplay(leftParking);
    else if (parkingOption === "4") setParkingDisplay(rightParking);
    else setParkingDisplay({});
  };
  const getTile = (e) => {
    let id = Number(e.target.getAttribute("indexkey"));
    let tempArr = parkingMap;
    getParkingSpaceInfo(tempArr[id]);
    let totall = Math.floor(Math.random() * 1000000);
    let parkingTotal = 0,
      totalSpaces = 0;
    for (let i = 0; i < 1000 && totalSpaces != 6; i++) {
      if (tempArr[i].parkingID === tempArr[id].parkingID) {
        parkingTotal += tempArr[i].id;
        totalSpaces++;
      }
    }
    setParkingTotal(parkingTotal);
    setParkingType(parkingTotal);

    if (!parkingDisplay) {
      if (
        (parkingOption === "1" || parkingOption === "2") &&
        (tempArr[id].id !== 0 ||
          tempArr[id + 1].id !== 0 ||
          tempArr[id + 40].id !== 0 ||
          tempArr[id + 41].id !== 0 ||
          tempArr[id + 80].id !== 0 ||
          tempArr[id + 81].id !== 0)
      ) {
        setInvalidParkingSpace(true);
        setTimeout(function () {
          setInvalidParkingSpace(false);
        }, 50);
        return findParkingDisplay();
      } else setInvalidParkingSpace(false);
      if (
        (parkingOption === "3" || parkingOption === "4") &&
        (tempArr[id].id !== 0 ||
          tempArr[id + 1].id !== 0 ||
          tempArr[id + 2].id !== 0 ||
          tempArr[id + 40].id !== 0 ||
          tempArr[id + 41].id !== 0 ||
          tempArr[id + 42].id !== 0)
      ) {
        setInvalidParkingSpace(true);
        setTimeout(function () {
          setInvalidParkingSpace(false);
        }, 50);
        return findParkingDisplay();
      } else setInvalidParkingSpace(false);
      if (parkingOption === "1") {
        tempArr[id].id = 1;
        tempArr[id + 1].id = 2;
        tempArr[id + 40].id = 3;
        tempArr[id + 41].id = 4;
        tempArr[id + 80].id = 5;
        tempArr[id + 81].id = 6;
        tempArr[id].parkingID = totall;
        tempArr[id + 1].parkingID = totall;
        tempArr[id + 40].parkingID = totall;
        tempArr[id + 41].parkingID = totall;
        tempArr[id + 80].parkingID = totall;
        tempArr[id + 81].parkingID = totall;
      }
      if (parkingOption === "2") {
        tempArr[id].id = 7;
        tempArr[id + 1].id = 8;
        tempArr[id + 40].id = 9;
        tempArr[id + 41].id = 10;
        tempArr[id + 80].id = 11;
        tempArr[id + 81].id = 12;
        tempArr[id].parkingID = totall;
        tempArr[id + 1].parkingID = totall;
        tempArr[id + 40].parkingID = totall;
        tempArr[id + 41].parkingID = totall;
        tempArr[id + 80].parkingID = totall;
        tempArr[id + 81].parkingID = totall;
      }
      if (parkingOption === "3") {
        tempArr[id].id = 13;
        tempArr[id + 1].id = 14;
        tempArr[id + 2].id = 15;
        tempArr[id + 40].id = 16;
        tempArr[id + 41].id = 17;
        tempArr[id + 42].id = 18;
        tempArr[id].parkingID = totall;
        tempArr[id + 1].parkingID = totall;
        tempArr[id + 2].parkingID = totall;
        tempArr[id + 40].parkingID = totall;
        tempArr[id + 41].parkingID = totall;
        tempArr[id + 42].parkingID = totall;
      }
      if (parkingOption === "4") {
        tempArr[id].id = 19;
        tempArr[id + 1].id = 20;
        tempArr[id + 2].id = 21;
        tempArr[id + 40].id = 22;
        tempArr[id + 41].id = 23;
        tempArr[id + 42].id = 24;
        tempArr[id].parkingID = totall;
        tempArr[id + 1].parkingID = totall;
        tempArr[id + 2].parkingID = totall;
        tempArr[id + 40].parkingID = totall;
        tempArr[id + 41].parkingID = totall;
        tempArr[id + 42].parkingID = totall;
      }
      setparkingMap(tempArr);
      saveParkingLot(tempArr);
    }
    findParkingDisplay();
  };

  const reserveSpot = (id, index) => {
    let tempArr = parkingMap;
    let selected = [];
    let owner = "";
    let ownerIndex = index;
    let dataOwnerID = data.ParkingLotInfo.ownerID;
    setDisplayReserveButton(null);

    for (let i = 0; i < 1000; i++) {
      if (data.ParkingLotInfo.ParkingSpaceID[i] == id) owner = data.ParkingLotInfo.ownerID[i];

      if (
        data.ParkingLotInfo.ParkingSpaceID[i] == id &&
        tempArr[i].id != 0 &&
        tempArr[i].ownerID == ""
      ) {
        tempArr[i].ownerID = "reserve";
        selected.push(i);
        owner = tempArr[i].ownerID;
      } else if (tempArr[i].ownerID == "reserve") tempArr[i].ownerID = "";
      else if (tempArr[i].ownerID == owner && owner.length > 0) {
        selected.push(i);
      }
    }
    if (tempArr[index].ownerID === "") setDisplayReserveButton(null);
    else
      setDisplayReserveButton(
        tempArr[index].ownerID === "reserve" && data.ParkingLotInfo.ownerID[index] === ""
      );

    setSelectedParkingSpot({ id, owner, selected, parkingTotals, ownerIndex, dataOwnerID });
    setparkingMap(tempArr);
    saveParkingLot(tempArr);
  };

  if (data == undefined) return <h2>loadding</h2>;
  console.log(data.ParkingLotInfo);
  return (
    <>
      <div>
        {bannerMessage === "Parking lot cleared" ||
        bannerMessage === "Registration failed, you've already reserved a parking space" ? (
          <Alert variant='info'>{bannerMessage}</Alert>
        ) : bannerMessage === "Parking lot saved" ||
          bannerMessage === "Parking space reserved" ||
          bannerMessage === "Parking space unregistered" ? (
          <Alert variant='success'>{bannerMessage}</Alert>
        ) : null}
      </div>
      <div
        style={container}
        onMouseLeave={() => {
          setParkingDisplay({});
        }}
        onMouseEnter={() => {
          findParkingDisplay();
        }}>
        <MouseTooltip offsetX={-10} offsetY={-10}>
          <div
            style={
              invalidParkingSpace
                ? { ...parkingDisplay, background: "hsla(0, 100%, 60%, 1)" }
                : parkingDisplay
            }
            onClick={(e) => {
              setParkingDisplay(null);
            }}></div>
        </MouseTooltip>
        {parkingMap.map((box, i) => {
          return (
            <div
              onClick={() => reserveSpot(box.parkingID, i)}
              indexkey={i}
              key={i}
              style={{
                background:
                  box.ownerID === "reserve" && data.ParkingLotInfo.ownerID[i] === ""
                    ? "green"
                    : data.ParkingLotInfo.ownerID[i] != ""
                    ? "red"
                    : "",
                ...(box.id === 0
                  ? square
                  : box.id === 14 || box.id === 15 || box.id === 19 || box.id === 20
                  ? squareTop
                  : box.id === 4 || box.id === 10 || box.id === 12 || box.id === 2
                  ? squareRight
                  : box.id === 17 || box.id === 18 || box.id === 22 || box.id === 23
                  ? squareBottom
                  : box.id === 3 || box.id === 9 || box.id === 11 || box.id === 1
                  ? squareLeft
                  : box.id === 8 || box.id === 21
                  ? squareTopRight
                  : box.id === 24 || box.id === 6
                  ? squareBottomRight
                  : box.id === 16 || box.id === 5
                  ? squareBottomLeft
                  : box.id === 7 || box.id === 13
                  ? squareTopLeft
                  : null),
              }}
              onMouseOver={getTile}>
              <div style={box.id === 0 ? innerCircle : null}></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const container = {
  background: "hsla(0, 0%, 18%, 1)",
  width: "75%",
  height: "100vh",
  color: "white",
  display: "grid",
  gridTemplateColumns: "repeat(40, 30px)",
  gridAutoRows: "30px",
};

const square = {
  height: 30,
};

const innerCircle = {
  width: "8%",
  height: "8%",
  background: "hsla(0, 0%, 0%, .45)",
};

const leftParking = {
  width: 90,
  height: 60,
  background: "hsla(0, 0%, 0%, .4)",
  border: "3px solid  hsla(12, 55%, 55%, 1)",
  borderRightColor: "transparent",
};

const rightParking = {
  width: 90,
  height: 60,
  background: "hsla(0, 0%, 0%, .4)",
  border: "3px solid  hsla(12, 55%, 55%, 1)",
  borderLeftColor: "transparent",
};

const topParking = {
  width: 60,
  height: 90,
  background: "hsla(0, 0%, 0%, .4)",
  border: "3px solid  hsla(12, 55%, 55%, 1)",
  borderTopColor: "transparent",
};

const bottomParking = {
  width: 60,
  height: 90,
  background: "hsla(0, 0%, 0%, .4)",
  border: "3px solid  hsla(12, 55%, 55%, 1)",
  borderBottomColor: "transparent",
};

const squareTop = {
  border: "1px solid transparent",
  borderTopColor: "orange",
  cursor: "pointer",
};

const squareRight = {
  border: "1px solid transparent",
  borderRightColor: "orange",
  cursor: "pointer",
};

const squareBottom = {
  border: "1px solid transparent",
  borderBottomColor: "orange",
  cursor: "pointer",
};

const squareLeft = {
  border: "1px solid transparent",
  borderLeftColor: "orange",
  cursor: "pointer",
};
const squareTopLeft = {
  border: "1px solid transparent",
  borderTopColor: "orange",
  borderLeftColor: "orange",
  cursor: "pointer",
};
const squareTopRight = {
  border: "1px solid transparent",
  borderTopColor: "orange",
  borderRightColor: "orange",
  cursor: "pointer",
};
const squareBottomLeft = {
  border: "1px solid transparent",
  borderBottomColor: "orange",
  borderLeftColor: "orange",
  cursor: "pointer",
};
const squareBottomRight = {
  border: "1px solid transparent",
  borderBottomColor: "orange",
  borderRightColor: "orange",
  cursor: "pointer",
};
export default ParkingLot;
