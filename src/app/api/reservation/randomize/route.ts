import { NextResponse } from 'next/server';
import { getSnapshot, randomizeReservation } from '@/backend/reservation/reservation.store';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const rate = typeof body.rate === 'number' ? body.rate : 0.35;
  randomizeReservation(rate);
  return NextResponse.json({ state: getSnapshot() });
}
