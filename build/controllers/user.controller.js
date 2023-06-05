"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const database_1 = require("../database");
function getUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.connect)();
            const users = yield conn.query('SELECT * FROM users');
            return res.json(users[0]);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.connect)();
            const newUser = req.body;
            // Validations of the user
            if (!validationsCreateUser(newUser)) {
                return res.status(400).json({ error: 'Invalid user data' });
            }
            // Convertir la fecha a tipo Date
            const birthDate = new Date(newUser.birth);
            newUser.birth = birthDate;
            // Insertar en la base de datos
            yield conn.query('INSERT INTO users SET ?', [newUser]);
            return res.json({
                message: 'User created successfully',
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.createUser = createUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.userId;
            const conn = yield (0, database_1.connect)();
            const user = yield conn.query('SELECT * FROM users WHERE id = ?', [id]);
            return res.json(user[0]);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getUser = getUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.userId;
            const conn = yield (0, database_1.connect)();
            yield conn.query("DELETE FROM users WHERE id = ?", [id]);
            return res.json({
                message: "User deleted successfully"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.userId;
            const updateUser = req.body;
            const conn = yield (0, database_1.connect)();
            // Convertir la fecha a tipo Date
            const birthDate = new Date(updateUser.birth);
            updateUser.birth = birthDate;
            yield conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
            return res.json({ message: 'User updated successfully', UserUpdated: updateUser });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.updateUser = updateUser;
function validationsCreateUser(user) {
    const birthDate = new Date(user.birth);
    const createdDate = new Date(user.created_at);
    if (!user.name || user.name.length > 255) {
        console.error("El campo 'name' es obligatorio y debe tener menos de 255 caracteres.");
        return false;
    }
    if (user.age !== undefined && (user.age < 0 || user.age > 999)) {
        console.error("El campo 'age' debe ser un número entero entre 0 y 999, o puede dejarse vacío.");
        return false;
    }
    if (user.gender !== undefined && !['Femenino', 'Masculino', 'Otro'].includes(user.gender)) {
        console.error("El campo 'gender' debe ser uno de los valores permitidos: 'Femenino', 'Masculino' u 'Otro', o puede dejarse vacío.");
        return false;
    }
    if (user.birth && isNaN(birthDate.getTime())) {
        console.error("El campo 'birth' debe ser una fecha válida en formato Date, o puede dejarse vacío.");
        return false;
    }
    if (user.created_at && isNaN(createdDate.getTime())) {
        console.error("El campo 'created_at' debe ser una fecha válida en formato Date, o puede dejarse vacío.");
        return false;
    }
    return true;
}
