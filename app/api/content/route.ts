import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Content } from '@/lib/models/content';
import dbConnect from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    await dbConnect();
    const content = await Content.find({ blog: blogId, author: session.user.id });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    const content = new Content({
      ...body,
      author: session.user.id,
    });

    await content.save();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 