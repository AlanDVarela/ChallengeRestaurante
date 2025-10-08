import { Request, Response } from 'express';
import Restaurante from './restaurantes.model';

// Listar todos los restaurantes
export async function listRestaurantes(req: Request, res: Response) {
	try {
		const items = await Restaurante.find().lean();
		res.json(items);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al obtener restaurantes' });
	}
}

// Obtener restaurante por ID
export async function getRestauranteById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const item = await Restaurante.findById(id).lean();
		if (!item) return res.status(404).json({ message: 'No se encontró el restaurante' });
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al obtener el restaurante' });
	}
}

// Crear restaurante
export async function createRestaurante(req: Request, res: Response) {
	try {
		const { name, location, kitchen } = req.body;
		if (!name || !location || !kitchen) {
			return res.status(400).json({ message: 'Faltan campos requeridos' });
		}

		const created = await Restaurante.create({ name, location, kitchen });
		res.status(201).json(created);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al crear el restaurante' });
	}
}

// Actualizar restaurante (parcial)
export async function updateRestaurante(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const updates = req.body;
		const updated = await Restaurante.findByIdAndUpdate(id, updates, { new: true }).lean();
		if (!updated) return res.status(404).json({ message: 'No se encontró el restaurante' });
		res.json(updated);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al actualizar el restaurante' });
	}
}

// Eliminar restaurante
export async function deleteRestaurante(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const removed = await Restaurante.findByIdAndDelete(id).lean();
		if (!removed) return res.status(404).json({ message: 'No se encontró el restaurante' });
		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al eliminar el restaurante' });
	}
}

