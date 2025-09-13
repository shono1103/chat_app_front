import type { Message } from "../common/dataStruct";
import { useUser } from "../common/Context";

const MessageBlock = ({ message }: { message: Message }) => {
	const { user } = useUser();
	const isMine = user?.id === message.user.id;
	console.log(isMine);

	return (
		<div className="mb-2 d-flex">
			<div
				className=
				{`message-block d-inline-block p-2 rounded-3 ${isMine ? "ms-auto bg-primary text-white" : "me-auto bg-light"}`}
				style={{ maxWidth: "75%" }}
			>
				<div className="small text-muted">{message.user.display_name}</div>
				<div className={isMine ? "text-end" : "text-start"}>{message.body}</div>
			</div>
		</div>
	);
};

export default MessageBlock