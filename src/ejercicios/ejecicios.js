/*
Ejercicios de Asincronismo en JavaScript
Lista de ejercicios enfocados únicamente en asincronismo, desde lo más básico hasta un nivel avanzado. No incluyen solución.

1. Nivel Básico
delay(ms) con Promesas
Crea una función delay(ms) que reciba un número de milisegundos y retorne una promesa que se resuelva tras ese tiempo. Invoca delay(1000) y muestra un mensaje cuando se cumpla.
Validación en delay(ms)
Modifica delay(ms) para que rechace la promesa si ms no es un número positivo. Prueba la validación con .catch().
Cadena de Promesas Numéricas
Define las tres funciones siguientes, cada una devolviendo una promesa que se resuelva tras 500 ms:
paso1(valor): debería resolver con valor + 1
paso2(valor): debería resolver con valor * 2
paso3(valor): debería resolver con `Resultado: ${valor - 3}`
Encadena paso1(5).then(...).then(...).then(...) para obtener e imprimir el resultado final.
Rechazo en Cadena
Ajusta paso2 para que rechace la promesa si el valor recibido es mayor que 10. Observa cómo se comporta el .catch() cuando paso2 rechaza.


2. Nivel Intermedio
Reescribir con async/await
A partir de las funciones paso1, paso2 y paso3, crea una función async function ejecutarProceso() que:
Espere a paso1(5).
Luego espere a paso2(...).
Finalmente espere a paso3(...).
Usa try/catch para capturar cualquier rechazo.
Fetch a API Pública
Crea una función que use fetch("https://jsonplaceholder.typicode.com/users/ID") para obtener datos de un usuario según su ID. Verifica response.ok antes de convertir a JSON y muestra el objeto usuario en consola. Prueba con un ID válido y con uno inexistente para manejar el error.
Fetch Paralelo con Promise.all
Escribe un async que reciba un id y llame en paralelo a:
fetch("https://jsonplaceholder.typicode.com/users/")
fetch("https://jsonplaceholder.typicode.com/photos/")
Usa Promise.all([...]) para esperar ambas respuestas y luego imprimir en consola el JSON de usuario y el JSON de foto.
API Falsa con Error Aleatorio
Implementa function apiFalsa() que retorne una promesa que, tras 500 ms, se resuelva con "OK" o se rechace con "Error" de forma aleatoria. Crea async function llamarConReintentos(maxReintentos) que:
Llame a apiFalsa().
Si rechaza, reintente hasta maxReintentos veces antes de rechazar definitivamente.
Encapsular Callback en Promesa
Envuelve la llamada a navigator.geolocation.getCurrentPosition(success, error) en una promesa para poder usarla con await. Define async function obtenerUbicacion() que:
Espere a la promesa de geolocalización.
Imprima latitud y longitud o maneje el error.


3. Nivel Avanzado
Cadena Compleja de Promesas
Crea tres funciones que retornen promesas con retraso:
function factorial(n): devuelve promesa de n!
function sumarHasta(n): devuelve promesa de la suma de 1 a n
function esPrimo(n): devuelve promesa que indique si n es primo
En un async, conecta:
await factorial(5)
Luego await sumarHasta(resultadoAnterior)
Luego await esPrimo(resultadoAnterior)
Muestra en consola cada paso (sin bloquear la UI).
Límite de Concurrencia
Dado un arreglo de URLs, escribe un async function fetchConLimite(urls, limite) que haga peticiones fetch de a limite URLs simultáneamente. Retorna un array con los resultados de todas las peticiones, respetando el límite de concurrencia.
fetch con AbortController y Timeout
Implementa function fetchConTimeout(url, ms) que:
Inicie un < code>fetch(url) usando AbortController.
Si no responde en < code>ms milisegundos, cancele la petición y rechace con un error de timeout.
Reintento Exponencial en fetch
Define async function fetchConReintento(url, maxReintentos) que intente fetch(url) y, si falla, espere un tiempo creciente (por ejemplo, 500 ms, 1000 ms, 2000 ms) antes de reintentar, hasta maxReintentos.
Tareas en Paralelo vs Secuencial
Crea function trabajoAsync(i) que devuelva una promesa que se resuelva en i * 500 ms. Mide en console el tiempo de ejecución de:
Secuencial: < code>await trabajoAsync(1); await trabajoAsync(2); await trabajoAsync(3);
Paralelo: < code>await Promise.all([trabajoAsync(1), trabajoAsync(2), trabajoAsync(3)]);
Web Worker con Promesas
Crea un archivo worker.js que reciba un arreglo de números, haga un cálculo costoso (por ejemplo, ordenar un arreglo grande) y devuelva el resultado con < code>postMessage. En tu script principal, escribe una función que envíe datos al web worker y envuelva su respuesta en una promesa para poder usar await cuando llegue el resultado.
Estos ejercicios cubren desde lo más básico (crear y encadenar promesas) hasta retos complejos (control de concurrencia, abortos, reintentos exponenciales y uso de Web Workers). ¡Practica cada uno sin consultar soluciones!
*/

// 1. solución

//delay(ms) con Promesas
//Crea una función delay(ms) que reciba un número de milisegundos y retorne una promesa que se resuelva tras ese tiempo. Invoca delay(1000) y muestra un mensaje cuando se cumpla.
//Validación en delay(ms)

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
delay(1000).then(() => {
  console.log('¡Tiempo cumplido!')
})

//Validación en delay(ms)
// Modifica delay(ms) para que rechace la promesa si ms no es un número positivo. Prueba la validación con .catch().

const delay1 = ms => {
  return new Promise((resolve, reject) => {
    if (typeof ms !== 'number' || ms <= 0) {
      reject('El valor debe ser un número positivo.')
      return
    }

    setTimeout(() => {
      resolve()
    }, ms)
  })
}

// Uso correcto
delay1(1000).then(() => {
  console.log('¡Tiempo cumplido!')
})

// Uso con error
delay1('texto').catch(err => {
  console.log('Error:', err)
})

/*Cadena de Promesas Numéricas
Define las tres funciones siguientes, cada una devolviendo una promesa que se resuelva tras 500 ms:
paso1(valor): debería resolver con valor + 1
paso2(valor): debería resolver con valor * 2
paso3(valor): debería resolver con `Resultado: ${valor - 3}`*/

const paso1 = valor => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(valor + 1)
    }, 5000)
  })
}

const paso2 = valor => {
  return new Promise((resolve, reject) => {
    if (valor > 10) {
      reject('Error: El valor es mayor que 10')
      return
    }
    setTimeout(() => {
      resolve(valor * 2)
    }, 5000)
  })
}

const paso3 = valor => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`resultado final: ${valor - 3}`)
    }, 5000)
  })
}

//Encadena paso1(5).then(...).then(...).then(...) para obtener e imprimir el resultado final.
paso1(9)
  .then(resolve1 => paso2(resolve1))
  .then(resolve2 => paso3(resolve2))
  .then(resultadoFinal => {
    console.log(resultadoFinal)
  })
  .catch(err => {
    console.log('Error:', err)
  })

/*2. Nivel Intermedio
Reescribir con async/await
A partir de las funciones paso1, paso2 y paso3, crea una función async function ejecutarProceso() que:
Espere a paso1(5).
Luego espere a paso2(...).
Finalmente espere a paso3(...).
Usa try/catch para capturar cualquier rechazo.*/

const steps = async () => {
  try {
    const p1 = await paso1(5)
    const p2 = await paso2(p1)
    const p3 = await paso3(p2)
    console.log(p3)
  } catch (error) {
    console.log('Error:', error)
  }
}

steps()

//Crea una función que use fetch("https://jsonplaceholder.typicode.com/users/ID") para obtener datos de un usuario según su ID.
// Verifica response.ok antes de convertir a JSON y muestra el objeto usuario en consola.
//  Prueba con un ID válido y con uno inexistente para manejar el error.

function obtenerUsuario(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Usuario no encontrado')
      }
      return response.json()
    })
    .then(usuario => {
      console.log(usuario)
    })
    .catch(error => {
      console.error('Error:', error.message)
    })
}
obtenerUsuario(3)
obtenerUsuario(9999)

//Fetch Paralelo con Promise.all(en paralelo)

const url = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3',
]

Promise.all(
  url.map(url =>
    fetch(url).then(res => {
      if (!res.ok) throw new Error('error')
      return res.json()
    }),
  ),
)
  .then(respuestas => {
    console.log('Usuarios:', respuestas)
  })
  .catch(error => {
    console.error('Error en una de las peticiones:', error.message)
  })
/*Escribe un async que reciba un id y llame en paralelo a:
  fetch("https://jsonplaceholder.typicode.com/users/")
  fetch("https://jsonplaceholder.typicode.com/photos/")*/

const obtenerUsuarioConReintentos = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/users/',
    'https://jsonplaceholder.typicode.com/photos/',
  ]
  try {
    const response = await Promise.all(
      urls.map(url =>
        fetch(url).then(res => {
          if (!res.ok) throw new Error(`error`)
          return res.json()
        }),
      ),
    )
    console.log('usuarios', response)
  } catch (eror) {
    console.error('Error en las peticiones ', error.message)
  }
}
obtenerUsuarioConReintentos()

//Fetch a API Pública

fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => {
    if (!response.ok) throw new Error('Usuario no encontrado')
    return response.json()
  })
  .then(data => {
    console.log('Usuario:', data)
  })
  .catch(error => {
    console.error('Error:', error.message)
  })

/* API Falsa con Error Aleatorio
Implementa function apiFalsa() que retorne una promesa que, tras 500 ms, se resuelva con "OK" o se rechace con "Error" de forma aleatoria. 
.*/

const apiFalsa = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5

      if (exito) {
        resolve('OK')
      } else {
        reject('Error')
      }
    }, 500)
  })
}
apiFalsa()

/*Crea async function llamarConReintentos(maxReintentos) que:
Llame a apiFalsa().
Si rechaza, reintente hasta maxReintentos veces antes de rechazar definitivamente*/

const llamarConReintentos = async maxReintentos => {
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      const resultado = await apiFalsa()
      console.log('✅ Éxito:', resultado)
      return
    } catch (error) {
      console.warn(`❌ Intento ${intento} falló`)
      if (intento === maxReintentos) {
        console.error('🚫 No hay más intentos disponibles')
      }
    }
  }
}

llamarConReintentos(3)

/*
Encapsular Callback en Promesa
Envuelve la llamada a navigator.geolocation.getCurrentPosition(success, error) en una promesa para poder usarla con await. 
Define async function obtenerUbicacion() que:
Espere a la promesa de geolocalización.
Imprima latitud y longitud o maneje el error.*/

const obteneGeolocationPromesa = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition()
    position => resolve(position), error => reject(error)
  })
}
const obtenerUbicacion = async () => {
  try {
    const posicion = await obteneGeolocationPromesa()
    const {latitude, longitude} = position.coords
    console.log('Latitud:', latitude)
    console.log('Longitud:', longitude)
  } catch (error) {
    console.error('error', error.message)
  }
}
obtenerUbicacion()

/*3. Nivel Avanzado
Cadena Compleja de Promesas
Crea tres funciones que retornen promesas con retraso:
function factorial(n): devuelve promesa de n!
function sumarHasta(n): devuelve promesa de la suma de 1 a n
function esPrimo(n): devuelve promesa que indique si n es primo*/

/*En un async, conecta:
await factorial(5)
Luego await sumarHasta(resultadoAnterior)
Luego await esPrimo(resultadoAnterior)
Muestra en consola cada paso (sin bloquear la UI).
Límite de Concurrencia.*/

/*Dado un arreglo de URLs, escribe un async function fetchConLimite(urls, limite) que haga peticiones fetch de a limite URLs simultáneamente. 
Retorna un array con los resultados de todas las peticiones, respetando el límite de concurrencia.
fetch con AbortController y Timeout
Implementa function fetchConTimeout(url, ms) que:
Inicie un < code>fetch(url) usando AbortController.
Si no responde en < code>ms milisegundos, cancele la petición y rechace con un error de timeout.*/

/*Reintento Exponencial en fetch
Define async function fetchConReintento(url, maxReintentos) que intente fetch(url) y, si falla, espere un tiempo creciente (por ejemplo, 500 ms, 1000 ms, 2000 ms) antes de reintentar, hasta maxReintentos.
Tareas en Paralelo vs Secuencial*/

/*Crea function trabajoAsync(i) que devuelva una promesa que se resuelva en i * 500 ms. Mide en console el tiempo de ejecución de:
Secuencial: < code>await trabajoAsync(1); await trabajoAsync(2); await trabajoAsync(3);
Paralelo: < code>await Promise.all([trabajoAsync(1), trabajoAsync(2), trabajoAsync(3)]);*/

/*Web Worker con Promesas
Crea un archivo worker.js que reciba un arreglo de números, haga un cálculo costoso (por ejemplo, ordenar un arreglo grande) y devuelva el resultado con < code>postMessage. En tu script principal, escribe una función que envíe datos al web worker y envuelva su respuesta en una promesa para poder usar await cuando llegue el resultado.
Estos ejercicios cubren desde lo más básico (crear y encadenar promesas) hasta retos complejos (control de concurrencia, abortos, reintentos exponenciales y uso de Web Workers). ¡Practica cada uno sin consultar soluciones!
*/
