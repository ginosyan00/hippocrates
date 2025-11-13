import { prisma } from '../config/database.js';
import { hashPassword, verifyPassword } from '../utils/hash.util.js';
import { generateToken } from '../utils/jwt.util.js';
import { createSlug, createUniqueSlug } from '../utils/slug.util.js';

/**
 * Auth Service
 * Бизнес-логика для аутентификации
 */

/**
 * Регистрирует новую клинику с администратором
 * @param {object} clinicData - Данные клиники
 * @param {object} adminData - Данные администратора
 * @returns {Promise<object>} { clinic, user, token }
 */
export async function registerClinic(clinicData, adminData) {
  // 1. Проверяем уникальность slug
  const existingClinic = await prisma.clinic.findUnique({
    where: { slug: clinicData.slug },
  });

  if (existingClinic) {
    throw new Error('Clinic with this slug already exists');
  }

  // 2. Проверяем уникальность email администратора
  const existingUser = await prisma.user.findUnique({
    where: { email: adminData.email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // 3. Хешируем пароль
  const passwordHash = await hashPassword(adminData.password);

  // 4. Создаем клинику и администратора в транзакции
  const result = await prisma.$transaction(async tx => {
    // Создаем клинику
    const clinic = await tx.clinic.create({
      data: {
        name: clinicData.name,
        slug: clinicData.slug,
        email: clinicData.email,
        phone: clinicData.phone,
        city: clinicData.city,
        address: clinicData.address || null,
      },
    });

    // Создаем администратора
    const user = await tx.user.create({
      data: {
        clinicId: clinic.id,
        name: adminData.name,
        email: adminData.email,
        passwordHash,
        role: 'admin',
      },
    });

    return { clinic, user };
  });

  // 5. Генерируем JWT токен
  const token = generateToken({
    userId: result.user.id,
    clinicId: result.clinic.id,
    role: result.user.role,
  });

  // 6. Возвращаем данные без passwordHash
  const { passwordHash: _, ...userWithoutPassword } = result.user;

  return {
    clinic: result.clinic,
    user: userWithoutPassword,
    token,
  };
}

/**
 * Авторизует пользователя
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль
 * @returns {Promise<object>} { user, token }
 */
export async function loginUser(email, password) {
  // 1. Найти пользователя по email
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      clinic: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // 2. Проверить что пользователь активен
  if (!user.isActive) {
    throw new Error('User account is disabled');
  }

  // 3. Проверить пароль
  const isPasswordValid = await verifyPassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // 4. Генерировать токен
  const token = generateToken({
    userId: user.id,
    clinicId: user.clinicId,
    role: user.role,
  });

  // 5. Возвращаем данные без passwordHash
  const { passwordHash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
    expiresIn: 604800, // 7 дней в секундах
  };
}

/**
 * Получить текущего пользователя по ID
 * @param {string} userId - ID пользователя
 * @returns {Promise<object>} User данные
 */
export async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      clinic: {
        select: {
          id: true,
          name: true,
          slug: true,
          email: true,
          phone: true,
          city: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Удаляем passwordHash
  const { passwordHash: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

