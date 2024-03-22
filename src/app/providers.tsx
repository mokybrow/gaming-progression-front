'use client'

import React, { createContext, ReactNode } from "react";
import AuthStore from "@/storage/authStore";
import GamesStore from "@/storage/gamesStore";
import ContentStore from "@/storage/contentStore";


interface State {
    auth_store: AuthStore
    games_store: GamesStore
    content_store: ContentStore
}

const games_store = new GamesStore();
const auth_store = new AuthStore();
const content_store = new ContentStore();

export const Context = createContext<State>({
    auth_store: auth_store,
    games_store: games_store,
    content_store: content_store,

})

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <Context.Provider value={{ games_store: games_store, auth_store: auth_store, content_store: content_store }}>
            {children}
        </Context.Provider>

    );
}