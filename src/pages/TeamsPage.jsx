import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function TeamsPage() {
  const [constructors, setConstructors] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { teamId } = useParams();

  const fetchConstructorsData = async () => {
    try {
      const response = await axios.get(
        "https://ergast.com/api/f1/2023/constructors.json"
      );
      console.log("Constructors API Response:", response.data);
      setConstructors(response.data.MRData.ConstructorTable.Constructors);
    } catch (error) {
      console.error("Error fetching constructors data:", error);
    }
  };

  const fetchDriversData = async () => {
    try {
      const response = await axios.get(
        "https://ergast.com/api/f1/2023/drivers.json"
      );
      console.log("Drivers API Response:", response.data);
      setDrivers(response.data.MRData.DriverTable.Drivers);
    } catch (error) {
      console.error("Error fetching drivers data:", error);
    }
  };

  useEffect(() => {
    fetchDriversData().then(() => {
      fetchConstructorsData().then(() => {
        setLoading(false);
      });
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const mapDriversToTeams = () => {
    const driverToTeamMapping = {
      "williams": ["albon", "sargeant"],
      "aston_martin": ["alonso", "stroll"],
      "alfa": ["bottas", "zhou"],
      "alpine": ["gasly", "ocon"],
      "mercedes": ["hamilton", "russell"],
      "haas": ["hulkenberg", "kevin_magnussen"],
      "ferrari": ["leclerc", "sainz"],
      "mclaren": ["norris", "piastri"],
      "red_bull": ["perez", "max_verstappen"],
      "alphatauri": ["ricciardo", "tsunoda"],
    };

    const teamsWithDrivers = constructors.map((constructor) => {
      const teamId = constructor.constructorId;
      const driverIdsForTeam = driverToTeamMapping[teamId] || [];
      const driversForTeam = drivers.filter((driver) =>
        driverIdsForTeam.includes(driver.driverId)
      );

      const driversMapped = driversForTeam.map((driver) => {
        return {
          ...driver,
          team: constructor.name,
        };
      });

      return {
        ...constructor,
        drivers: driversMapped,
      };
    });

    console.log("Teams With Drivers:", teamsWithDrivers);
    return teamsWithDrivers;
  };

  const teamsWithDrivers = mapDriversToTeams();

  return (
    <div>
      <h1>2023 Teams</h1>
      <ul>
        {teamsWithDrivers.map((team) => (
          <li key={team.constructorId}>
            <h2>{team.name}</h2>
            <p>Nationality: {team.nationality}</p>
            <p>Drivers:</p>
            <ul>
              {team.drivers.map((driver) => (
                <li key={driver.driverId}>
                  {/* Use Link to create a link to the driver details page */}
                  <Link to={`/driver-details/${driver.driverId}`}>
                    <strong>{`${driver.givenName} ${driver.familyName}`}</strong>
                  </Link>{" "}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsPage;