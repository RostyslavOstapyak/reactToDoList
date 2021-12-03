import axios from 'axios';

const baseUrl = 'https://61422caa4d16670017ba2c4f.mockapi.io/toDoApi/simpleTasksList';

export const fetchData = () => axios.get(baseUrl).then((response) => response.data)

export const postTable = ({ tableTitle, tableContent }) => axios.patch(`${baseUrl}`, { tableTitle, tableContent })

export const postTask = ({ text, order, done, table }) => axios.post(`${baseUrl}`, { text, order, done, table })

// export const addTask = (id) => axios.patch(`${baseUrl}/${id})onCreateTable

// response = {
//     tables: [],
//     tasks: []
// }