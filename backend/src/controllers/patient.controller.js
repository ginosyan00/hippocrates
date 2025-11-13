import * as patientService from '../services/patient.service.js';
import { successResponse } from '../utils/response.util.js';

/**
 * Patient Controller
 * Обработчики для patient endpoints
 */

/**
 * GET /api/v1/patients
 * Получить список пациентов
 */
export async function getAll(req, res, next) {
  try {
    const { search, page, limit } = req.query;
    const clinicId = req.user.clinicId;

    const result = await patientService.findAll(clinicId, {
      search,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });

    successResponse(res, result, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/patients/:id
 * Получить пациента по ID
 */
export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const clinicId = req.user.clinicId;

    const patient = await patientService.findById(clinicId, id);

    successResponse(res, patient, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/patients
 * Создать нового пациента
 */
export async function create(req, res, next) {
  try {
    const clinicId = req.user.clinicId;

    const patient = await patientService.create(clinicId, req.body);

    successResponse(res, patient, 201);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/v1/patients/:id
 * Обновить пациента
 */
export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const clinicId = req.user.clinicId;

    const patient = await patientService.update(clinicId, id, req.body);

    successResponse(res, patient, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/v1/patients/:id
 * Удалить пациента
 */
export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const clinicId = req.user.clinicId;

    await patientService.remove(clinicId, id);

    successResponse(res, { message: 'Patient deleted successfully' }, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/patients/search/phone
 * Найти пациента по телефону
 */
export async function searchByPhone(req, res, next) {
  try {
    const { phone } = req.query;
    const clinicId = req.user.clinicId;

    if (!phone) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Phone query parameter is required',
        },
      });
    }

    const patient = await patientService.findByPhone(clinicId, phone);

    successResponse(res, patient, 200);
  } catch (error) {
    next(error);
  }
}

