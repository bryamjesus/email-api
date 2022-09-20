"use strict";
// let { nextId, users } = require('../data/users.json');
const { leerJson } = require('../helper/util');
const fs = require('fs');
const nodemailer = require("nodemailer");
const randtoken = require('rand-token');
const URL_SERVER_API = 'http://localhost:3000';



const registrar = async ({ nombres, email, clave }) => {
  const { nextId, users } = leerJson('users')
  const token = randtoken.generate(16);

  const newUser = {
    id: nextId,
    nombres,
    email,
    clave,
    token,
    estado: 'P'
  }

  const nLista = [...users, newUser]
  // console.log(nLista)
  const nData = {
    nextId: nextId + 1,
    users: nLista
  }
  // console.log(nData)

  fs.writeFileSync('./src/data/users.json', JSON.stringify(nData, null, 2))



  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "46a9d2f96e569d",
      pass: "d5e1e366e21e94"
    }
  });

  const mailOptions = {
    from: 'registro@empresa.com',
    to: 'fgarcia@cliente.com',
    subject: 'Bienvenido Nuevo Usuario',
    html: `<p>Hola ${nombres}<p>
           <p>Bienvenido a nuestra plataforma.
              Para activar tu usuario, haz clic en el siguiente enlace:</p>
           <p><a href="${URL_SERVER_API}/usuarios/activar/${token}">Activar cuenta</a></p>`
  }

  console.log(mailOptions);
  let info = await transport.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);






  return newUser
}

const activar = (token) => {
  const { nextId, users } = leerJson('users')
  let found = false;
  const nLista = users.map(elem => {
    if (elem.token == token && elem.estado == 'P') {
      found = true;
      elem.estado = 'A';
    }
    return elem;
  })

  if (found) {
    console.log('nLista => ', nLista);
    const nData = {
      nextId,
      usuarios: nLista
    }
    fs.writeFileSync(
      './src/data/users.json',
      JSON.stringify(nData, null, 2)
    );
    return 'Ok';
  } else {
    return 'Token inválido';
  }

}

const listar = () => {
  const { users } = leerJson('users')
  return users;
};

const buscarPorId = (id) => {
  const { users } = leerJson('users')
  const usuario = users.find(elem => elem.id == id);
  return usuario;
};

module.exports = {
  registrar,
  activar,
  listar,
  buscarPorId
};
