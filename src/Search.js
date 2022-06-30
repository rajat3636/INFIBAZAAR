import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"

function Search({ details }) {

  const [searchField, setSearchField] = useState("");

  const filteredPersons = details.filter(
    person => {
      return (
        person
        .title
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      
        <SearchList filteredPersons={filteredPersons} />
      
    );
  }

  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search Products</h2>
      </div>
      <div className="header__search">
        <input className="header__searchInput" type="text"
          placeholder = "Search Products" 
          onChange = {handleChange} />
        <SearchIcon className="header__searchIcon" />
      </div>
      {/* <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Products" 
          onChange = {handleChange}
        />
      </div> */}
      {searchList(filteredPersons)}
    </section>
  );
}

export default Search;