import React from 'react'
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div>
      <h1>
      <Link to="/current-season">Current Season</Link>
      </h1>
      <p>
        Click to see the schedule of 2023 Season!
      </p>

      <h1>
      <Link to="/teams">2023 Teams</Link>
      </h1>
      <p>
        Click to see the information about 2023 teams!
      </p>

      <h1>
      <Link to="/drivers">2023 Drivers</Link>
      </h1>
      <p>
        Click to see the information about 2023 drivers!
      </p>







    </div>
  )
}

export default HomePage