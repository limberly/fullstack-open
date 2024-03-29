import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(url)
    .then(res => res.data)
}

const addPerson = (personObject) => {
    return axios.post(url, personObject)
    .then(res => res.data)
};

const update = (id, personObject) => {
    return axios.put(`${url}/${id}`, personObject).then(res => res.data)
};

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`).then(res => console.log(`${id} deleted`))
};

const services = {getAll, addPerson, update, deletePerson}

export default services