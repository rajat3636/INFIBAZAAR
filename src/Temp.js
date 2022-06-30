import React from "react";
// import "./Home.css";
import Product from "./Product";
import initialDetails from "./InitialDataList";
import Search from "./Search";
function temp() {
    console.log("rat");
  return (
    
    <div className="tc bg-green ma0 pa4 min-vh-100">
    <Search details={initialDetails}/>
  </div>
  );
}

export default temp;