// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Login from "./components/Login";
import Conversations from "./components/Conversations";
import ChatRoom from "./components/ChatRoom";
import type { User } from "./common/dataStruct";
import { UserContext } from "./common/Context";

function App() {
	const [user, setUser] = useState<User | null>(null);

	// 認証ガード：未ログインなら "/" へ
	const RequireAuth = ({ children }: { children: React.ReactNode }) => {
		return user ? children : <Navigate to="/" replace />;
	};

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Routes>
				{/* "/" はログイン or 会話一覧へ */}
				<Route
					path="/"
					element={
						user ? <Navigate to="/conversations" replace /> : <Login onLogin={setUser} />
					}
				/>

				{/* 会話一覧ページ（データ取得は Conversations 内の useEffect で） */}
				<Route
					path="/conversations"
					element={
						<RequireAuth>
							<Conversations />
						</RequireAuth>
					}
				/>

				{/* 会話詳細（ChatRoom）: URLに conversationId を含める */}
				<Route
					path="/conversations/:id"
					element={
						<RequireAuth>
							<ChatRoom />
						</RequireAuth>
					}
				/>

				{/* 存在しないパスは "/" へ */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</UserContext.Provider>
	);
}

export default App;
