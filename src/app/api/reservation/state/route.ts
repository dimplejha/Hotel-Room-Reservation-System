import { NextResponse } from 'next/server';
import { getSnapshot } from '@/backend/reservation/reservation.store';

export async function GET() {
  return NextResponse.json(getSnapshot());
}

