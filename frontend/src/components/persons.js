import React from 'react'
import Header from './header'
import Person from './person'

const Persons = ({ persons, deletePerson }) => (
  <div>
    <Header level={2} text="Numerot" />
    <table>
      <tbody>
        {persons.map(person => <Person key={person.name} person={person} handleDeletePerson={deletePerson}/>)}
      </tbody>
    </table>
  </div>
)

export default Persons