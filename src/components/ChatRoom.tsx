import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import type { Message, ApiConversation } from "../common/dataStruct";
import MessageBlock from "./MessageBlock";
import { useUser } from "../common/Context";
import apiClient from "../api/client";


const ChatRoom = () => {
	const [messages, setMessages] = useState<Message[] | null>(null)
	const [text, setText] = useState("");
	const { user } = useUser();
	const { id } = useParams();                 // URL から取得
	const conversationId = Number(id);

	useEffect(() => {
		(async () => {
			try {
				console.log(`/conversations/${conversationId}/messages`);
				const res = await apiClient.get<Message[]>(`/conversations/${conversationId}/messages`, {
					params: { limit: 20, ofset: 0 }
				});
				setMessages(res.data);
			} catch (err) {
				console.error("API error:", err);
			}
		})();
	}, [conversationId]);

	if (!id || Number.isNaN(conversationId)) {
		return <Navigate to="/conversations" replace />;
	}



	const sendMessage = async () => {
		// messagesの投稿
		try {
			await apiClient.post<ApiConversation[]>(`/conversations/${conversationId}/messages`, {
				user: user,
				body: text
			});
			setText("");
		} catch (err) {
			console.error("API error:", err);
		}
		// messagesの更新
		try {
			const res = await apiClient.get<Message[]>(`/conversations/${conversationId}/messages`, {
				params: { limit: 20, ofset: 0 }
			});
			setMessages(res.data);
		} catch (err) {
			console.error("API error:", err);
		}
	}

	return (
		<div className="container mt-5">
			<h2>チャット</h2>
			<div className="border p-3 mb-3" style={{ height: "300px", overflowY: "scroll" }}>
				{messages && messages.map((m) => (
					<MessageBlock key={m.id} message={m} />
				))}
			</div>
			<div className="d-flex">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="form-control"
				/>
				{user !== null && (
					<button
						onClick={() => sendMessage()}
						className="btn btn-primary ms-2"
					>
						送信
					</button>
				)}
			</div>
		</div>
	);
};

export default ChatRoom;
