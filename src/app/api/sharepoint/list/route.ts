import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !(session as any).accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId') || 'root';
    const accessToken = (session as any).accessToken;

    try {
        const url = folderId === 'root'
            ? 'https://graph.microsoft.com/v1.0/me/drive/root/children'
            : `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children`;

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json({ error: error.message }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('SharePoint List Error:', error);
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
    }
}
