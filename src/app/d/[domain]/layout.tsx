import React from "react";
import type {Metadata} from "next";
import {loadLayout} from "@/lib/layout-loader";
import {metadata} from "@/app/d/[domain]/page";

export async function generateMetadata({params}: { params: Promise<{ domain: string }> }): Promise<Metadata> {
    const {domain} = await params;
    const domainData = await fetchDomain(domain);
    return {
        title: {
            template: domainData.title_template,
            default: "Jobsite Template",
        },
        description: domainData.description || "This template should be adjusted and configured by individual sites",
        generator: "Aurora CMS",
        applicationName: domainData.name || "Aurora CMS Jobsite Template",
        keywords: ["Aurora CMS", "Jobsite", "Template"],
        authors: [
            {
                name: domainData.tenant.name || "Aurora CMS",
            }
        ],
        creator: domainData.tenant.name || "Aurora CMS",
        openGraph: {
            title: domainData.title_template || "Jobsite Template",
            description: domainData.description || "This template should be adjusted and configured by individual sites",
            url: `https://${domainData.domain}`,
            siteName: "Aurora CMS Jobsite Template",
            images: [
                {
                    url: `https://${domainData.domain}/images/jobsite-template.png`,
                    width: 1200,
                    height: 630,
                    alt: "Jobsite Template Image"
                }
            ],
            locale: "en_US",
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title: domainData.title_template || "Jobsite Template",
            description: domainData.description || "This template should be adjusted and configured by individual sites",
            images: [`https://${domainData.domain}/images/jobsite-template.png`]
        },
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png"
        },
        robots: {
            index: true,
            follow: true,
            nocache: false
        },
    };
}

type DomainResponse = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    description: string;
    tenant_id: number;
    tenant_name: string;
    subdomain: string;
    domain: string;
    title_template: string;
    tenant: {
        id: number;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    },
    template: {
        id: number;
        name: string;
        description: string | null;
        file_path: string;
    }
}

const fetchDomain = async (domain: string): Promise<DomainResponse> => {
    console.log(`Fetching domain ${domain}`);
    try {
        const response = await fetch(`http://localhost:8080/api/v1/domains/${domain}`, {
            next: {revalidate: 60}
        });
        const data = await response.json();
        return data as DomainResponse;
    } catch (error) {
        console.error("Error fetching domain:", error);
        throw error;
    }
}

export default async function RootLayout({children, params}: {
    children: React.ReactNode,
    params: Promise<{ domain: string }>
}) {
    const {domain} = await params; // Placeholder for domain, replace with actual logic
    let hasTemplate = false;
    try {
        const site = await fetchDomain(domain);
        console.log(site);
        if (!site || !site.template || !site.template.file_path) {
            throw new Error("Site template not found or not configured.");
        }
        const Template = await loadLayout(site.template.file_path);

        return (
            <html lang="nl">
            <Template domain={domain}>
                {children}
            </Template>
            </html>
        );
    } catch (error) {
        const Template = await loadLayout("default");
        metadata.title = "ERROR: Domain not found";
        return (
            <html lang="nl">
            <Template domain={domain}>
                <div className="z-10 absolute flex justify-center items-center min-h-screen w-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md">
                        <div className="text-red-500 text-xl font-semibold mb-2">Error</div>
                        <div className="text-gray-700">Domain not found or not configured.</div>
                        <div className="text-gray-700">{(error as Error).message}</div>
                    </div>
                </div>
            </Template>
            </html>
        );
    }
}