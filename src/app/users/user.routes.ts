import { Router } from 'express';
import {
	listUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from './user.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Listar usuarios
router.get('/', listUsers);

// Obtener por ID
router.get('/:id', getUserById);

// Crear (requiere auth)
router.post('/', authMiddleware, createUser);

// Actualizar (requiere auth)
router.patch('/:id', authMiddleware, updateUser);

// Eliminar (requiere auth)
router.delete('/:id', authMiddleware, deleteUser);

export default router;

