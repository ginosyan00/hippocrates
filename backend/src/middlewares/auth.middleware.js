import { extractTokenFromHeader, verifyToken } from '../utils/jwt.util.js';
import { unauthorizedResponse } from '../utils/response.util.js';

/**
 * Authentication Middleware
 * Проверка JWT токена и извлечение пользователя
 */
export function authenticate(req, res, next) {
  try {
    // Извлекаем токен из header
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return unauthorizedResponse(res, 'No token provided');
    }

    // Верифицируем токен
    const decoded = verifyToken(token);

    // Добавляем данные пользователя в request
    req.user = {
      userId: decoded.userId,
      clinicId: decoded.clinicId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return unauthorizedResponse(res, error.message);
  }
}

/**
 * Authorization Middleware
 * Проверка роли пользователя
 * @param {string[]} allowedRoles - Разрешенные роли
 * @returns {Function} Express middleware
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'User not authenticated');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to access this resource',
        },
      });
    }

    next();
  };
}

