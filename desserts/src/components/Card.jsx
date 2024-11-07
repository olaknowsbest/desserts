import { useEffect, useState } from "react";
import cartIcon from "../assets/images/icon-add-to-cart.svg";



export default function Card(props) {
  const [isActive,setIsActive] = useState(false)
  const [count,setCount] = useState(0)
  function clickHandler(){
    setCount(1)
    setIsActive(true)
    const itemObj = {
      id: props.id,
      name: props.name,
      category: props.category,
      price: props.price,
      amount: 1,
      image: props.image
    }
    props.dispatchFunc({type: "addItem", item: itemObj})
    // console.log(itemObj)
  }

  function increaseCount(){
    setCount((prev)=>{
      props.dispatchFunc({type: "increment", id: props.id, count: prev + 1})
      return prev + 1
    })
  }
  function decreaseCount(){
    setCount((prev)=>{
      props.dispatchFunc({type: "decrement", id: props.id, count: prev - 1})
      if(prev == 1){
        setIsActive(false)
        return 0
      }else{
        return prev - 1
      }
    })
  }

  useEffect(()=>{
    const foodIndex = props.cartItems.findIndex((item)=>{
      return item.name === props.name
    })
    
    if(foodIndex < 0){
      setCount(0)
      setIsActive(false)
    }
  },[props.cartItems.length])

  return (
    <div className="card">
      <div className="card-image">
        <img src={props.image} width={180} height={180} alt="dessert" />
          {
            !isActive
            ? <div className="addcart" onClick={clickHandler}>
                <img src={cartIcon} alt="cart icon" />
                <p> Add to cart</p> 
              </div>
            : <div className="addcart active" >
                <div onClick={decreaseCount}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                </div>
                <p>{count}</p>
                <div onClick={increaseCount}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </div>
            </div>
          }
      </div>
      <div className="card-content">
        <p>{props.category}</p>
        <p>{props.name}</p>
        <p>${props.price}</p>
      </div>
    </div>
  );
}
