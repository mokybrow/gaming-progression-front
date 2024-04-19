import type { PropsWithChildren } from "react";
import "@/app/globals.css";
import SideLeft from "@/components/sidebars/sidebar-left/SideLeft";




export default function MainLayout({
    children
}: PropsWithChildren<unknown>) {
    return (
        <>
            <div className="layout" id='layout'>
                <SideLeft />
                {children}
            </div>
        </>
    )
}