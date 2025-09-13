import { useState, useEffect } from "react";
import Login from "./components/Login";
import Conversations from "./components/Conversations.tsx";
import apiClient from "./api/client.ts"
import ChatRoom from "./components/ChatRoom.tsx";
import type { User, Conversation, ApiConversation, Message } from "./common/dataStruct";
import { UserContext } from "./common/Context.tsx";


function App() {
	const [user, setUser] = useState<User | null>(null);
	const [conversations, setConversations] = useState<Conversation[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [messages, setMessages] = useState<Message[] | null>(null)
	const [conversation_id, setConversation_id] = useState<number | null>(null)



	const selectPartner = (conversation_id: number) => {
		setConversation_id(conversation_id);
	}


	// token の変更を監視
	useEffect(() => {
		if (!user) return;
		const fetchConversations = async () => {
			setLoading(true);
			try {
				const res = await apiClient.get<ApiConversation[]>("/conversations", {});

				const convs: Conversation[] = res.data.map((conv: ApiConversation) => ({
					id: conv.id,
					partner: conv.user1.id === user.id ? conv.user2 : conv.user1,
					update_at: conv.update_at
				}))
				setConversations(convs);
			} catch (err) {
				console.error("API error:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchConversations();
	}, [user]);

	useEffect(() => {
		console.log("update conversations");
		console.log(conversations);
	}, [conversations])

	useEffect(() => {
		const fetchMessages = async () => {
			setLoading(true);
			try {
				console.log("/conversations/" + conversation_id + "/messages");
				const res = await apiClient.get<Message[]>("/conversations/" + conversation_id + "/messages", {
					params: { limit: 20, ofset: 0 }
				});
				setMessages(res.data);
			} catch (err) {
				console.error("API error:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchMessages();
	}, [conversation_id])

	useEffect(() => {
		console.log("update messages");;
		console.log(messages);
	}, [messages])

	const sendMessage = async (postMessage: string, postUser: User) => {
		// messagesの投稿
		setLoading(true);
		try {
			await apiClient.post<ApiConversation[]>(`/conversations/${conversation_id}/messages`, {
				user: postUser,
				body: postMessage
			});
		} catch (err) {
			console.error("API error:", err);
		}
		// messagesの更新
		try {
			const res = await apiClient.get<Message[]>("/conversations/" + conversation_id + "/messages", {
				params: { limit: 20, ofset: 0 }
			});
			setMessages(res.data);
		} catch (err) {
			console.error("API error:", err);
		} finally {
			setLoading(false);
		}

	}



	return (
		<UserContext.Provider value={{ user, setUser }}>
			{loading && <p>loading now ...</p>}
			{!user && <Login onLogin={setUser} />}
			{user && !messages && <Conversations user={user} convs={conversations} onSelect={selectPartner} />}
			{user && messages && <ChatRoom messages={messages} sendMessage={sendMessage} />}
		</UserContext.Provider>
	)

}

export default App;
