import React from 'react'
import Header from './header'
import Input from './input'
import Button from './button'

const PersonForm = (props) => (
  <div>
    <Header level={2} text="Lisää uusi / muuta olemassaolevan numero" />
    <form onSubmit={props.handleSubmit}>
      <Input label="nimi" value={props.newName} handleChange={props.handleNameChange} />
      <Input label="numero" value={props.newNumber} handleChange={props.handleNumberChange} />
      <Button type="submit" text="lisää" />
    </form>
  </div>
)

export default PersonForm