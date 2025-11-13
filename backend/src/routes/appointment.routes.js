import express from 'express';
import * as appointmentController from '../controllers/appointment.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { tenantMiddleware } from '../middlewares/tenant.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  updateStatusSchema,
} from '../validators/appointment.validator.js';

const router = express.Router();

// Применяем auth и tenant middleware ко всем routes
router.use(authenticate);
router.use(tenantMiddleware);

/**
 * GET /api/v1/appointments
 * Получить список приёмов
 * Доступ: все авторизованные
 * Query params: ?doctorId=xxx&patientId=xxx&status=pending&date=2025-11-15&page=1&limit=20
 */
router.get('/', appointmentController.getAll);

/**
 * GET /api/v1/appointments/:id
 * Получить приём по ID
 * Доступ: все авторизованные
 */
router.get('/:id', appointmentController.getById);

/**
 * POST /api/v1/appointments
 * Создать новый приём
 * Доступ: admin, assistant
 */
router.post(
  '/',
  authorize('admin', 'assistant'),
  validate(createAppointmentSchema),
  appointmentController.create
);

/**
 * PUT /api/v1/appointments/:id
 * Обновить приём
 * Доступ: admin, assistant
 */
router.put(
  '/:id',
  authorize('admin', 'assistant'),
  validate(updateAppointmentSchema),
  appointmentController.update
);

/**
 * PATCH /api/v1/appointments/:id/status
 * Изменить статус приёма
 * Доступ: admin, assistant, doctor (ограничения внутри service)
 */
router.patch(
  '/:id/status',
  authorize('admin', 'assistant', 'doctor'),
  validate(updateStatusSchema),
  appointmentController.updateStatus
);

/**
 * DELETE /api/v1/appointments/:id
 * Удалить приём
 * Доступ: только admin
 */
router.delete('/:id', authorize('admin'), appointmentController.remove);

export default router;

