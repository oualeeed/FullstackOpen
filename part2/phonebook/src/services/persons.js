import axios from 'axios'

const baseUrl = `/api/persons` 

const getAll = () => axios.get( baseUrl )

const deletePerson = id  => axios.delete( `${baseUrl}/${id}` )

const createPerson = newPerson =>  axios.post(baseUrl , newPerson).then( response => response.data )

const update = (id , newObject) => axios.put(`${baseUrl}/${id}` , newObject).then( response => response.data )


export default {getAll, deletePerson, createPerson, update}