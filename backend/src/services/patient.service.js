import { prisma } from '../config/database.js';

/**
 * Patient Service
 * Бизнес-логика для работы с пациентами
 */

/**
 * Получить всех пациентов клиники
 * @param {string} clinicId - ID клиники
 * @param {object} options - Опции (search, page, limit)
 * @returns {Promise<object>} { patients, meta }
 */
export async function findAll(clinicId, options = {}) {
  const { search = '', page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;

  // Построение where clause
  const where = {
    clinicId, // ВСЕГДА фильтруем по clinicId!
  };

  // Поиск по имени или телефону
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
    ];
  }

  // Получаем пациентов и общее количество
  const [patients, total] = await Promise.all([
    prisma.patient.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.patient.count({ where }),
  ]);

  return {
    patients,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Получить пациента по ID
 * @param {string} clinicId - ID клиники
 * @param {string} patientId - ID пациента
 * @returns {Promise<object>} Patient
 */
export async function findById(clinicId, patientId) {
  const patient = await prisma.patient.findFirst({
    where: {
      id: patientId,
      clinicId, // ОБЯЗАТЕЛЬНО!
    },
    include: {
      appointments: {
        include: {
          doctor: {
            select: {
              id: true,
              name: true,
              specialization: true,
            },
          },
        },
        orderBy: { appointmentDate: 'desc' },
        take: 10, // Последние 10 приёмов
      },
    },
  });

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
}

/**
 * Создать пациента
 * @param {string} clinicId - ID клиники
 * @param {object} data - Данные пациента
 * @returns {Promise<object>} Созданный пациент
 */
export async function create(clinicId, data) {
  // Проверка: уникальность телефона в рамках клиники
  const existing = await prisma.patient.findFirst({
    where: {
      clinicId,
      phone: data.phone,
    },
  });

  if (existing) {
    throw new Error('Patient with this phone already exists in your clinic');
  }

  // Создаем пациента
  const patient = await prisma.patient.create({
    data: {
      ...data,
      clinicId, // ОБЯЗАТЕЛЬНО добавляем clinicId!
    },
  });

  return patient;
}

/**
 * Обновить пациента
 * @param {string} clinicId - ID клиники
 * @param {string} patientId - ID пациента
 * @param {object} data - Данные для обновления
 * @returns {Promise<object>} Обновленный пациент
 */
export async function update(clinicId, patientId, data) {
  // Проверяем что пациент существует и принадлежит клинике
  await findById(clinicId, patientId);

  // Если обновляется телефон, проверяем уникальность
  if (data.phone) {
    const existing = await prisma.patient.findFirst({
      where: {
        clinicId,
        phone: data.phone,
        id: { not: patientId }, // Исключаем текущего пациента
      },
    });

    if (existing) {
      throw new Error('Patient with this phone already exists in your clinic');
    }
  }

  // Обновляем
  const patient = await prisma.patient.update({
    where: { id: patientId },
    data,
  });

  return patient;
}

/**
 * Удалить пациента
 * @param {string} clinicId - ID клиники
 * @param {string} patientId - ID пациента
 */
export async function remove(clinicId, patientId) {
  // Проверяем что пациент существует и принадлежит клинике
  await findById(clinicId, patientId);

  // Удаляем (appointments удалятся автоматически благодаря onDelete: Cascade)
  await prisma.patient.delete({
    where: { id: patientId },
  });
}

/**
 * Поиск пациента по телефону
 * @param {string} clinicId - ID клиники
 * @param {string} phone - Телефон
 * @returns {Promise<object|null>} Patient или null
 */
export async function findByPhone(clinicId, phone) {
  return await prisma.patient.findFirst({
    where: {
      clinicId,
      phone,
    },
  });
}

