import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import type { Message } from "../common/dataStruct";
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
					params: { limit: 20, offset: 0 }
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
			const res = await apiClient.post<Message>(`/conversations/${conversationId}/messages`, {
				user: user,
				body: text
			});
			setText("");
			// 追加したメッセージをstateに反映
			setMessages((prev) => prev ? [...prev, res.data] : [res.data]);
		} catch (err) {
			console.error("API error:", err);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
			<div className="mx-auto w-full max-w-2xl">
				<div className="bg-white dark:bg-gray-800/60 backdrop-blur rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 flex flex-col h-[600px]">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
						チャット
					</h2>

					{/* メッセージリスト */}
					<div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
						{messages && messages.map((m) => (
							<MessageBlock key={m.id} message={m} />
						))}
					</div>

					{/* 入力エリア */}
					<div className="flex items-center space-x-2">
						<input
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="メッセージを入力..."
							className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 px-4 py-2.5
							focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40 focus:border-indigo-500
							placeholder:text-gray-400 dark:placeholder:text-gray-500"
						/>
						{user !== null && (
							<button
								onClick={() => sendMessage()}
								className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white font-semibold px-4 py-2.5
								hover:bg-indigo-700 active:bg-indigo-800 transition
								focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
							>
								送信
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);

};

export default ChatRoom;
