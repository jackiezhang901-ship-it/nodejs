'use client'
import { createContext } from "react";


export type Auth = {
    id :number,
    name: string,
}

type AuthTypeContext = {
    auth: Auth;
    setAuth: (auth: Auth) => void;
}

export const AuthContext = createContext<AuthTypeContext | null>(null)
