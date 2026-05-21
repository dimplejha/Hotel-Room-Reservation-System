import { describe, expect, it } from 'vitest';
import { generateRooms } from '../services/roomGenerator.service';

describe('generateRooms', () => {
  it('generates 97 rooms', () => {
    const rooms = generateRooms();
    expect(rooms).toHaveLength(97);
    expect(rooms[0].roomNumber).toBe(101);
    expect(rooms.at(-1)?.roomNumber).toBe(1007);
  });

  it('numbers the top floor rooms from 1001 to 1007', () => {
    const rooms = generateRooms().filter((room) => room.floor === 10);
    expect(rooms.map((room) => room.roomNumber)).toEqual([1001, 1002, 1003, 1004, 1005, 1006, 1007]);
    expect(rooms.map((room) => room.position)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
