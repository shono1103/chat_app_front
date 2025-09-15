import { useState } from "react";
import apiClient from "../api/client";
import type { User } from "../common/dataStruct"
import { Link } from "react-router-dom";

const Login = ({ onLogin }: { onLogin: (token: User) => void }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await apiClient.post(
				"/login",
				{
					user: {
						email: email,
						password: password,
					},
				}
			);
			onLogin(res.data.user);
			console.log(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="container mt-5">
			<h2>ログイン</h2>
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
				<button type="submit" className="btn btn-primary">ログイン</button>
			</form>

			<Link to="/signup">新規ユーザー登録へ</Link>
		</div>
	);
};

export default Login;
