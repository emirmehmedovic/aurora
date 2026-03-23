import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { testTelegramBot } from '@/lib/telegram';

/**
 * Test Telegram bot connection
 * POST /api/telegram/test
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Test bot connection
    const result = await testTelegramBot();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error testing Telegram bot:', error);
    return NextResponse.json(
      { error: 'Failed to test Telegram bot' },
      { status: 500 }
    );
  }
}
