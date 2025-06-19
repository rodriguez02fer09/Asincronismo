const fecthData = require('../utils/fetchData')
const API = 'https://rickandmortyapi.com/api/character/'

const anotherFunction = async url_api => {
  try {
    const data = await fecthData(url_api)
    const character = await fecthData(`${API}${data.results[0].id}`)
    const origin = await fecthData(character.origin.url)
    console.log(data.info.count)
    console.log(character.name)
    console.log(origin.dimension)
  } catch (error) {
    console.error(error)
  }
}
console.log('before')
anotherFunction(API)
console.log('after')
//Callbacks --> Ventajas: Simple(una función que recibe otra función com parametro). Son universales, corren en cualquier navegador.
//Desventajas: Composición eidos, anidando cada vez más elementos. Caer en Callback Hell.

//Promesas --> Ventajas: Facilmente enlazables .Then( return… ).Then - Fácil e intuitivo de leer.
//Desventajas //Posible error si no se retorna el siguiente llamado. No corre en todos los navegadores.

//Async-Await --> Ventajas: Se puede usar try-catch . Código más ordenado e intuitivo.
//Desventajas: No corre en todos los navegadores (se requiere un transpilador).
