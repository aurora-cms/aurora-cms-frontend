import "./global.css"
import React from "react";
import {AuroraBackground} from "@/templates/default/components/aurora-background";

export async function Layout({children}: { children: React.ReactNode, domain: string }) {

    return (
        <body className="bg-gray-100 text-gray-900 antialiased w-full inset-0 m-0">
        <AuroraBackground/>
        {children}
        </body>
    );
}