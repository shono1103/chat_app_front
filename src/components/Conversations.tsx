import type { User, Conversation } from "../common/dataStruct";

const Conversations = ({ user, convs, onSelect }: { user: User, convs: Conversation[], onSelect: (conversation_id: number) => void }) => {

	console.log(convs);

	return (
		<div className="container mt-5">
			<h2>{user.display_name}</h2>
			<h2>ユーザー一覧</h2>
			<ul className="list-group">
				{convs.map((conv) => (
					<li
						key={conv.id}
						className="list-group-item list-group-item-action"
						onClick={() => onSelect(conv.id)}
					>
						{conv.partner.display_name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Conversations;
