import { Router } from 'express';
import {
	listRestaurantes,
	getRestauranteById,
	createRestaurante,
	updateRestaurante,
	deleteRestaurante,
} from './restaurantes.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

/**
 * Rutas para Restaurantes
 */

// Listar restaurantes
router.get('/', listRestaurantes);

// Obtener por ID
router.get('/:id', getRestauranteById);

// Crear (requiere auth)
router.post('/', authMiddleware, createRestaurante);

// Actualizar (requiere auth)
router.patch('/:id', authMiddleware, updateRestaurante);

// Eliminar (requiere auth)
router.delete('/:id', authMiddleware, deleteRestaurante);

export default router;

