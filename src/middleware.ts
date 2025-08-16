import {NextRequest, NextResponse} from "next/server";
import {rootDomain} from "@/lib/utils";
import {extractDomain, normalizeDomain} from "@/lib/services/domain";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    const rawDomain = extractDomain(hostname, rootDomain);
    let domain = normalizeDomain(rawDomain);

    if (domain === 'localhost') {
        domain = 'aurora-cms.nl'; // Redirect localhost to the main domain
    }

    if (domain) {
        // Rewrite all root path visits on subdomains
        if (pathname === '/') {
            return NextResponse.rewrite(new URL(`/d/${domain}`, req.url));
        }

        // Rewrite multi-level subdomains to /app/d/[domain]/[pathname]
        return NextResponse.rewrite(new URL(`/d/${domain}${pathname}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next|[\\w-]+\\.\\w+).*)',
};