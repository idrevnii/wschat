import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const Users = sqliteTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  username: text('username').notNull()
})

export const Rooms = sqliteTable('rooms', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  roomName: text('roomName').default('Untitled')
})

export const Messages = sqliteTable('messages', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  text: text('text').notNull(),
  roomId: text('roomId').references(() => Rooms.id),
  userId: text('userId').references(() => Users.id)
})

export type User = typeof Users.$inferSelect
export type InsertUser = typeof Users.$inferInsert

export type Room = typeof Rooms.$inferSelect
export type InsertRoom = typeof Rooms.$inferInsert

export type Message = typeof Messages.$inferSelect
export type InsertMessage = typeof Messages.$inferInsert
