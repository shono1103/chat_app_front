import { useState } from "react";
import apiClient from "../api/client";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationPwd, setConfirmationPwd] = useState("");
	const [display_name, setDisplayName] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {

		e.preventDefault();
		if (password !== confirmationPwd) {
			setError("Password and confirmation do not match");
			return;
		}
		try {
			const res = await apiClient.post(
				"/signup",
				{
					user: {
						email: email,
						password: password,
						display_name: display_name
					},
				}
			);
			console.log(res.data);
		} catch (err) {
			setError(`Signup failed. Please try again.: ${err}`);
		}
	};

	return (
		<div className="container mt-5">
			<h2>新規ユーザー登録</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="メールアドレス"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control mb-2"
				/>
				<input
					type="password"
					placeholder="パスワード"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="form-control mb-2"
				/>
				<input
					type="confirmationPwd"
					placeholder="パスワード(確認用)"
					value={confirmationPwd}
					onChange={(e) => setConfirmationPwd(e.target.value)}
					className="form-control mb-2"
				/>
				<input
					type="display_name"
					placeholder="表示される名前"
					value={display_name}
					onChange={(e) => setDisplayName(e.target.value)}
					className="form-control mb-2"
				/>
				<button type="submit" className="btn btn-primary">ユーザー登録</button>
				{/* エラー表示 */}
				{error && <p style={{ color: "red" }}>{error}</p>}

			</form>
		</div>
	);
};

export default Signup;
