import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, handleChangeFilter}) =>
 <div>
  filter with: <input value={filter} onChange={handleChangeFilter}/>
</div>


const PersonForm = ({addPerson,newName,setNewName,newNumber,setNumber ,handleChange}) => 
<form onSubmit={addPerson}>
  <div>
    name: <input value={newName} onChange={handleChange(setNewName)}/>
  </div>
  <div >
    number: <input value={newNumber} onChange={handleChange(setNumber)}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>


const Persons = ({personsToShow,deleteSomeone}) => <div>{personsToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={deleteSomeone(person)}>delete</button> </p> )} </div>



const App = ({data}) => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName]  = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter]    = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  
  useEffect(() => {    	
		personService  
      .getAll()
      .then(response => {
        setPersons(response.data)
        setPersonsToShow(response.data)
			})
	},[])

  

  const equal = (firstPerson , secondPerson) => {
    if (
      firstPerson === null ||
      firstPerson === undefined ||
      secondPerson === null ||
      secondPerson === undefined
    ) {
      return firstPerson === secondPerson
    }

    if (firstPerson.constructor !== secondPerson.constructor) {
      return false;
    }

    return  firstPerson.name === secondPerson.name 

  } 


  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name : newName,
      number : newNumber
    }

    const dude = persons.find(p =>equal(p , newPerson))

    if ( !(dude === undefined || dude === null) ) {
      alert(`${newName} is already added to phonebook`)
      return 
    }

    personService
      .createPerson(newPerson)
      .then(
        response => {
          const personsCopy = [...persons].concat(response)
          setPersonsToShow(personsCopy)
          setPersons(personsCopy)
        }
      )
      
  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const handleChangeFilter =  (event) => {
    const currentFilter = event.target.value
    setFilter(currentFilter)
    if(currentFilter === '' ) setPersonsToShow(persons) 
    else setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(currentFilter.toLowerCase())))
    
  }

  const deleteSomeone = (person) => () => {
    if ( !window.confirm(`delete ${person.name} ?`)) return 
    personService 
      .deletePerson(person.id)
      .then(
        
        response => {
          const personsCopy = [...persons]
          const deletedPerson = persons.find( p => p.id === person.id )
          const index = persons.indexOf(deletedPerson)
          personsCopy.splice(index,1)
          setPersons(personsCopy)
          setPersonsToShow(personsCopy)
        }
      )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      
      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} 
      newName={newName}
      setNewName={setNewName}
      newNumber={newNumber}
      setNumber={setNumber}
      handleChange={handleChange} />

      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow}  deleteSomeone={deleteSomeone} />

    </div>
  )
}

export default App


 /* {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
    */ 
