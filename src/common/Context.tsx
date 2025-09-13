import { createContext, useContext } from "react";
import type { User } from "./dataStruct";

export const UserContext = createContext<{
	user: User | null;
	setUser: (u: User | null) => void;
}>({ user: null, setUser: () => { } });

export const useUser = () => useContext(UserContext);