import React from 'react'

export default function Button({text}) {
  return (
    <div>
         <button
          className='btn bg-sky-800 text-white'
          onClick={onclick}
        >
          {text}
        </button>
    </div>
  )
}
