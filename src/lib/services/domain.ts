const SPECIAL_ROOT_DOMAINS = ['localhost', 'aurora-cms.nl'];

/**
 * Extracts the subdomain from a hostname based on the specified root domain.
 *
 * @param {string} hostname - The full hostname from which the domain or subdomain is to be extracted.
 * @param {string} rootDomain - The root domain used for determining the subdomain.
 * @return {string | null} The extracted subdomain as a string, or null if no subdomain is found or applicable.
 */
export function extractDomain(hostname: string, rootDomain: string): string | null {
    const cleanRootDomain = rootDomain.split(':')[0];
    const cleanHostname = hostname.split(':')[0];
    if (!cleanHostname || cleanHostname === 'www.') {
        return null;
    }

    if (SPECIAL_ROOT_DOMAINS.includes(cleanRootDomain)) {
        // Local/staging: only return subdomains
        if (
            cleanHostname === cleanRootDomain ||
            cleanHostname === `www.${cleanRootDomain}`
        ) {
            return null;
        }

        if (cleanHostname.endsWith(`.${cleanRootDomain}`)) {
            return cleanHostname.slice(0, -(`.${cleanRootDomain}`).length);
        }

        return null;
    }

    // Production: always return full hostname
    return cleanHostname;
}

/**
 * Normalizes a domain by removing the 'www.' prefix if it exists.
 *
 * @param {string | null} domain - The domain to normalize.
 * @return {string | null} The normalized domain, or null if the input is null.
 */
export function normalizeDomain(domain: string | null): string | null {
    if (!domain || domain === 'www.') {
        return null;
    }

    const stripped = domain.replace(/^www\./, '');
    return stripped ? sanitizeDomain(stripped) : null;
}


/**
 * Sanitizes a given domain string by converting it to lowercase
 * and removing all characters except alphanumeric characters and hyphens.
 *
 * @param {string} domain - The domain string to be sanitized.
 * @return {string} - The sanitized domain string.
 */
export function sanitizeDomain(domain: string): string {
    return domain
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '')
        .replace(/^[-.]+|[-.]+$/g, ''); // ✅ fix for trailing dots/hyphens
}