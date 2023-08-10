import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DriverDetailsPage() {
  const [driverInfo, setDriverInfo] = useState({});
  const { driverId } = useParams();

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(
          `https://ergast.com/api/f1/drivers/${driverId}.json`
          
        );
        console.log("Driver API Response:", response.data);
        const driver = response.data.MRData.DriverTable.Drivers[0];
        setDriverInfo(driver);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, [driverId]);

  const driverImageMap = {
    norris: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691621921/Drivers/landoNorris.jpg",
    albon: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624742/Drivers/albon.jpg",
    alonso: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691622731/Drivers/alonso.jpg",
    bottas: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/bottas2.jpg",
    gasly: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/gasly.jpg",
    hamilton: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/hamilton.jpg",
    hulkenberg: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/hulkenberg.jpg",
    leclerc: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/leclerc.jpg",
    kevin_magnussen: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/magnussen.jpg",
    ocon: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/ocon2.jpg",
    perez: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624736/Drivers/checo.jpg",
    piastri: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624738/Drivers/piastri.jpg",
    ricciardo: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624738/Drivers/ricciardo.jpg",
    russell: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/russel2.jpg",
    sainz: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/sainz2.jpg",
    sargeant: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/logan.jpg",
    stroll: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691622627/Drivers/stroll.jpg",
    tsunoda: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/tsunoda.jpg",
    max_verstappen: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/max.jpg",
    zhou: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691624737/Drivers/zhou.jpg",

  };

  const driverImageUrl = driverImageMap[driverId] || "default_image_url";

  return (
    <div>
      <h1>Driver Details</h1>

      <img src={driverImageUrl} alt="Driver" id="" />
      <p>
        <strong>Name:</strong> {`${driverInfo.givenName} ${driverInfo.familyName}`}
      </p>
      <p>
        <strong>Date of Birth:</strong> {driverInfo.dateOfBirth}
      </p>
      <p>
        <strong>Nationality:</strong> {driverInfo.nationality}
      </p>
      <p>
        <strong>Permanent Number:</strong> {driverInfo.permanentNumber}
      </p>
      <p>
        <strong>Wikipedia URL:</strong>{" "}
        <a href={driverInfo.url} target="_blank" rel="noopener noreferrer">
          {driverInfo.url}
        </a>
      </p>
    </div>
  );
}

export default DriverDetailsPage;
