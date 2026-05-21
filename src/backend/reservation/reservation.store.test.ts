import { beforeEach, describe, expect, it } from 'vitest';
import {
  __setOccupiedRoomsForTests,
  bookRooms,
  getSnapshot,
  randomizeReservation,
  resetReservation,
} from './reservation.store';
import { generateRooms } from '@/features/reservation/services/roomGenerator.service';

beforeEach(() => {
  resetReservation();
});

describe('reservation store', () => {
  it('returns a clean initial snapshot after reset', () => {
    const snapshot = getSnapshot();
    expect(snapshot.summary.totalRooms).toBe(97);
    expect(snapshot.summary.occupiedCount).toBe(0);
    expect(snapshot.summary.availableCount).toBe(97);
    expect(snapshot.messageType).toBe('neutral');
  });

  it('books a valid same-floor allocation', () => {
    const rooms = generateRooms();
    const keep = new Set([101, 102, 105, 106]);
    __setOccupiedRoomsForTests(rooms.filter((room) => !keep.has(room.roomNumber)).map((room) => room.roomNumber));

    const booking = bookRooms(4);
    expect(booking.bookedRooms).toEqual([101, 102, 105, 106]);
    expect(booking.floorCount).toBe(1);
    expect(booking.totalTravelTime).toBe(5);
    expect(getSnapshot().messageType).toBe('success');
  });

  it('rejects invalid requests without changing the occupied rooms count', () => {
    __setOccupiedRoomsForTests([101, 102, 103]);

    expect(() => bookRooms(0)).toThrow('at least 1');
    expect(() => bookRooms(6)).toThrow('cannot exceed 5');
    expect(getSnapshot().summary.occupiedCount).toBe(3);
    expect(getSnapshot().messageType).toBe('error');
  });

  it('randomizeReservation always leaves at least one room occupied', () => {
    randomizeReservation(0);
    expect(getSnapshot().summary.occupiedCount).toBe(1);

    randomizeReservation(1);
    expect(getSnapshot().summary.occupiedCount).toBeLessThan(97);
  });
});
