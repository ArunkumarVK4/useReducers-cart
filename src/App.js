import "./styles.css";
import React, { createContext, useContext, useReducer, useState } from "react";

const prodCtx = createContext(null);
const initialState = { product: 0, cart: 0, price: 5000, totalCost: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add-cart":
      return {
        ...state,
        cart: state.cart + 1,
        totalCost: state.totalCost + state.price
      };
    case "remove-cart":
      return { ...state, cart: state.cart - 1 };
    case "buy-now":
      return {
        ...state,
        product: state.product - state.cart,
        cart: 0,
        totalCost: 0
      };
    case "restore":
      return { ...state, product: 25 };
    case "set-price":
      return { ...state, price: +action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [product, setProduct] = useState(0);
  // const [cart, setCart] = useState(0);
  return (
    <div className="App">
      <prodCtx.Provider
        value={{
          state,
          dispatch
        }}
      >
        <ShopComp />
      </prodCtx.Provider>
      <br />
    </div>
  );
}

function ShopComp() {
  return (
    <div>
      <Admin />
      <br />
      <div className="user-inferface">
        <Product />
        <Cart />
      </div>
      <br />
      <CostOfPurchase />
    </div>
  );
}

function Admin() {
  const { dispatch } = useContext(prodCtx);
  const [priceValue, setPriceValue] = useState(0);
  return (
    <div>
      <h1>Admin</h1>
      <input
        type="number"
        placeholder="Enter Product Price"
        value={priceValue}
        onChange={(e) => setPriceValue(e.target.value)}
      />
      <button
        onClick={() => dispatch({ type: "set-price", payload: priceValue })}
      >
        Price
      </button>
      <button onClick={() => dispatch({ type: "restore" })}>
        Restore product
      </button>
    </div>
  );
}

function Product() {
  const { state, dispatch } = useContext(prodCtx);
  return (
    <div className="prod-info">
      <h5>PRODUCT</h5>
      <img
        src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw90e0e870/Category-Landing/Category-Mobile/Mens-New/Mobile_Men_Casual_Sneakers.jpg?sw=780"
        alt="product-name"
      />
      <h3>Sketchers</h3>
      <p>Left : {state.product}</p>
      <p>Price : {state.price}</p>
      <button onClick={() => dispatch({ type: "add-cart" })}>
        Add to cart
      </button>
    </div>
  );
}

function Cart() {
  const { state, dispatch } = useContext(prodCtx);
  return (
    <div className="prod-info">
      <h5>CART</h5>
      <img
        src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw90e0e870/Category-Landing/Category-Mobile/Mens-New/Mobile_Men_Casual_Sneakers.jpg?sw=780"
        alt="product-name"
      />
      <h3>Sketchers</h3>
      <p>
        No of Items : {state.cart}{" "}
        <button onClick={() => dispatch({ type: "add-cart" })}>+</button>
        <button onClick={() => dispatch({ type: "remove-cart" })}>-</button>
      </p>
      <button onClick={() => dispatch({ type: "buy-now" })}>Buy now</button>
    </div>
  );
}

function CostOfPurchase() {
  const { state } = useContext(prodCtx);
  return <div className="prod-info">Total cost {state.totalCost}</div>;
}
