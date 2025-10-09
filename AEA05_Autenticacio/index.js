import express from "express";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";
import cookieParser from "cookie-parser";

const app = express(); //crear el servidor

app.use(express.json()); // Recibe JSONs del frontend
app.use(cookieParser()); // Habilita las cookies
app.use(express.static("public"));// Carrega css

app.set('view engine', 'ejs'); //Motor de plantillas
app.set('views', './views')

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))

//Inici dels endpoints

app.get('/', (req, res) => {
    // const { user } = req.session
    res.render('register')
});

app.post('/register', async (req, res) => {
   const {username, password} = req.body; //desestructurar del body lo que queremos usar.
   console.log(req.body)
   
   try {
        const id = await UserRepository.create({username, password})
        res.send()
   } catch (error) {
        res.status(400).send(error.message)
   }

})

app.get('/protected', (req, res) => {
     res.render('protected')
})