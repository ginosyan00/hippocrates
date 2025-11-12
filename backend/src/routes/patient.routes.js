import express from 'express';
import * as patientController from '../controllers/patient.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { tenantMiddleware } from '../middlewares/tenant.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createPatientSchema, updatePatientSchema } from '../validators/patient.validator.js';

const router = express.Router();

// Применяем auth и tenant middleware ко всем routes
router.use(authenticate);
router.use(tenantMiddleware);

/**
 * GET /api/v1/patients/search/phone
 * Поиск пациента по телефону
 * Доступ: admin, assistant, doctor
 */
router.get('/search/phone', patientController.searchByPhone);

/**
 * GET /api/v1/patients
 * Получить список пациентов
 * Доступ: admin, assistant, doctor
 */
router.get('/', patientController.getAll);

/**
 * GET /api/v1/patients/:id
 * Получить пациента по ID
 * Доступ: admin, assistant, doctor
 */
router.get('/:id', patientController.getById);

/**
 * POST /api/v1/patients
 * Создать нового пациента
 * Доступ: admin, assistant
 */
router.post(
  '/',
  authorize('admin', 'assistant'),
  validate(createPatientSchema),
  patientController.create
);

/**
 * PUT /api/v1/patients/:id
 * Обновить пациента
 * Доступ: admin, assistant
 */
router.put(
  '/:id',
  authorize('admin', 'assistant'),
  validate(updatePatientSchema),
  patientController.update
);

/**
 * DELETE /api/v1/patients/:id
 * Удалить пациента
 * Доступ: только admin
 */
router.delete('/:id', authorize('admin'), patientController.remove);

export default router;

