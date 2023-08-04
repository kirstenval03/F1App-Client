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
          `http://ergast.com/api/f1/drivers/${driverId}.json`
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

  return (
    <div>
      <h1>Driver Details</h1>
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
