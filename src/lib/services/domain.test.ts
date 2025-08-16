// domain.test.ts
import { extractDomain, normalizeDomain } from '@/lib/services/domain';

describe('Domain Service', () => {
    describe('extractDomain', () => {
        // localhost environment
        test('localhost root domain', () => {
            expect(extractDomain('localhost', 'localhost')).toBeNull();
            expect(extractDomain('www.localhost', 'localhost')).toBeNull();
        });

        test('localhost subdomains', () => {
            expect(extractDomain('test.localhost', 'localhost')).toBe('test');
            expect(extractDomain('sub.test.localhost', 'localhost')).toBe('sub.test');
            expect(extractDomain('www.test.localhost', 'localhost')).toBe('www.test');
            expect(extractDomain('jbrr.localhost:3000', 'localhost:3000')).toBe('jbrr');
        });

        test('localhost without matching root', () => {
            expect(extractDomain('test.example.localhost', 'example.com')).toBe('test.example.localhost');
        });

        // staging environment (aurora-cms.nl)
        test('staging root domain', () => {
            expect(extractDomain('aurora-cms.nl', 'aurora-cms.nl')).toBeNull();
            expect(extractDomain('www.aurora-cms.nl', 'aurora-cms.nl')).toBeNull();
        });

        test('staging subdomains', () => {
            expect(extractDomain('demo.aurora-cms.nl', 'aurora-cms.nl')).toBe('demo');
            expect(extractDomain('branch.demo.aurora-cms.nl', 'aurora-cms.nl')).toBe('branch.demo');
        });

        test('staging without matching root', () => {
            expect(extractDomain('demo.aurora-cms.nl', 'example.com')).toBe('demo.aurora-cms.nl');
        });

        // production environment (other domains)
        test('production domains always return domain', () => {
            expect(extractDomain('example.com', 'example.com')).toBe('example.com');
            expect(extractDomain('www.example.com', 'example.com')).toBe('www.example.com');
            expect(extractDomain('sub.example.com', 'example.com')).toBe('sub.example.com');
            expect(extractDomain('deep.sub.example.com', 'example.com')).toBe('deep.sub.example.com');
        });

        test('production unrelated root domain', () => {
            expect(extractDomain('example.com', 'other.com')).toBe('example.com');
        });

        test('returns null for empty hostname', () => {
            expect(extractDomain('', 'example.com')).toBeNull();
        });

        test('returns null for special cases', () => {
            expect(extractDomain('www.', 'example.com')).toBeNull();
        });

        test('returns null for special root domains', () => {
            expect(extractDomain('localhost', 'localhost')).toBeNull();
            expect(extractDomain('aurora-cms.nl', 'aurora-cms.nl')).toBeNull();
        });
    });

    describe('normalizeDomain', () => {
        test('removes www from domain', () => {
            expect(normalizeDomain('www.example.com')).toBe('example.com');
            expect(normalizeDomain('www.sub.example.com')).toBe('sub.example.com');
        });

        test('keeps domains without www unchanged', () => {
            expect(normalizeDomain('example.com')).toBe('example.com');
            expect(normalizeDomain('sub.example.com')).toBe('sub.example.com');
        });

        test('handles null gracefully', () => {
            expect(normalizeDomain(null)).toBeNull();
        });

        test('handles special cases of localhost and staging with www', () => {
            expect(normalizeDomain('www.localhost')).toBe('localhost');
            expect(normalizeDomain('www.aurora-cms.nl')).toBe('aurora-cms.nl');
        });

        test('returns null for empty string', () => {
            expect(normalizeDomain('')).toBeNull();
        });

        test('returns null for just www', () => {
            expect(normalizeDomain('www.')).toBeNull();
        });
    });
});