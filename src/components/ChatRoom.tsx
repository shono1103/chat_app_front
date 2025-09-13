import { useState } from "react";
import type { Message, User } from "../common/dataStruct";
import MessageBlock from "./MessageBlock";
import { useUser } from "../common/Context";


const ChatRoom = ({ messages, sendMessage }: { messages: Message[] | null, sendMessage: (postMessage: string, postUser: User) => Promise<void> }) => {
	const [text, setText] = useState("");
	const { user } = useUser();

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
						onClick={() => sendMessage(text, user)}
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
