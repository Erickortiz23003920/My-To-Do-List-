const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tareasRoutes = require("./routes/tareas");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/tareas", tareasRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Tareas');
});

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto: http://localhost:${port}`);
});
