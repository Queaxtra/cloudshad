import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch, setHeaders }) => {
    const { fileId, fileName } = params;
    const dbUrl = import.meta.env.VITE_APP_DBURL;
    const sanitizedFileName = encodeURIComponent(fileName);

    if (!fileId || !fileName || typeof fileId !== 'string' || typeof fileName !== 'string') {
        throw error(400, 'Invalid fileId or fileName');
    }

    try {
        const response = await fetch(`${dbUrl}/api/files/n5re0i5v6qi60xd/${fileId}/${sanitizedFileName}`, {
            method: 'GET',
            headers: {
                'Accept': 'image/*,application/octet-stream'
            }
        });

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch image');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            throw error(400, 'Invalid content type');
        }

        const arrayBuffer = await response.arrayBuffer();

        setHeaders({
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'X-Content-Type-Options': 'nosniff',
            'Content-Security-Policy': "default-src 'self'",
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
        });

        return new Response(arrayBuffer);
    } catch (err) {
        throw error(500, 'Internal Server Error');
    }
};
