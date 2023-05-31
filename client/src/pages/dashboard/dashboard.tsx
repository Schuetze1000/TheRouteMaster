import React from "react";
import Navbar from "../../components/navbars/Navbar";
import Map from "../../components/map/map";

function Dashboard() {

    return (
        <div>
            <Navbar />
            <div className="relative flex w-20 h-20">
                <Map />
            </div>
        </div>
    );
}

export default Dashboard;