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

/**
 * Регистрация пользователя (Patient, Doctor, Partner)
 * Динамическая валидация в зависимости от роли
 */
export const registerUserSchema = Joi.object({
  // Общие поля для всех ролей
  role: Joi.string()
    .valid('PATIENT', 'DOCTOR', 'PARTNER')
    .required()
    .messages({
      'any.only': 'Role must be one of: PATIENT, DOCTOR, PARTNER',
      'any.required': 'Role is required',
    }),
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be at most 100 characters',
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
  phone: Joi.string()
    .pattern(/^\+?[\d\s\-\(\)]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Must be a valid phone number',
    }),
  dateOfBirth: Joi.date().optional().messages({
    'date.base': 'Must be a valid date',
  }),
  gender: Joi.string().valid('male', 'female', 'other').optional().messages({
    'any.only': 'Gender must be one of: male, female, other',
  }),

  // Doctor-specific поля (required только для DOCTOR)
  specialization: Joi.string().when('role', {
    is: 'DOCTOR',
    then: Joi.required().messages({
      'any.required': 'Specialization is required for doctors',
    }),
    otherwise: Joi.optional(),
  }),
  licenseNumber: Joi.string().when('role', {
    is: 'DOCTOR',
    then: Joi.required().messages({
      'any.required': 'License number is required for doctors',
    }),
    otherwise: Joi.optional(),
  }),
  experience: Joi.number().integer().min(0).when('role', {
    is: 'DOCTOR',
    then: Joi.required().messages({
      'any.required': 'Experience is required for doctors',
      'number.min': 'Experience must be at least 0 years',
    }),
    otherwise: Joi.optional(),
  }),
  clinicId: Joi.string().optional(),

  // Partner-specific поля (required только для PARTNER)
  organizationName: Joi.string().when('role', {
    is: 'PARTNER',
    then: Joi.required().messages({
      'any.required': 'Organization name is required for partners',
    }),
    otherwise: Joi.optional(),
  }),
  organizationType: Joi.string()
    .valid('pharmacy', 'laboratory', 'insurance')
    .when('role', {
      is: 'PARTNER',
      then: Joi.required().messages({
        'any.required': 'Organization type is required for partners',
        'any.only': 'Organization type must be one of: pharmacy, laboratory, insurance',
      }),
      otherwise: Joi.optional(),
    }),
  inn: Joi.string().when('role', {
    is: 'PARTNER',
    then: Joi.required().messages({
      'any.required': 'INN is required for partners',
    }),
    otherwise: Joi.optional(),
  }),
  address: Joi.string().when('role', {
    is: 'PARTNER',
    then: Joi.required().messages({
      'any.required': 'Address is required for partners',
    }),
    otherwise: Joi.optional(),
  }),
});

