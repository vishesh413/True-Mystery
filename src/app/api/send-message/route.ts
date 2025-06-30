import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

interface MessageRequestBody {
  username: string;
  content: string;
}

export async function POST(request: Request) {
  await dbConnect();

  let body: MessageRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON body',
      },
      { status: 400 }
    );
  }

  const { username, content } = body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        {
          success: false,
          message: 'User is not accepting messages',
        },
        { status: 403 }
      );
    }

    //  Push directly with schema validation — no need to cast type
    user.messages.push({
      content,
      createdAt: new Date(),
    });

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Send Message Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
