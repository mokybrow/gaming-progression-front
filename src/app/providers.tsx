'use client'

import React, { createContext, ReactNode } from "react";
import AuthStore from "@/storage/authStore";
import GamesStore from "@/storage/gamesStore";


interface State {
    auth_store: AuthStore
    games_store: GamesStore
}

const games_store = new GamesStore();

const auth_store = new AuthStore();

export const Context = createContext<State>({
    auth_store: auth_store,
    games_store: games_store,

})

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <Context.Provider value={{ games_store: games_store, auth_store: auth_store, }}>
            {children}
        </Context.Provider>

    );
}