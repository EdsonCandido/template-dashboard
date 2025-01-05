import { ReactNode } from "react";
import AuthProvider from "./auth";


type ContextProviderProps = {
    children?: ReactNode
}
const AppProvider = ({ children }: ContextProviderProps) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
};

export default AppProvider;