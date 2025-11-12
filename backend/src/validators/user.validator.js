import Joi from 'joi';

/**
 * User Validators
 * Joi schemas для валидации user endpoints
 */

/**
 * Создание пользователя (сотрудника)
 */
export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Must be a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      'any.required': 'Password is required',
    }),
  role: Joi.string().valid('admin', 'doctor', 'assistant').required().messages({
    'any.only': 'Role must be one of: admin, doctor, assistant',
    'any.required': 'Role is required',
  }),
  specialization: Joi.string().max(100).allow('').optional(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s\-\(\)]+$/)
    .allow('')
    .optional(),
});

/**
 * Обновление пользователя
 */
export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .optional()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    }),
  role: Joi.string().valid('admin', 'doctor', 'assistant').optional(),
  specialization: Joi.string().max(100).allow('').optional(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s\-\(\)]+$/)
    .allow('')
    .optional(),
  isActive: Joi.boolean().optional(),
}).min(1); // Хотя бы одно поле обязательно

