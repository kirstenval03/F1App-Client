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

    </div>
  )
}

export default HomePage