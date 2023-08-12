import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CurrentSeason() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { circuitId } = useParams();

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

  const circuitImageMap = {
    bahrain: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789159/Formula1-App/CIRCUITS/image_ep3uyq.png",
    jeddah: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789232/Formula1-App/CIRCUITS/image_1_r3juch.png",
    albert_park: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789266/Formula1-App/CIRCUITS/image_1_flgx9q.avif",
    miami: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789348/Formula1-App/CIRCUITS/image_2_ofzf7v.png",
    catalunya: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789539/Formula1-App/CIRCUITS/image_4_ogwhpy.png",
    villeneuve: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789586/Formula1-App/CIRCUITS/image_3_waoick.avif",
    silverstone: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789677/Formula1-App/CIRCUITS/image_5_mpntlg.avif",
    hungaroring: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790615/Formula1-App/CIRCUITS/image_14_z257te.avif",
    spa: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789743/Formula1-App/CIRCUITS/image_6_amzci1.avif",
    zandvoort: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789827/Formula1-App/CIRCUITS/image_5_g9vvbu.png",
    monza: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789487/Formula1-App/CIRCUITS/image_3_z1jcw9.png",
    marina_bay: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789947/Formula1-App/CIRCUITS/image_9_qvgyvh.avif",
    suzuka: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691789995/Formula1-App/CIRCUITS/image_7_kjjmt0.png",
    losail: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790024/Formula1-App/CIRCUITS/image_8_z6mcar.png",
    americas: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790099/Formula1-App/CIRCUITS/image_9_htuyrk.png",
    rodriguez: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790064/Formula1-App/CIRCUITS/image_10_c0xrzn.avif",
    interlagos: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790133/Formula1-App/CIRCUITS/image_11_dcc700.avif",
    vegas: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790182/Formula1-App/CIRCUITS/image_10_k9giyj.png",
    yas_marina: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790213/Formula1-App/CIRCUITS/image_12_hduc4s.avif",
    baku: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790399/Formula1-App/CIRCUITS/image_11_ckwsf4.png",
    monaco: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790474/Formula1-App/CIRCUITS/image_12_q5uso0.png",
    red_bull_ring: "https://res.cloudinary.com/dhqplbne3/image/upload/v1691790581/Formula1-App/CIRCUITS/image_13_yphbb7.avif",
  };

  return (
    <div id="CurrentSeasonPage">
      <img
        id="TPh1"
        src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691727055/Formula1-App/CStitle.png"
        alt="Current Season Title"
      />
      <ul>
        {data.map((race) => (
          <li key={race.round}>
            <h2>{race.raceName}</h2>
            {circuitImageMap[race.Circuit.circuitId] && (
              <img
                src={circuitImageMap[race.Circuit.circuitId]}
                alt={race.Circuit.circuitName}
              />
            )}
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