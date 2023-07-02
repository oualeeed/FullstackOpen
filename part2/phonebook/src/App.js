import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'
import './app.css'

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

const Notification = ({notification}) => notification

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName]  = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter]    = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [notification , setNotification ] = useState(null)
  
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

    // the person is already in the db , prceed to update ?
    if ( !(dude === undefined || dude === null) ) {
      if ( !window.confirm(`${dude.name} is already in phonebook, replace the old number with a new one ?`)) return 
      personService
        .update(dude.id , newPerson)
        .then(
          response => {
            const personsCopy = persons.map(person => person.id === dude.id ? {...dude , number : newPerson.number } : person )
            setPersons(personsCopy)
            setPersonsToShow(personsCopy)
            notify(`${newPerson.name}'s number updated.` , 'notification')
            setNewName('')
            setNumber('')
          }
        ).catch(
          error => notify(`information for ${dude.name} haas already been removed from server.` , 'error' )
        )
      return 
    }

    personService
      .createPerson(newPerson)
      .then(
        response => {
          const personsCopy = [...persons].concat(response)
          setPersonsToShow(personsCopy)
          setPersons(personsCopy)
          notify(`${newPerson.name} is added.` , 'notfication')
          // setNotification(`${newPerson.name} is added.`)
          // setTimeout(
          //   ()=>setNotification(null),3000
          // )
          setNewName('')
          setNumber('')
        }
      ).catch(
        error => notify('Sorry an error ocuured. Try to refresh and try a gain please' , 'error' )
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
      ).catch(
        error => notify('Sorry an error ocuured. Try to refresh and try a gain please' , 'error' )
      )
  }

  const notify = (message , typeOfNotification) =>{
    const notif = ( <div className={typeOfNotification}> {message}</div> )
    setNotification(notif)
    setTimeout(
      ()=>setNotification(null)
      ,3000)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
