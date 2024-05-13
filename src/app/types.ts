import { Message } from '../db'

type SendedMessage = {
  type: 'sendedMessage'
  data: Message
}

type WaitingForMessages = {
  type: 'waitingForMessages'
  data: string // RoomId
}

export type WsEvent = SendedMessage | WaitingForMessages
