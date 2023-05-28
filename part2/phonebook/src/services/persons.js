import axios from 'axios'

const baseUrl = `http://localhost:3001/persons` 

const getAll = () => axios.get(baseUrl)

const deletePerson = id  => axios.delete(`${baseUrl}/${id}`)

const createPerson = newPerson =>  axios.post(baseUrl , newPerson).then( response => response.data)


export default {getAll, deletePerson, createPerson}