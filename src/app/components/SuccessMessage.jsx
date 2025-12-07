import React from 'react'

const SuccessMessage = ({ setShowSuccess }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/70 w-screen z-50'>
        <div className='bg-black rounded-xl py-12 px-10 flex flex-col gap-5 items-center md:w-[40%] w-[90%]' style={{ boxShadow: "0 4px 12px #00FF7F" }}>
            <h2 className='text-2xl font-semibold'>Message Sent</h2>
            <p>Your message has been sent successfully. I will reach out to you shortly. Please check your email for the confirmation message. Thank you</p>
            <button onClick={()=> setShowSuccess(false)} className='bg-[#00FF7F] hover:bg-[#00cf67] active:bg-[#00FF7F] text-black px-5 rounded-lg py-2 text-lg w-1/2 font-semibold cursor-pointer'>Done</button>
        </div>
    </div>
  )
}

export default SuccessMessage