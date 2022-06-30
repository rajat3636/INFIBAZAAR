import React,{useEffect, useState} from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { Link, useNavigate} from "react-router-dom";
import "./Payment.css"
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from "./reducer"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "./axios"
import {db} from "./firebase.js"
function Payment() {
    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements=useElements();

    
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    
    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${parseInt(getBasketTotal(basket) * 100)}`
            });
            //http://localhost:5001/challenge-3593b/us-central1/api
            //console.log(response.data);
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
    console.log('The Secret is >>>',clientSecret)
    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card:elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created:paymentIntent.created
                })
        setSucceeded(true);
        setError(null);
        setProcessing(false);

            dispatch({
                 type:'EMPTY_BASKET'
             })
            navigate('/orders');
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");

        // const payload=await stripe
    }

   
  return (
      <div className='payment'>
          <div className='payment__container'>

              <h1>Checkout {<Link to="/checkout">({basket?.length} items)</Link>}</h1>
              <div className='payment__section'>
                  <div className='payment__title'>
                      <h1>Delivery Address</h1>
                  </div>
                  <div className='payment__address'>
                      <p>{user?.email}</p>
                      <p>123 React Lane</p>
                      <p>Los Angeles,CA</p>

                  </div>
           </div>
          </div>

          <div className='payment__section'>
              <div className='payment__title'>
                  <h3>Review items and delivery</h3>
              </div>
              <div className='payment__items'>
                  {basket.map(item => (
                      <CheckoutProduct
                          id={item.id}
                          title={item.title}
                          image={item.image}
                          price={item.price}
                          rating={item.rating}
                      />
                  ))}
              </div>
          </div>

          <div className='payment__section'>
              <div className='payment__title'>
                  <h1>Payment Method</h1>
              </div>
              <div className="payment__details">
                  <form onSubmit={handleSubmit}>
                      <CardElement onChange={handleChange} />
                      <div className='payment__priceContainer'>
                      <CurrencyFormat
        renderText={(value) => (
            <h3>Order Total:{value}</h3>
        )}
        
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
                          />
                          
                          <button disabled={processing || disabled || succeeded}><span>{processing?<p>Processing</p>:"Buy Now"}</span></button>
                      </div>

                      {error && <div>{error}</div>}
            </form>
              </div>
          </div>
    </div>
  )
}

export default Payment