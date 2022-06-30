import React from 'react';
import Product from './Product';

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <Product id={person.id} title={person.title} price={person.price} rating={person.rating} image={person.image} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;