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
 * Регистрирует нового пользователя (Patient, Doctor, Partner)
 * @param {object} userData - Данные пользователя
 * @returns {Promise<object>} { user, token }
 */
export async function registerUser(userData) {
  console.log('🔵 [AUTH SERVICE] Регистрация пользователя:', { email: userData.email, role: userData.role });

  // 1. Проверяем уникальность email
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    console.log('🔴 [AUTH SERVICE] Email уже существует:', userData.email);
    throw new Error('User with this email already exists');
  }

  // 2. Хешируем пароль
  const passwordHash = await hashPassword(userData.password);

  // 3. Определяем status в зависимости от роли
  // PATIENT получает instant access (ACTIVE)
  // DOCTOR и PARTNER требуют одобрения (PENDING)
  const status = userData.role === 'PATIENT' ? 'ACTIVE' : 'PENDING';

  console.log('🔵 [AUTH SERVICE] Статус пользователя:', status);

  // 4. Подготавливаем данные для создания
  const userDataToCreate = {
    email: userData.email,
    passwordHash,
    name: userData.name,
    role: userData.role,
    status,
    phone: userData.phone || null,
    dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
    gender: userData.gender || null,
  };

  // 5. Добавляем role-specific поля
  if (userData.role === 'DOCTOR') {
    userDataToCreate.specialization = userData.specialization;
    userDataToCreate.licenseNumber = userData.licenseNumber;
    userDataToCreate.experience = userData.experience;
    userDataToCreate.clinicId = userData.clinicId || null;
  }

  if (userData.role === 'PARTNER') {
    userDataToCreate.organizationName = userData.organizationName;
    userDataToCreate.organizationType = userData.organizationType;
    userDataToCreate.inn = userData.inn;
    userDataToCreate.address = userData.address;
  }

  // 6. Создаем пользователя
  const user = await prisma.user.create({
    data: userDataToCreate,
    include: {
      clinic: userData.clinicId ? {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      } : false,
    },
  });

  console.log('✅ [AUTH SERVICE] Пользователь создан:', { id: user.id, role: user.role, status: user.status });

  // 7. Генерируем JWT токен
  const token = generateToken({
    userId: user.id,
    clinicId: user.clinicId,
    role: user.role,
    status: user.status,
  });

  // 8. Возвращаем данные без passwordHash
  const { passwordHash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
    expiresIn: 604800, // 7 дней в секундах
  };
}

/**
 * Авторизует пользователя
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль
 * @returns {Promise<object>} { user, token }
 */
export async function loginUser(email, password) {
  console.log('🔵 [AUTH SERVICE] Попытка входа:', email);

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
    console.log('🔴 [AUTH SERVICE] Пользователь не найден:', email);
    throw new Error('Invalid email or password');
  }

  // 2. Проверить status пользователя
  if (user.status === 'SUSPENDED') {
    console.log('🔴 [AUTH SERVICE] Аккаунт приостановлен:', email);
    throw new Error('Your account has been suspended. Please contact support.');
  }

  if (user.status === 'REJECTED') {
    console.log('🔴 [AUTH SERVICE] Аккаунт отклонен:', email);
    throw new Error('Your registration was rejected. Please contact support.');
  }

  if (user.status === 'PENDING') {
    console.log('⏳ [AUTH SERVICE] Аккаунт ожидает одобрения:', email);
    throw new Error('Your account is pending approval. You will be notified once approved.');
  }

  // 3. Проверить пароль
  const isPasswordValid = await verifyPassword(password, user.passwordHash);

  if (!isPasswordValid) {
    console.log('🔴 [AUTH SERVICE] Неверный пароль:', email);
    throw new Error('Invalid email or password');
  }

  console.log('✅ [AUTH SERVICE] Вход успешен:', { email, role: user.role, status: user.status });

  // 4. Генерировать токен с role и status
  const token = generateToken({
    userId: user.id,
    clinicId: user.clinicId,
    role: user.role,
    status: user.status,
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

