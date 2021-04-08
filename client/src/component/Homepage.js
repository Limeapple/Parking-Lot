import SidebarAdmin from "./SidebarAdmin";
import ParkingLot from "./ParkingLot";
import { useState } from "react";
import SidebarStudent from "./SidebarStudent";

const Homepage = ({ userInfo }) => {
  if (!userInfo) window.location.href = "/";

  const [parkingMap, setparkingMap] = useState([]);
  const [parkingOption, setParkingOption] = useState(0);
  const [clear, setClear] = useState(0);
  const [isAdmin, setIsAdmin] = useState(userInfo.id === "fdsafdsf@gmail.com");
  const [bannerMessage, setBannerMessage] = useState("");
  const [parkingSpaceInfo, setParkingSpaceInfo] = useState(null);
  const [parkingType, setParkingType] = useState(null);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState({
    id: "",
    owner: "",
    selected: [],
    parkingTotals: 0,
  });
  const [displayReserveButton, setDisplayReserveButton] = useState(null);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);

  const saveParkingLot = (parkingLot) => {
    setparkingMap(parkingLot);
  };

  return (
    <div className='overflow-hidden'>
      <div style={container}>
        {isAdmin ? (
          <SidebarAdmin
            getParkingOption={(e) => {
              setParkingOption(e);
            }}
            getButtonOption={(e) => {
              setClear(Number(e) + clear);
            }}
            save={parkingMap}
            getMessage={(message) => {
              setBannerMessage(message);
              setTimeout(function () {
                setBannerMessage("");
              }, 2000);
            }}
            userInfo={userInfo}
          />
        ) : (
          <SidebarStudent
            displayReserveButton={displayReserveButton}
            selectedParkingSpot={selectedParkingSpot}
            parkingSpaceInfo={parkingSpaceInfo}
            parkingType={parkingType}
            userInfo={userInfo}
            parkingMap={parkingMap}
            saveParkingLot={saveParkingLot}
            setBannerMessage={setBannerMessage}
            getMessage={(message) => {
              setBannerMessage(message);
              setTimeout(function () {
                setBannerMessage("");
              }, 2000);
            }}
            data={data}
            setUpdate={setUpdate}
            setSelectedParkingSpot={setSelectedParkingSpot}
          />
        )}
        <ParkingLot
          parkingLotMap={parkingMap}
          setDisplayReserveButton={setDisplayReserveButton}
          selectedParkingSpot={selectedParkingSpot}
          setSelectedParkingSpot={setSelectedParkingSpot}
          parkingOption={parkingOption}
          clear={clear}
          saveParkingLot={saveParkingLot}
          bannerMessage={bannerMessage}
          isAdmin={isAdmin}
          getParkingSpaceInfo={(e) => {
            setParkingSpaceInfo(e);
          }}
          setParkingType={(e) => {
            setParkingType(e);
          }}
          setData={setData}
          setUpdate={setUpdate}
          update={update}
        />
      </div>
    </div>
  );
};

const container = {
  display: "flex",
  width: "100%",
  height: "100vh",
};

export default Homepage;
