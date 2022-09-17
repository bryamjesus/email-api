const express = require('express');
const app = express();
const PORT = 3000;

const loginRoutes = require('./routes/loginRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')

app.use(express.json())

app.use('/email', loginRoutes)
app.use('/usuarios', usuarioRoutes)

app.listen(PORT, () => console.log(`🚀 Server run on Port ${PORT}`))
