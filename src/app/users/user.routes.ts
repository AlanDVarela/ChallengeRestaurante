import { Router } from 'express';
import {
	listUsers,
	getUserByEmail,
	createUser,
	loginUser,
	refreshUserToken,
	logoutUser,
	updateUser,
	deleteUser,
} from './user.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Listar usuarios
router.get('/', listUsers);

// Obtener por ID
router.get('/:email', getUserByEmail);

// Crear (registro público)
router.post('/register', createUser);

// Login público
router.post('/login', loginUser);

// Refresh token público
router.post('/refresh', refreshUserToken);

// Logout (publico, requiere enviar refreshToken)
router.post('/logout', logoutUser);

// Actualizar (requiere auth) - por email
router.patch('/update/:email', authMiddleware, updateUser);

// Eliminar (requiere auth) - por email
router.delete('/delete/:email', authMiddleware, deleteUser);

export default router;

