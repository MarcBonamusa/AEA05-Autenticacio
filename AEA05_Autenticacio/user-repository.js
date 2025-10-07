import bcrypt from 'bcryptsjs'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config'

const {Schema} = new DBLocal({path: './db'})

// Creem un esquema per les dades amb els camps especificats
const User = Schema('User', {

})

// Exportem en una clase per crear usuaris i fer login
export class UserRepository {

}

class Validation {

}