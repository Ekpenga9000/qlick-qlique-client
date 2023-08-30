import React from "react";
import "./SideBar.scss";
import { ImCompass } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";

function SideBar() {
  return (
    <article className="sidebar">
      <div className="sidebar__explore-container">
        <h3 className="sidebar__explore">Explore</h3>
        <ImCompass />
      </div>

      <div className="sidebar__zone-div">
        <div className="sidebar__zone-container">
          <h3>Your Zones</h3>
          <AiOutlinePlus />
        </div>
        <ul>
          <li>My Zone</li>
          <li>A day in my life</li>
        </ul>
        <h3>Your Network</h3>
        <ul>
          <li>Sarah</li>
          <li>Jude</li>
          <li>John</li>
          <li>Martin</li>
          <li>Rachael</li>
        </ul>
      </div>
      <div>
        <h3>Your Favourites</h3>
        <ul>
          <li>Comedy</li>
          <li>Horror</li>
          <li>Jenny's Zone</li>
          <li>Rick2000 Zone</li>
          <li>Fortnite Zone</li>
        </ul>

        <p>Explore</p>
      </div>
    </article>
  );
}

export default SideBar;
