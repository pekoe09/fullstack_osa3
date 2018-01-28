import React from 'react'

const Button = ({ type, text, onClick }) => (
  <div>
    <button type={type} onClick={onClick}>{text}</button>
  </div>
)

export default Button