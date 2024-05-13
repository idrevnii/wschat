import { WebSocketServer } from 'ws'
import { Messages, db } from '../db'
import { WsEvent } from './types'
import { eq } from 'drizzle-orm'

export function startWebsocketsServer() {
  const ws = new WebSocketServer({ port: 8080 })
  const clients: any[] = []

  ws.on('connection', function connection(ws) {
    clients.push(ws)

    ws.on('error', console.error)

    ws.on('message', async function message(data) {
      const event = JSON.parse(data.toString()) as WsEvent

      if (event.type === 'waitingForMessages') {
        const roomId = event.data
        const messages = await db
          .select()
          .from(Messages)
          .where(eq(Messages.roomId, roomId))
          .execute()

        ws.send(JSON.stringify(messages))
      }

      if (event.type === 'sendedMessage') {
        const newMessage = await db
          .insert(Messages)
          .values(event.data)
          .returning()
          .execute()

        clients.forEach((ws) => ws.send(JSON.stringify(newMessage)))
      }
    })
  })

  console.log('Ws server started!')
}
