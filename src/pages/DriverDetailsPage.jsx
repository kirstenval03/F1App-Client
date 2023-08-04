import React from "react";
import { useParams } from "react-router-dom";

function DriverDetailsPage({ drivers }) {
  const { driverId } = useParams();
  const driver = drivers.find((driver) => driver.driverId === driverId);

  if (!driver) {
    return <div>Driver not found</div>;
  }

  return (
    <div>
      <h2>{`${driver.givenName} ${driver.familyName}`}</h2>
      <p>Team: {driver.team}</p>
      {/* Add other driver-specific information here */}
    </div>
  );
}

export default DriverDetailsPage;
