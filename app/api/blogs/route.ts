import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Blog } from '@/lib/models/blog';
import dbConnect from '@/lib/db';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const blogs = await Blog.find({ owner: session.user.id }).populate('content');
    return NextResponse.json(blogs);
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

    const blog = new Blog({
      ...body,
      owner: session.user.id,
    });

    await blog.save();
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 