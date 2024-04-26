'use client'

import React, { createContext, ReactNode, useState } from "react";
import AuthStore from "@/storage/authStore";
import GamesStore from "@/storage/gamesStore";
import ContentStore from "@/storage/contentStore";
import UserStore from "@/storage/userStore";


interface State {
    auth_store: AuthStore
    games_store: GamesStore
    content_store: ContentStore
    user_store: UserStore
}

const games_store = new GamesStore();
const auth_store = new AuthStore();
const content_store = new ContentStore();
const user_store = new UserStore();

export const Context = createContext<State>({
    auth_store: auth_store,
    games_store: games_store,
    content_store: content_store,
    user_store: user_store,

})


export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <Context.Provider value={{ games_store: games_store, auth_store: auth_store, content_store: content_store , user_store: user_store}}>
                {children}
        </Context.Provider>

    );
}