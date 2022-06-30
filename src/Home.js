import React from "react";
import "./Home.css";
import Product from "./Product";
import initialDetails from "./InitialDataList";
import Search from "./Search";
import Scroll from './Scroll';
import SearchList from './SearchList';

function Home() {
  return (
    <Search details={initialDetails}/>
  );
}

export default Home;