import React, { Component } from "react";
import "../../../Components/ASSETS/CSS/Dashboard.css";
import Dashboard1 from "../../../Components/JSX/DashboardUser/Infosatu";
// import Dashboard3 from "../../../Components/JSX/DashboardUser/Infotiga";
// import Dashboard4 from "../../../Components/JSX/DashboardUser/Infoempat";

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Dashboard1 />
        {/* <div className="row">
          <div className="col-lg-12 col-xlg-9 mt-2">
            <Dashboard4 />
          </div>
          <div className="col-lg-12 col-xlg-9 mt-2">
            <Dashboard3 />
          </div>
        </div> */}
      </div>
    );
  }
}

export default Dashboard;
