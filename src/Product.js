import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, rating,image,category }) {
  const [{ basket }, dispatch] = useStateValue();
  
  console.log("this is the basket >>>", basket);
  const addToBasket = () => {
    // dispatch the item into the data layer
    //console.log("rajat");
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        image: image,
        category:category
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button className="product__add" onClick={addToBasket}>Add to Basket</button>
      {/* onClick={handleClick} */}
      {/* <input
        className="product__add"
        type="button"
        value="Focus the text input"
        onClick={addToBasket}
      /> */}
    </div>
  );
}

export default Product;