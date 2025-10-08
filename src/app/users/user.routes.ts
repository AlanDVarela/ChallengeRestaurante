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

// Crear (registro público)
router.post('/register', createUser);

// Actualizar (requiere auth) - por email
router.patch('/update/:email', authMiddleware, updateUser);

// Eliminar (requiere auth) - por email
router.delete('/delete/:email', authMiddleware, deleteUser);

export default router;

