import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData().catch(() => {
            throw new Error('Invalid form data');
        });

        const dbUrl = import.meta.env.VITE_APP_DBURL;

        if (!dbUrl || typeof dbUrl !== 'string') {
            throw new Error('Database URL is not defined or invalid');
        }

        const url = new URL('/api/collections/files/records', dbUrl);

        const response = await fetch(url.toString(), {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (typeof responseData !== 'object' || responseData === null) {
            throw new Error('Invalid response data');
        }

        return json({ success: true, data: responseData }, { status: 200 });
    } catch (error) {
        return json({ 
            success: false, 
            message: 'An error occurred while processing your request'
        }, { 
            status: 500 
        });
    }
};
