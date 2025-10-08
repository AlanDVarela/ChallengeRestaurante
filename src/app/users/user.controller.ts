import { Request, Response } from 'express';
import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

// Login usuario
export async function loginUser(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Faltan campos requeridos' });

		const user = await User.findOne({ email }).lean();
		if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

		// user.passwordHash puede estar fuera del objeto lean() si no se proyectó; aseguramos obtenerlo
		const userWithHash = await User.findOne({ email }).exec();
		if (!userWithHash) return res.status(401).json({ message: 'Credenciales inválidas' });

		const match = await bcrypt.compare(password, userWithHash.passwordHash || '');
		if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

		const jwtSecret = process.env.JWT_SECRET || 'dev_secret';
		const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_secret';

		const accessToken = jwt.sign({ sub: userWithHash._id, email }, jwtSecret, { expiresIn: '15m' });
		const refreshToken = jwt.sign({ sub: userWithHash._id, email }, refreshSecret, { expiresIn: '7d' });

		// Guardar refreshToken en DB
		(userWithHash as any).refreshToken = refreshToken;
		await (userWithHash as any).save();

		// No devolver passwordHash ni refreshToken en el user
		const { passwordHash, refreshToken: rt, ...userSafe } = (user as any);

		res.json({ accessToken, refreshToken, user: userSafe });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al autenticar' });
	}
}

// Refresh token: intercambia refreshToken por uno nuevo
export async function refreshUserToken(req: Request, res: Response) {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) return res.status(400).json({ message: 'Falta refresh token' });

		const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_secret';
		let payload: any;
		try {
			payload = jwt.verify(refreshToken, refreshSecret) as any;
		} catch (e) {
			return res.status(401).json({ message: 'Refresh token inválido' });
		}

		const user = await User.findById(payload.sub).exec();
		if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
		if (!user.refreshToken || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Refresh token no coincide' });

		const jwtSecret = process.env.JWT_SECRET || 'dev_secret';
		const newAccessToken = jwt.sign({ sub: user._id, email: user.email }, jwtSecret, { expiresIn: '15m' });
		const newRefreshToken = jwt.sign({ sub: user._id, email: user.email }, refreshSecret, { expiresIn: '7d' });

		user.refreshToken = newRefreshToken;
		await user.save();

		res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al refrescar token' });
	}
}

// Logout: borra refreshToken del usuario
export async function logoutUser(req: Request, res: Response) {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) return res.status(400).json({ message: 'Falta refresh token' });

		let payload: any;
		try {
			payload = jwt.decode(refreshToken) as any;
		} catch (e) {
			return res.status(400).json({ message: 'Refresh token inválido' });
		}

		const user = await User.findById(payload.sub).exec();
		if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

		user.refreshToken = undefined;
		await user.save();

		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al hacer logout' });
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

