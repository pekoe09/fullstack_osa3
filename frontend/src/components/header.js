import React from 'react'

const Header = ({level, text}) => {
  if(level === 1) {
    return <h1>{text}</h1>
  } else {
    return <h2>{text}</h2>
  }
}

export default Header