import { resturantcatalog } from "../assets/data/dessertData";
import Card from "../components/Card";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import { useReducer } from "react";

const initialCartDetails = {
  itemNumber: 0,
  cartItems: [],
  itemTotalAmount: 0
}

function cartDetailsFunction(state,action){
  switch(action.type){
    case "state":
      return state;
    case "addItem":
      console.log(action.item, state.cartItems)
      // state.cartItems.push(action.item)
      // console.log(state.cartItems)
      return state

    default:
      return state
  }
}

export default function Home() {

  const [cartDetails, dispatch] = useReducer(cartDetailsFunction, initialCartDetails)

  return (
    <div className="main-container">
      <h1>Desserts</h1>
      <div className="flex-container ">
        <div className="flex-item-one">
          {resturantcatalog.map(
            ({ name, category, price, image: { desktop } }, idx) => {
              return (
                <Card
                  name={name}
                  category={category}
                  price={price}
                  image={desktop}
                  key={idx}
                  id={idx}
                  dispatchFunc={dispatch}
                />
              );
            }
          )}
          {/* <Card /> */}
        </div>
      <div className="cart">
          <h4>Your Cart ({cartDetails.itemNumber})</h4>
          <div>
            <img src={emptyCart} alt="empty cart" />
            <h6>Your added items will appear here</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
