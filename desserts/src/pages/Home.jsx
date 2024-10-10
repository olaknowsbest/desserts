import { resturantcatalog } from "../assets/data/dessertData";
import Card from "../components/Card";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import { useReducer } from "react";
import CardItem from "../components/CardItem";

const initialCartDetails = {
  itemNumber: 0,
  cartItems: [],
  itemTotalAmount: 0
}

function calculateTotal(array){
  const total = array.reduce((total,item)=>{
    const product = item.amount * item.price
    return total + product
  },0)
  return total

}

function cartDetailsFunction(state,action){
  let total
  switch(action.type){
    case "state":
      return state;
    case "addItem":
      total = calculateTotal([...state.cartItems,action.item ])
      return {
        ...state, 
        cartItems: [...state.cartItems,action.item ], 
        itemNumber: state.cartItems.length + 1,
        itemTotalAmount: total
      }
    case "increment":
      const newCartItems = state.cartItems.map((item,idx)=>{
        if(item.id == action.id){
          return {
            ...item, amount: action.count
          }
        }
        else{
          return item
        }
      })
      total = calculateTotal(newCartItems)
      return {
        ...state, 
        cartItems: newCartItems,
        itemNumber: newCartItems.length,
        itemTotalAmount: total 
      }
    case "decrement":
      if(action.count == 0){
        const newFilteredArray = state.cartItems.filter((item,idx)=>{
          return item.id != action.id
        })
        total = calculateTotal(newFilteredArray)
         return {
          ...state, 
          cartItems: newFilteredArray,
          itemNumber: newFilteredArray.length,
          itemTotalAmount: total
        }
      }
      else{
        const newCartItems = state.cartItems.map((item,idx)=>{
          if(item.id == action.id){
            return {
              ...item, amount: action.count
            }
          }
          else{
            return item
          }
        })
        total = calculateTotal(newCartItems)
        return {
          ...state, 
          cartItems: newCartItems,
          itemNumber: newCartItems.length,
          itemTotalAmount: total
        }
      }
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
          {
            cartDetails.cartItems.length == 0
            ? <div>
            <img src={emptyCart} alt="empty cart" />
            <h6>Your added items will appear here</h6>
            </div>
            : (
              <ul>
                <CardItem
                  name={"Classic Tiramisu"}
                  amount={"1"}
                  price={"5.50"}
                />
                 <CardItem
                  name={"Classic Tiramisu"}
                  amount={"1"}
                  price={"5.50"}
                />
                 <CardItem 
                  name={"Classic Tiramisu"}
                  amount={"1"}
                  price={"5.50"}
                />
              </ul>
            ) 
          }
        </div>
      </div>
    </div>
  );
}
