import * as authService from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

/**
 * Auth Controller
 * Обработчики для auth endpoints
 */

/**
 * POST /api/v1/auth/register
 * Регистрация новой клиники
 */
export async function register(req, res, next) {
  try {
    const { clinic, admin } = req.body;

    const result = await authService.registerClinic(clinic, admin);

    successResponse(res, result, 201);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/login
 * Авторизация пользователя
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    successResponse(res, result, 200);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/v1/auth/me
 * Получить данные текущего пользователя
 */
export async function getMe(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.userId);

    successResponse(res, user, 200);
  } catch (error) {
    next(error);
  }
}

