const fecthData = require('../utils/fetchData')
const API = 'https://rickandmortyapi.com/api/character/'

fecthData(API)
  .then(data => {
    console.log(data.info.count)
    return fecthData(`${API}${data.results[2].id}`)
  })
  .then(data => {
    console.log(data.name)
    return fecthData(data.origin.url)
  })
  .then(data => {
    console.log(data.dimension)
  })
  .catch(err => console.error(err))
