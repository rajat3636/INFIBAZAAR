import React, { useEffect, useState } from 'react';
import Product from './Product';
import "./SearchList.css"
import {db} from "./firebase"
import { useStateValue } from "./StateProvider";
import { Fade } from '@mui/material';

// function renderingProducts({filteredPersons})
// {

// }
function SearchList({ filteredPersons }) {
  // const filtered = filteredPersons.map(person =>  <Product id={person.id} title={person.title} price={person.price} rating={person.rating} image={person.image} />);
  // let dataValue=[]
  const [{ basket,user }, dispatch] = useStateValue();
  var docRef=db.collection('users').doc(user?.uid).collection('CategoryQuantity').doc(user?.uid);
  // console.log("op2");
  let categories;
  const [dataValue, setDataValue] = useState([]);
  // const doc =  docRef.get()
  
  // useEffect (()=> {
  //   const getData = async () =>{
  //       console.log(doc)
  //       let chk;
  //       const check = () => chk = doc.exists
  //       check();
  //       console.log (chk)
  //       if (chk) {
  //          categories=doc.data().categories;
  //          categories.sort((a, b) => (a.cnt < b.cnt) ? 1 : -1);
  //          console.log(categories)
  //         categories.forEach((element, index) => {
  //         let str=element.category;
  //         // console.log(str)
  //         filteredPersons.forEach((element2,index2)=>{
  //           if(element2.category==str)
  //           {
  //             // console.log(filteredPersons[index2])
  //             dataValue.push(filteredPersons[index2]);
  //             setDataValue(dataValue);
  //           }
  //         })
            
  //       })
  //       } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //       }
    
  //   }
  //   getData();
  
  // },[basket])
//   docRef.get().then((doc) => {
//     if (doc.exists) {
//        categories=doc.data().categories;
//       console.log(categories)
//       categories.sort((a, b) => (a.cnt < b.cnt) ? 1 : -1);
//       categories.forEach((element, index) => {
//       let str=element.category;
//       // console.log(str)
//       filteredPersons.forEach((element2,index2)=>{
//         if(element2.category==str)
//         {
//           // console.log(filteredPersons[index2])
//           dataValue.push(filteredPersons[index2]);
//           setDataValue(dataValue);
//         }
//       })
        
//     })
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
  //  console.log("op");
  // console.log(dataValue);
  return (
    <div className="horizontal">
        { filteredPersons.map(person =>  <Product id={person.id} title={person.title} price={person.price} rating={person.rating} image={person.image} category={person.category} />)}
    </div>
  );
}

export default SearchList;