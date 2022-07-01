import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from "./StateProvider";
import { cardClasses } from '@mui/material';
import { getBasketTotal } from "./reducer"
import { Link,useNavigate } from "react-router-dom";
import {db} from "./firebase"
function Subtotal() {
  const navigate = useNavigate();
  const [{ basket,user }, dispatch] = useStateValue();
  // let total = 0;
  // for (let i = 0; i < basket.length; i++)
  // {
  //   total += basket[i].price;
  // }
  console.log("HELloo tririro");
  const handleSubmit = () => {
    // dispatch the item into the data layer
    //console.log("rajat");
    let a=0,b=0,c=0,d=0;
    console.log("HELloo tririro");
    basket.forEach((element, index) => {
        if(element.category=="books")
        a++
        else if(element.category=="Jewellery")
        b++
        else if(element.category=="Electronics")
        c++
        else if(element.category=="Footwear")
        d++
        
    });
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
    var docRef=db.collection('users').doc(user?.uid).collection('CategoryQuantity').doc(user?.uid);
    docRef.get().then((doc) => {
        console.log("ioio")
        if (doc.exists) {
            console.log("uugt")
            // var washingtonRef=db.collection('users').doc(user?.uid).collection('CategoryQuantity').doc(user?.uid);
            let categories=doc.data().categories;
            console.log(categories)
            categories.forEach((element, index) => {
                if(element.category=="books")
                element.cnt+=a;
                else if(element.category=="Jewellery")
                element.cnt+=b;
                else if(element.category=="Electronics")
                element.cnt+=c;
                else if(element.category=="Footwear")
                element.cnt+=d;
            });

            db
            .collection('users')
            .doc(user?.uid)
            .collection('CategoryQuantity')
            .doc(user?.uid)
            .set({categories:categories})
            
        } else {
            
            const CatQuantity= [
                {
                    category:"books",
                    cnt:a
                },{
                    category:"Jewellery",
                    cnt:b
                },{
                    category:"Electronics",
                    cnt:c
                },{
                    category:"Footwear",
                    cnt:d
                }]

            db
            .collection('users')
            .doc(user?.uid)
            .collection('CategoryQuantity')
            .doc(user?.uid)
            .set({CatQuantity:CatQuantity})



        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  };
  return (
      <div className='subtotal'>
          <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            
          </>
        )}
        

        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
          />
          <button onClick= {handleSubmit}>click if you like these Products</button>
          <button onClick= {e=>navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal