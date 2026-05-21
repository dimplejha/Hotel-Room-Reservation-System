import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GET as getState } from './state/route';
import { POST as book } from './book/route';
import { POST as randomize } from './randomize/route';
import { POST as reset } from './reset/route';
import { __setOccupiedRoomsForTests, resetReservation } from '@/backend/reservation/reservation.store';
import { generateRooms } from '@/features/reservation/services/roomGenerator.service';

beforeEach(() => {
  resetReservation();
});

afterEach(() => {
  resetReservation();
});

describe('reservation api routes', () => {
  it('returns the current state', async () => {
    const response = await getState();
    const body = await response.json();
    expect(body.summary.totalRooms).toBe(97);
  });

  it('books through the api and updates state', async () => {
    const rooms = generateRooms();
    const keep = new Set([101, 102, 105, 106]);
    __setOccupiedRoomsForTests(rooms.filter((room) => !keep.has(room.roomNumber)).map((room) => room.roomNumber));

    const response = await book(
      new Request('http://localhost/api/reservation/book', {
        method: 'POST',
        body: JSON.stringify({ count: 4 }),
      })
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.bookedRooms).toEqual([101, 102, 105, 106]);
  });

  it('rejects invalid booking counts with 400', async () => {
    const response = await book(
      new Request('http://localhost/api/reservation/book', {
        method: 'POST',
        body: JSON.stringify({ count: 6 }),
      })
    );

    expect(response.status).toBe(400);
  });

  it('randomizes and resets through the api', async () => {
    const randomizeResponse = await randomize(
      new Request('http://localhost/api/reservation/randomize', {
        method: 'POST',
        body: JSON.stringify({ rate: 0 }),
      })
    );
    expect(randomizeResponse.status).toBe(200);

    const resetResponse = await reset();
    expect(resetResponse.status).toBe(200);
    const body = await resetResponse.json();
    expect(body.state.summary.occupiedCount).toBe(0);
  });
});
