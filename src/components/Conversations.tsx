import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client"
import type { Conversation, ApiConversation } from "../common/dataStruct";
import { useUser } from "../common/Context";

const Conversations = () => {
	const [conversations, setConversations] = useState<Conversation[]>([])
	const { user } = useUser();

	const navigate = useNavigate();

	const handleSelect = (conversationId: number) => {
		navigate(`/conversations/${conversationId}`);
	};


	useEffect(() => {
		if (!user?.id) return;
		let cancelled = false;

		(async () => {
			try {
				const res = await apiClient.get<ApiConversation[]>("/conversations", {});

				const convs: Conversation[] = res.data.map((conv: ApiConversation) => ({
					id: conv.id,
					partner: conv.user1.id === user?.id ? conv.user2 : conv.user1,
					update_at: conv.update_at
				}))
				if (!cancelled) setConversations(convs);
			} catch (err) {
				console.error("API error:", err);
			}
		})();

		return (() => { cancelled = true; })
	}, [user?.id]);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
			<div className="mx-auto w-full max-w-2xl">
				<div className="bg-white dark:bg-gray-800/60 backdrop-blur rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8">
					{/* ユーザー名 */}
					<h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{user && user.display_name}
					</h2>

					<h3 className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
						ユーザー一覧
					</h3>

					{/* 会話相手リスト */}
					<ul role="list" className="mt-4 divide-y divide-gray-200/80 dark:divide-gray-700/60">
						{conversations.map((conv) => (
							<li key={conv.id} className="py-2">
								<button
									type="button"
									onClick={() => handleSelect(conv.id)}
									className="w-full text-left px-4 py-3 rounded-xl
									bg-gray-50 hover:bg-gray-100 active:bg-gray-200
									dark:bg-gray-900/40 dark:hover:bg-gray-900/60 dark:active:bg-gray-900/70
									text-gray-900 dark:text-gray-100 font-medium
									transition
									focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
								>
									{conv.partner.display_name}
								</button>
							</li>
						))}
					</ul>

					{/* 空のときの表示（任意） */}
					{conversations.length === 0 && (
						<p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
							会話相手がいません。まずは検索するか、新しい会話を始めましょう。
						</p>
					)}
				</div>
			</div>
		</div>
	);

};

export default Conversations;
