import bcrypt from 'bcryptsjs'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config'

const {Schema} = new DBLocal({path: './db'}) // Conexio de la base de dades

// Creem un esquema per les dades amb els camps especificats
const User = Schema('User', {
    _id:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true}
})

// Exportem en una clase per crear usuaris i fer login
export class UserRepository {
    static async create({username, password}) {
        // 1. Validacio opcional usar zod
        Validation.username(username)
        Validation.password(password)
        // 2. Asegurase que el username no existe
        const user = User.findOne({username})
        // 3. Si existe el usuario lanza un error
        if (user) throw Error ('username already exists')
        // 4. Creamos un id si fuera bd normal, mejor que lo genere la bd
        const id = crypto.randomUUID()
        // 5. Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        // 6. Creamos el usuario
        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()
        // 7. Devolvemos el id
        return id
    }
    
    static async login({username, password}) {

    }
}

class Validation {
    static username(username){
        if(typeof username != 'string') throw new Error('username must be a string');
        if(username.length < 3) throw new Error('Username superior a 3 caracteres');
    }

    static password(password){
        if(typeof password != 'string') throw new Error('sdfjkl must be a string');
        if(password.length < 6) throw new Error('password superior a 5 caracteres');
    }
}