const express = require('express');
const router = express.Router();

const controller = require('../controllers/loginController')

router.post('/login', (request, response) => {
  const resp = controller.login(request.body)
  response.send({ resp })
})

module.exports = router

