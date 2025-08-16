import {Header} from "@/templates/jobsite/components/header";
import "./global.css"
import React from "react";

export async function Layout({children, domain}: { children: React.ReactNode, domain: string }) {

    return (
        <>
        <body className="bg-gray-100 text-gray-900 antialiased w-full inset-0 m-0">
        <Header image={`https://werkenvoormolenlanden.nl/video/4/image-thumb__4___auto_8c506a361f093d92558184efb6fe951e/Molenlanden-Header~-~time-119.jpg`}
                video={`https://werkenvoormolenlanden.nl/video/4/video-thumb__4__headerVideo/Molenlanden-Header.mp4`} />
        {children}
        </body>
        </>
    );

}