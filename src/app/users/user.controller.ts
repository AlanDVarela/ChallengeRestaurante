import { Request, Response } from 'express';
import User from './user.model';
import bcrypt from 'bcryptjs';

// Listar usuarios
export async function listUsers(req: Request, res: Response) {
	try {
		const items = await User.find().lean();
		res.json(items);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al obtener usuarios' });
	}
}

// Obtener usuario por ID
export async function getUserByEmail(req: Request, res: Response) {
	try {
		const { email } = req.params;
		const item = await User.findOne({ email }).lean();
		if (!item) return res.status(404).json({ message: 'Usuario no encontrado' });
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al obtener el usuario' });
	}
}

// Crear usuario
export async function createUser(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) return res.status(400).json({ message: 'Faltan campos requeridos' });

		const exists = await User.findOne({ email }).lean();
		if (exists) return res.status(409).json({ message: 'Email ya registrado' });

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		const created = await User.create({ name, email, passwordHash });
		res.status(201).json(created);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al crear el usuario' });
	}
}

// Actualizar usuario
export async function updateUser(req: Request, res: Response) {
	try {
		const { email } = req.params;
		const updates = req.body;
		const updated = await User.findOneAndUpdate({ email }, updates, { new: true }).lean();
		if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
		res.json(updated);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al actualizar el usuario' });
	}
}

// Eliminar usuario
export async function deleteUser(req: Request, res: Response) {
	try {
		const { email } = req.params;
		const removed = await User.findOneAndDelete({ email }).lean();
		if (!removed) return res.status(404).json({ message: 'Usuario no encontrado' });
		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al eliminar el usuario' });
	}
}

