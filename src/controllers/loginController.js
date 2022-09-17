const { users } = require('../data/users.json')

const login = (datos) => {
  let mensaje = 'Datos incorrectos';
  const { usuario, clave } = datos
  console.log({ usuario, clave })

  users.forEach((user) => {
    console.log(user.email === usuario.toLowerCase())
    console.log(user.clave === clave)
    if (user.email === usuario.toLowerCase() && user.clave === clave) {
      if (user.estado === 'A') {
        mensaje = 'ok'
      } else {
        mensaje = 'Usuario Inactivo'
      }
    }
  })

  return mensaje
}

module.exports = {
  login
}
