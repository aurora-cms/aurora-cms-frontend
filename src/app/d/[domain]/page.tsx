import Link from 'next/link';
import {notFound} from 'next/navigation';
import {protocol, rootDomain} from '@/lib/utils';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Test",
}


export default async function SubdomainPage({
                                                params
                                            }: {
    params: Promise<{ domain: string }>;
}) {
    const {domain} = await params;
    const subdomainData = {
        emoji: '🌐', // Placeholder for subdomain data, replace with actual data fetching logic
        name: domain // Placeholder for subdomain name, replace with actual data fetching logic
    }

    if (!subdomainData) {
        notFound();
    }

    return (
        <>
            <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
                <div className="absolute top-4 right-4">
                    <Link
                        href={`${protocol}://${rootDomain}`}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {rootDomain}
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-9xl mb-6">{subdomainData.emoji}</div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome to {domain || <span className="text-red-600">this should not be empty</span>}
                        </h1>
                        <p className="mt-3 text-lg text-gray-600">
                            This is your custom subdomain page
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}