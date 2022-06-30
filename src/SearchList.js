import React from 'react';
import Product from './Product';
import "./SearchList.css"
// function renderingProducts({filteredPersons})
// {

// }
function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <Product id={person.id} title={person.title} price={person.price} rating={person.rating} image={person.image} />); 
  return (
    <div className="horizontal">
        { filteredPersons.map(person =>  <Product id={person.id} title={person.title} price={person.price} rating={person.rating} image={person.image} />)}
    </div>
  );
}

export default SearchList;