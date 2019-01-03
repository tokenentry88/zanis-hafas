import React, { Component } from "react";
import "../../../Components/ASSETS/CSS/animasi.css";
import Sukses from "./Sukses";

class AnimasiGagal extends Component {
  render() {
    return (
      <div className="container-fluid gagal">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            class="path circle"
            fill="none"
            stroke="#cc1228"
            stroke-width="6"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <line
            class="path line"
            fill="none"
            stroke="#cc1228"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="34.4"
            y1="37.9"
            x2="95.8"
            y2="92.3"
          />
          <line
            class="path line"
            fill="none"
            stroke="#cc1228"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="95.8"
            y1="38"
            x2="34.4"
            y2="92.2"
          />
        </svg>
        <p style={{ color: "#cc1228" }}>Gagal Menyimpan</p>
        <Sukses />
      </div>
    );
  }
}

export default AnimasiGagal;
