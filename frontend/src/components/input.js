import React from 'react'

const Input = ({ label, value, handleChange }) => (
  <div>
    {label}: <input value={value} onChange={(event) => handleChange(event.target.value)} />
  </div>
)

export default Input