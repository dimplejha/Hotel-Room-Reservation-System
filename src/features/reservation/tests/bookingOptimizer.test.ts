import { describe, expect, it } from 'vitest';
import { generateRooms } from '../services/roomGenerator.service';
import { optimizeBooking } from '../services/bookingOptimizer.service';

describe('booking optimizer', () => {
  it('prefers same-floor rooms when available', () => {
    const rooms = generateRooms().filter((room) => [101, 102, 105, 106, 201, 202, 203, 210, 301, 302].includes(room.roomNumber));
    const booking = optimizeBooking(4, rooms);
    expect(booking?.bookedRooms).toEqual([101, 102, 105, 106]);
  });

  it('falls back to the cheapest cross-floor allocation when no floor can satisfy the request', () => {
    const rooms = generateRooms().filter((room) => [101, 102, 201, 202, 301, 302, 303].includes(room.roomNumber));
    const booking = optimizeBooking(4, rooms);
    expect(booking?.bookedRooms).toEqual([101, 102, 201, 202]);
    expect(booking?.floorCount).toBe(2);
  });

  it('returns null when booking cannot be satisfied', () => {
    const rooms = generateRooms().filter((room) => [101, 102, 103].includes(room.roomNumber));
    const booking = optimizeBooking(4, rooms);
    expect(booking).toBeNull();
  });
});
