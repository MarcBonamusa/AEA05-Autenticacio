import express from "express";
import { PORT, SECRET_JWT_KEY } from "./config.js";

const app = express(); //crear el servidor

app.use(express.json());
app.use(express.static("public"));// Carrega css

app.set('view engine', 'ejs'); //Motor de plantillas
app.set('views', './views')

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))

//Inici dels endpoints

app.get('/', (req, res) => {
    // const { user } = req.session
    res.render('register')
});

app.post('/register', (req, res) => {
   const {username, password} = req.body; //desestructurar del body lo que queremos usar.
   
})