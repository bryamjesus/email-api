const { users } = require('../data/users.json');

const registrar = (datos) => {

}

const listar = () => {
  return users;
};

const buscarPorId = (id) => {
  const usuario = users.find(elem => elem.id == id);
  return usuario;
};

module.exports = {
  registrar,
  listar,
  buscarPorId
};
