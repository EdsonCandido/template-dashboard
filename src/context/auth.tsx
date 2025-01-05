import { createContext } from "react";
import { AuthContextData } from "../types/AuthContextData";


const AuthContext = createContext({} as AuthContextData);

export default AuthContext;