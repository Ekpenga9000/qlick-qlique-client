import React from 'react';
import "./Button.scss";

function Button({ message }) {
  return (
    <button className='button'>{message}</button>
  )
}

export default Button