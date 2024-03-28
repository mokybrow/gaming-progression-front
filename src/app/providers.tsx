'use client'

import React, { createContext, ReactNode, useState } from "react";
import AuthStore from "@/storage/authStore";
import GamesStore from "@/storage/gamesStore";
import ContentStore from "@/storage/contentStore";
import { IntlProvider } from 'react-intl';


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
if (typeof navigator !== "undefined") {
    var local = navigator.language;
}

export function Providers({ children }: { children: React.ReactNode }) {
    // var local = navigator.language;

    return (
        <Context.Provider value={{ games_store: games_store, auth_store: auth_store, content_store: content_store }}>
            <IntlProvider locale={'ru'}>
                {children}
            </IntlProvider>
        </Context.Provider>

    );
}