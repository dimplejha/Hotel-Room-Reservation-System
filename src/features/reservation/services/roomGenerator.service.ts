import { getFloors, getRoomCountForFloor } from '../utils/floor.util';
import { getRoomFloor, getRoomPosition } from '../utils/roomNumber.util';
import type { Room } from '../types/room.types';

export function generateRooms(): Room[] {
  const rooms: Room[] = [];

  for (const floor of getFloors()) {
    const count = getRoomCountForFloor(floor);
    for (let position = 0; position < count; position += 1) {
      rooms.push({
        floor: getRoomFloor(floor === 10 ? 1001 + position : floor * 100 + (position + 1)),
        position: floor === 10 ? getRoomPosition(1001 + position) : position + 1,
        roomNumber: floor === 10 ? 1001 + position : floor * 100 + (position + 1),
      });
    }
  }

  return rooms;
}

