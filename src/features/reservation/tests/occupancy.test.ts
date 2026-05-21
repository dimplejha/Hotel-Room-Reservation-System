import { describe, expect, it } from 'vitest';
import { generateRooms } from '../services/roomGenerator.service';
import { generateRandomOccupancy } from '../services/occupancy.service';

describe('occupancy', () => {
  it('always returns at least one occupied room when rooms exist', () => {
    const occupied = generateRandomOccupancy(generateRooms(), 0);
    expect(occupied.length).toBe(1);
  });

  it('never occupies every room when rate is 1', () => {
    const rooms = generateRooms();
    const occupied = generateRandomOccupancy(rooms, 1);
    expect(occupied.length).toBeLessThan(rooms.length);
  });

  it('clamps negative occupancy rates to zero behavior', () => {
    const rooms = generateRooms();
    const occupied = generateRandomOccupancy(rooms, -3);
    expect(occupied.length).toBe(1);
  });
});
