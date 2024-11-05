import React from 'react'

export default function CardItem({name,amount,price, dispatch}) {
  return (
    <li className='pb-2 border-b border-b-[#f5eeec] mb-2 relative'>
        <p className='mb-1 text-base text-black'>{name}</p>
        <p className='text-sm flex gap-2 items-center'><span className='text-[#C73b0f] font-semibold'>{amount}x</span><span className='text-[#87635a]'>@${price}</span><span className='text-[#87355a]'>${price}</span></p>
        <div 
          onClick={()=>{dispatch({type:"remove", foodName: name})}}
          className='absolute top-[50%] right-0 -translate-y-[50%] h-[16px] w-[16px] rounded-full flex justify-center items-center border border-[#ad8a85]'>
          <svg className=' fill-currentcolor text-[#ad8a85]' xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
        </div>
    </li>
  )
}
