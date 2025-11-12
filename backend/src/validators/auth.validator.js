import Joi from 'joi';

/**
 * Auth Validators
 * Joi schemas для валидации auth endpoints
 */

/**
 * Регистрация клиники
 */
export const registerSchema = Joi.object({
  clinic: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Clinic name must be at least 2 characters',
      'string.max': 'Clinic name must be at most 100 characters',
      'any.required': 'Clinic name is required',
    }),
    slug: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-z0-9-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Slug must contain only lowercase letters, numbers, and hyphens',
        'any.required': 'Slug is required',
      }),
    email: Joi.string().email().required().messages({
      'string.email': 'Must be a valid email',
      'any.required': 'Clinic email is required',
    }),
    phone: Joi.string()
      .pattern(/^\+?[\d\s\-\(\)]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Must be a valid phone number',
        'any.required': 'Phone is required',
      }),
    city: Joi.string().required().messages({
      'any.required': 'City is required',
    }),
    address: Joi.string().allow('').optional(),
  }).required(),

  admin: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Admin name must be at least 2 characters',
      'any.required': 'Admin name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Must be a valid email',
      'any.required': 'Admin email is required',
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
  }).required(),
});

/**
 * Авторизация
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Must be a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

