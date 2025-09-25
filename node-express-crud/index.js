import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app=express(); // tiene todas las funcionalidades, inicia el sv (init)
app.use(bodyParser.json())
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

const readData=()=>{
    try{
        const data=fs.readFileSync("./db.json");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data)

    }catch(error){
        console.log(error);
    }
};
//Funció per escriure informació
const writeData=(data)=>{
    try{
        fs.writeFileSync("./db.json",JSON.stringify(data));

    }catch(error){
        console.log(error);
    }
}
//Funció per llegir la informació
//readData();
// Els endpoints son verbs https (get, post, put, delete)

app.get("/",(req,res)=>{
    res.send("Wellcome to my first API with Node.js");
});

//Creem un endpoint per obtenir tots els llibres
app.get("/books",(req,res)=>{
    const data=readData();

    const user={name:"Marc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;

    res.render("books",{user, data,htmlMessage})
    //res.json(data.books);
})

//Creem un endpoint per obtenir un llibre per un id
app.get("/books/:id",(req,res)=>{
    const data=readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id=parseInt(req.params.id);
    const book=data.books.find((book)=>book.id===id);
    res.json(book);
})

//Creem un endpoint del tipus post per afegir un llibre
app.post("/books",(req,res)=>{ // post = insert
    const data=readData();
    const body=req.body; // define el cuerpo de la peticion
    //todo lo que viene en ...body se agrega al nuevo libro
    const {name} = req.body
    console.log("Titol de llibre: ", name)
    const encontrado = data.books.some((book)=>book.name === name);
    
    if (!encontrado) {
        console.log("Se ha añadido un nuevo libro")
        const newBook={id:data.books.length+1, ...body,}; // propagacion hace una copia del body
        data.books.push(newBook); // genera un nuevo elemento
        writeData(data);
        res.json(newBook);
    } else {
        return res.status(400).json({message: "Aquest llibre ja existeix"})
    }

});

//Creem un endpoint per modificar un llibre
app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
      ...data.books[bookIndex],
      ...body,
    };
    writeData(data);
    res.json({ message: "Book updated successfully" });
});

//Creem un endpoint per eliminar un llibre
app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    //splice esborra a partir de bookIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully" });
});

//Funció per escoltar
app.listen(3000,()=>{
    console.log("Server listing on port 3000");
});