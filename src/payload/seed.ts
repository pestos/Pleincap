import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  const existingAdmin = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@pleincap.com',
      },
    },
  })

  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@pleincap.com',
        password: process.env.ADMIN_PASSWORD || 'Admin123!',
        name: 'Admin PleinCap',
        role: 'admin',
      },
    })
    payload.logger.info('Admin user created: admin@pleincap.com')
  } else {
    payload.logger.info('Admin user already exists, skipping seed')
  }
}
