import { Request, Response } from "express";

import { connect } from '../database';
import { User } from '../interface/User';


export async function getUsers(_req: Request, res: Response): Promise<Response>{
    try {
        const conn = await connect();
        const users = await conn.query('SELECT * FROM users');
        return res.json(users[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createUser(req: Request, res: Response) {
    try {
      const conn = await connect();
      const newUser: User = req.body;
  
      // Validations of the user
      if (!validationsCreateUser(newUser)) {
        return res.status(400).json({ error: 'Invalid user data' });
      }
  
      // Convertir la fecha a tipo Date
      const birthDate = new Date(newUser.birth);
      newUser.birth = birthDate;
  
      // Insertar en la base de datos
      await conn.query('INSERT INTO users SET ?', [newUser]);
  
      return res.json({
        message: 'User created successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.userId;
        const conn = await connect();
        const user = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        return res.json(user[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const id = req.params.userId;
        const conn = await connect();
        await conn.query("DELETE FROM users WHERE id = ?", [id]);
        return res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
      const id = req.params.userId;
      const updateUser: User = req.body;
      const conn = await connect();
  
      // Convertir la fecha a tipo Date
      const birthDate = new Date(updateUser.birth);
      updateUser.birth = birthDate;
  
      await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
  
      return res.json({ message: 'User updated successfully', UserUpdated: updateUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

function validationsCreateUser(user: User): boolean {
    const birthDate: Date = new Date(user.birth);
    const createdDate: Date = new Date(user.created_at);

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