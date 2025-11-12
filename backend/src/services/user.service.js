import { prisma } from '../config/database.js';
import { hashPassword } from '../utils/hash.util.js';

/**
 * User Service
 * Бизнес-логика для работы с пользователями (сотрудниками)
 */

/**
 * Получить всех пользователей клиники
 * @param {string} clinicId - ID клиники
 * @param {object} options - Опции (role, page, limit)
 * @returns {Promise<object>} { users, meta }
 */
export async function findAll(clinicId, options = {}) {
  const { role, page = 1, limit = 50 } = options;
  const skip = (page - 1) * limit;

  // Построение where clause
  const where = {
    clinicId, // ВСЕГДА фильтруем по clinicId!
  };

  // Фильтр по роли
  if (role) {
    where.role = role;
  }

  // Получаем пользователей и общее количество
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        specialization: true,
        phone: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // НЕ возвращаем passwordHash!
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Получить пользователя по ID
 * @param {string} clinicId - ID клиники
 * @param {string} userId - ID пользователя
 * @returns {Promise<object>} User
 */
export async function findById(clinicId, userId) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      clinicId, // ОБЯЗАТЕЛЬНО!
    },
    select: {
      id: true,
      clinicId: true,
      name: true,
      email: true,
      role: true,
      specialization: true,
      phone: true,
      avatar: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      // НЕ возвращаем passwordHash!
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Создать пользователя
 * @param {string} clinicId - ID клиники
 * @param {object} data - Данные пользователя
 * @returns {Promise<object>} Созданный пользователь
 */
export async function create(clinicId, data) {
  // Проверка: уникальность email (глобально, не только в клинике)
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new Error('User with this email already exists');
  }

  // Хешируем пароль
  const passwordHash = await hashPassword(data.password);

  // Создаем пользователя
  const user = await prisma.user.create({
    data: {
      clinicId, // ОБЯЗАТЕЛЬНО!
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
      specialization: data.specialization || null,
      phone: data.phone || null,
    },
    select: {
      id: true,
      clinicId: true,
      name: true,
      email: true,
      role: true,
      specialization: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      // НЕ возвращаем passwordHash!
    },
  });

  return user;
}

/**
 * Обновить пользователя
 * @param {string} clinicId - ID клиники
 * @param {string} userId - ID пользователя
 * @param {object} data - Данные для обновления
 * @returns {Promise<object>} Обновленный пользователь
 */
export async function update(clinicId, userId, data) {
  // Проверяем что пользователь существует и принадлежит клинике
  await findById(clinicId, userId);

  // Если обновляется email, проверяем уникальность
  if (data.email) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing && existing.id !== userId) {
      throw new Error('User with this email already exists');
    }
  }

  // Если обновляется пароль, хешируем его
  if (data.password) {
    data.passwordHash = await hashPassword(data.password);
    delete data.password; // Удаляем plaintext password
  }

  // Обновляем
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      clinicId: true,
      name: true,
      email: true,
      role: true,
      specialization: true,
      phone: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

/**
 * Удалить пользователя
 * @param {string} clinicId - ID клиники
 * @param {string} userId - ID пользователя
 */
export async function remove(clinicId, userId) {
  // Проверяем что пользователь существует и принадлежит клинике
  await findById(clinicId, userId);

  // Проверка: нельзя удалить последнего админа
  const admins = await prisma.user.count({
    where: {
      clinicId,
      role: 'admin',
      isActive: true,
    },
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user.role === 'admin' && admins <= 1) {
    throw new Error('Cannot delete the last admin of the clinic');
  }

  // Удаляем
  await prisma.user.delete({
    where: { id: userId },
  });
}

/**
 * Получить всех врачей клиники
 * @param {string} clinicId - ID клиники
 * @returns {Promise<array>} Список врачей
 */
export async function findDoctors(clinicId) {
  return await prisma.user.findMany({
    where: {
      clinicId,
      role: 'doctor',
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      specialization: true,
      phone: true,
      avatar: true,
    },
    orderBy: { name: 'asc' },
  });
}

