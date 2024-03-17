import type { PropsWithChildren } from "react";


export default function AuthLayout({
    children
}: PropsWithChildren<unknown>) {
    return (
        <>
            <div className="auth_layout">
                {children}
            </div>
        </>

    )
}