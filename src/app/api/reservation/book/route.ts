import { NextResponse } from 'next/server';
import { bookRooms, getSnapshot } from '@/backend/reservation/reservation.store';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const booking = bookRooms(Number(body.count));
    return NextResponse.json({ ...booking, state: getSnapshot() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to book rooms.';
    const status = message.includes('cannot exceed') || message.includes('integer') || message.includes('at least 1') ? 400 : 409;
    return NextResponse.json({ error: message }, { status });
  }
}
