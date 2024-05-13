import Fastify from 'fastify'
import cors from '@fastify/cors'
import { db, Room, Rooms } from '../db'

export async function startHttpServer() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors)

  fastify.get('/rooms', async (req, reply) => {
    const rooms: Room[] = await db.select().from(Rooms).execute()

    reply.type('application/json').code(200)
    return JSON.stringify(rooms)
  })

  fastify.post('/rooms', async (req, reply) => {
    const body = req.body as { roomName: string }
    const roomName = body.roomName

    await db.insert(Rooms).values({ roomName }).execute()

    reply.type('application/json').code(200)
    return
  })

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
  })
}
