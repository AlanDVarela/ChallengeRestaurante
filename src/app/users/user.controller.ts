import { Request, Response } from 'express';
import User from './user.model';

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
export async function getUserById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const item = await User.findById(id).lean();
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
		const { name, email, emailVerified } = req.body;
		if (!name || !email) return res.status(400).json({ message: 'Faltan campos requeridos' });

		const exists = await User.findOne({ email }).lean();
		if (exists) return res.status(409).json({ message: 'Email ya registrado' });

		const created = await User.create({ name, email, emailVerified });
		res.status(201).json(created);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al crear el usuario' });
	}
}

// Actualizar usuario
export async function updateUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const updates = req.body;
		const updated = await User.findByIdAndUpdate(id, updates, { new: true }).lean();
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
		const { id } = req.params;
		const removed = await User.findByIdAndDelete(id).lean();
		if (!removed) return res.status(404).json({ message: 'Usuario no encontrado' });
		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al eliminar el usuario' });
	}
}

