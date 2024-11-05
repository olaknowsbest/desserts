import { resturantcatalog } from "../assets/data/dessertData";
import Card from "../components/Card";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import { useReducer, useState } from "react";
import CardItem from "../components/CardItem";
import Modal from "../components/Modal";

const initialCartDetails = {
  itemNumber: 0,
  cartItems: [],
  itemTotalAmount: 0
}

const testkey = "pk_test_4fd4a8519280ea3e06e735dbf731a6cf07d85c11"

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
    case "reset":
      return initialCartDetails
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
    case "remove":
      const filterCartItemsArray = state.cartItems.filter((item)=>{
        return item.name != action.foodName
      })

      return {
        ...state,
        cartItems: filterCartItemsArray,
        itemNumber: filterCartItemsArray.length
      }
    default:
      return state
  }
}

export default function Home() {

  const [cartDetails, dispatch] = useReducer(cartDetailsFunction, initialCartDetails)
  const [isModalVisible,setIsModalVisible] = useState(false)
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
                  cartItems={cartDetails.cartItems}
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
            ? <div className="empty-cart">
            <img src={emptyCart} alt="empty cart" />
            <h6>Your added items will appear here</h6>
            </div>
            : (
              <div>
              <ul>
                {
                  cartDetails.cartItems.map(({name,price,amount},idx)=>{
                    return (
                      <CardItem 
                        key={idx}
                        name={name}
                        amount={amount}
                        price={price} 
                        dispatch={dispatch}               
                      />
                    )
                  })
                }
              </ul>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="text-sm text-[#260f08]">Order Item</p>
                <p className="text-xl text-[#260f08] font-semibold">${cartDetails.itemTotalAmount}</p>
              </div>
              <div className="rounded-lg flex flex-row items-center justify-center gap-2 py-4 px-4 bg-[#fcf8f6] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
                <p className="text-sm">This is a <span className="font-semibold">carbon-neutral</span> delivery</p>
              </div>
              <button
                onClick={()=>setIsModalVisible(true)} 
                className="w-full text-center py-4 rounded-full bg-[#c73b0f] text-white text-base font-semibold">
                  Confirm Order
              </button>
              </div>
            )
          }
        </div>
      </div>
      {
        isModalVisible
        &&
        <Modal 
          cartItems={cartDetails.cartItems}
          setIsModalVisible={setIsModalVisible}
          total={cartDetails.itemTotalAmount}
          dispatch={dispatch}  
        />
      }
    </div>
  );
}
