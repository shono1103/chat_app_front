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
		<div className="container mt-5">
			<h2>{user && user.display_name}</h2>
			<h2>ユーザー一覧</h2>
			<ul className="list-group">
				{conversations.map((conv) => (
					<li
						key={conv.id}
						className="list-group-item list-group-item-action"
						onClick={() => handleSelect(conv.id)}
					>
						{conv.partner.display_name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Conversations;
