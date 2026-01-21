export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Increase body size limit for large video uploads
export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing
        responseLimit: false,
    },
};
