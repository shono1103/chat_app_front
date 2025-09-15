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
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
			<div className="mx-auto w-full max-w-md">
				<div className="bg-white dark:bg-gray-800/60 backdrop-blur rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						新規ユーザー登録
					</h2>

					<form onSubmit={handleSubmit} className="mt-6 space-y-4">
						{/* メール */}
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
								minLength={8}
							/>
						</div>

						{/* パスワード(確認用) */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
								パスワード（確認用）
							</label>
							<input
								type="password"
								placeholder="もう一度入力"
								value={confirmationPwd}
								onChange={(e) => setConfirmationPwd(e.target.value)}
								className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 px-4 py-2.5
								focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40 focus:border-indigo-500
								placeholder:text-gray-400 dark:placeholder:text-gray-500"
								required
								aria-invalid={Boolean(error)}
							/>
						</div>

						{/* 表示名 */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
								表示される名前
							</label>
							<input
								type="text"
								placeholder="例）さえき しょうの"
								value={display_name}
								onChange={(e) => setDisplayName(e.target.value)}
								className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 px-4 py-2.5
								focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40 focus:border-indigo-500
								placeholder:text-gray-400 dark:placeholder:text-gray-500"
								required
							/>
						</div>

						{/* エラー表示 */}
						{error && (
							<p className="text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-lg px-3 py-2">
								{error}
							</p>
						)}

						{/* 送信ボタン */}
						<button
							type="submit"
							className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white font-semibold px-4 py-2.5
							hover:bg-indigo-700 active:bg-indigo-800 transition
							focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/40"
						>
							ユーザー登録
						</button>
					</form>
				</div>
			</div>
		</div>
	);

};

export default Signup;
