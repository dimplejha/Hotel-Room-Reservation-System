import { NextResponse } from 'next/server';
import { getSnapshot, resetReservation } from '@/backend/reservation/reservation.store';

export async function POST() {
  resetReservation();
  return NextResponse.json({ state: getSnapshot() });
}

