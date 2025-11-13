import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { tenantMiddleware } from '../middlewares/tenant.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

const router = express.Router();

// Применяем auth и tenant middleware ко всем routes
router.use(authenticate);
router.use(tenantMiddleware);

/**
 * GET /api/v1/users/doctors
 * Получить список врачей
 * Доступ: все авторизованные
 */
router.get('/doctors', userController.getDoctors);

/**
 * GET /api/v1/users
 * Получить список пользователей
 * Доступ: только admin
 */
router.get('/', authorize('admin'), userController.getAll);

/**
 * GET /api/v1/users/:id
 * Получить пользователя по ID
 * Доступ: только admin
 */
router.get('/:id', authorize('admin'), userController.getById);

/**
 * POST /api/v1/users
 * Создать нового пользователя
 * Доступ: только admin
 */
router.post('/', authorize('admin'), validate(createUserSchema), userController.create);

/**
 * PUT /api/v1/users/:id
 * Обновить пользователя
 * Доступ: только admin
 */
router.put('/:id', authorize('admin'), validate(updateUserSchema), userController.update);

/**
 * DELETE /api/v1/users/:id
 * Удалить пользователя
 * Доступ: только admin
 */
router.delete('/:id', authorize('admin'), userController.remove);

export default router;

