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




    </div>
  )
}

export default HomePage