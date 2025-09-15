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
		<div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
			<div className="w-full max-w-md">
				<div className="bg-white dark:bg-gray-800/60 backdrop-blur rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						ログイン
					</h2>

					<form onSubmit={handleSubmit} className="mt-6 space-y-4">
						{/* メールアドレス */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
								メールアドレス
							</label>
							<input
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 px-4 py-2.5
								focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40 focus:border-indigo-500
								placeholder:text-gray-400 dark:placeholder:text-gray-500"
								required
							/>
						</div>

						{/* パスワード */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
								パスワード
							</label>
							<input
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 px-4 py-2.5
								focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40 focus:border-indigo-500
								placeholder:text-gray-400 dark:placeholder:text-gray-500"
								required
							/>
						</div>

						{/* ログインボタン */}
						<button
							type="submit"
							className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white font-semibold px-4 py-2.5
							hover:bg-indigo-700 active:bg-indigo-800 transition
							focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
						>
							ログイン
						</button>
					</form>

					{/* 新規登録リンク */}
					<div className="mt-6 text-center">
						<Link
							to="/signup"
							className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
						>
							新規ユーザー登録へ
						</Link>
					</div>
				</div>
			</div>
		</div>
	);


};

export default Login;
