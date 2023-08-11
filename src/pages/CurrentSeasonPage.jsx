import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CurrentSeason() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { circuitId  } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ergast.com/api/f1/current.json"
      );
      setData(response.data.MRData.RaceTable.Races);
      setLoading(false);
      console.log("Fetched Data:", response.data); // Log the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="CurrentSeasonPage"> {/* Add a unique ID */}
    <img id="TPh1" src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691727055/Formula1-App/CStitle.png"></img>
    <ul>
      {data.map((race) => (
        <li key={race.round}>
          <h2>{race.raceName}</h2>
          <p>
            Date: {race.date} - Time: {race.time}
          </p>
          <p>
            Circuit: {race.Circuit.circuitName}, {race.Circuit.Location.locality},{" "}
            {race.Circuit.Location.country}
          </p>
          <p>
            Wikipedia:{" "}
            <a href={race.url} target="_blank" rel="noopener noreferrer">
              {race.raceName}
            </a>
          </p>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default CurrentSeason;
