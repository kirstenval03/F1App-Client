import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TeamsPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { circuitId } = useParams();

    const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://ergast.com/api/f1/2023/constructors.json"
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
    <div>TeamsPage</div>
  )
}

export default TeamsPage