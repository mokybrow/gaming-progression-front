import type { PropsWithChildren } from "react";
import "@/app/globals.css";

export default function GamesLayout({
    children
}: PropsWithChildren<unknown>) {
    return (
        <>
            <div className="nested_layout">
                {children}
            </div>
        </>
    )
}