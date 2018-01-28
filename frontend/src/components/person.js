import React from 'react'

import Button from './button'

const Person = ({ person, handleDeletePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><Button type="button" text="poista" onClick={handleDeletePerson(person.id)}/></td>
  </tr>
)

export default Person