import React,{useEffect} from "react"
import './App.css';
import Header from "./Header.js";
import Home from "./Home.js"
import Checkout from "./Checkout.js";
import Login from "./Login.js"
import { BrowserRouter as Router, Routes, Route }
  from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment.js";
import Orders from "./Orders.js";
import { loadStripe } from "@stripe/stripe-js"
import { Elements} from "@stripe/react-stripe-js"
import Temp from "./Temp";
// import Product from "./Product.js";
//pk_test_51Ks5J4SCNecEda9QSoWAIPJzqS6czSAPzKbzHr1pX3QkerTv6RSAtEswMjFRNtGNWa7KwGnAioZPqcCxdgZCfsEc00dYG6VV6W
//pk_test_51Ks5J4SCNecEda9QSoWAIPJzqS6czSAPzKbzHr1pX3QkerTv6RSAtEswMjFRNtGNWa7KwGnAioZPqcCxdgZCfsEc00dYG6VV6W
const promise = loadStripe('pk_test_51Ks5J4SCNecEda9QSoWAIPJzqS6czSAPzKbzHr1pX3QkerTv6RSAtEswMjFRNtGNWa7KwGnAioZPqcCxdgZCfsEc00dYG6VV6W');
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(
    () => {
      
      auth.onAuthStateChanged(authUser => {
        console.log("THE USER IS ", authUser);
        if (authUser)
        {

          dispatch({
            type: 'SET_USER',
            user:authUser
          })
        }
        else
        {
          dispatch({
            type: 'SET_USER',
            user:null 
          })
        }
      })
    },[  ]
  )
  return (
    //BEM Convention
    <Router>
      <div className="app">
      
        <Routes>
          {/* <Route path="/checkout">
            <Header/>
          <p>I am a checkout page</p>
          </Route> */}
          <Route path="/orders" element={[<Header/>,<Orders/>]} />
          <Route path="/temp" element={[<Temp />]} />
          <Route path="/login" element={[<Login/>]} />
          <Route path="/checkout" element={[
            <Header />,
            <Checkout />]} />
          
          <Route path="/payment" element={[
            <Header />,
            <Elements stripe={promise}>
            <Payment />
            </Elements>
           ]} />
          <Route path="/" element={[
            <Header />,
            <Home />]} />
          
          {/* <Route path="/">
          <Header />
          <Home />
          </Route> */}
        </Routes>
      
      </div>
      </Router>
  );
}

export default App;
