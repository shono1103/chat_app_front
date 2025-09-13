export interface User {
	id: number
	display_name: string
	email: string | null
}

export interface Conversation {
	id: number
	partner: User
	update_at: Date
}

export interface ApiConversation {
	id: number,
	user1: User,
	user2: User,
	update_at: Date
}

export interface Message {
	id: number
	body: string
	create_at: Date
	user: User
}
