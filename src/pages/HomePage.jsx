import React from 'react'
import { Link } from "react-router-dom";


function HomePage() {
  return (
<div className='HomePage'>
  <div id='HPbanner1'>
    <h1>
      <Link to="/items">Merch Store</Link>
    </h1>
    <p>
      ⇡ Click here to purchase your favorite items ⇡
    </p>
    <img src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691765671/Formula1-App/merchPrev.png" alt="" />
  </div>

  <div id='secundaryBanners'>
    <div id='HPbanner2'>
      <h1>
        <Link to="/current-season">Current Season</Link>
      </h1>
      <p>
        ⇡ Click to see the schedule of 2023 Season ⇡
      </p>
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnR0c2pkenVjNXRrNDU4NGY1c2ttb2ZyMDZrb29sc2JuazN0c3NycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ek3sWTN9UAadldn6tr/giphy-downsized-large.gif" alt="" />
    </div>

    <div id='HPbanner3'>
      <h1>
        <Link to="/teams">2023 Teams</Link>
      </h1>
      <p>
        ⇡ Click to see the information about 2023 teams ⇡
      </p>
      <img src="https://s40320.pcdn.co/wp-content/uploads/2022/03/ezgif.com-gif-maker-2.gif" alt="" />
    </div>
  </div>
</div>


  )
}

export default HomePage
