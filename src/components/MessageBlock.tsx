import type { Message } from "../common/dataStruct";
import { useUser } from "../common/Context";

const MessageBlock = ({ message }: { message: Message }) => {
	const { user } = useUser();
	const isMine = user?.id === message.user.id;
	console.log(isMine);

	return (
		<div className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"}`}>
			<div
				className={`inline-block px-3 py-2 rounded-2xl shadow-sm
        ${isMine
						? "bg-indigo-600 text-white rounded-br-none"
						: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
					} max-w-[75%]`}
			>
				{/* 発言者名 */}
				<div className="text-xs text-gray-200 dark:text-gray-400 mb-1">
					{message.user.display_name}
				</div>

				{/* メッセージ本文 */}
				<div className={isMine ? "text-right" : "text-left"}>
					{message.body}
				</div>
			</div>
		</div>
	);

};

export default MessageBlock