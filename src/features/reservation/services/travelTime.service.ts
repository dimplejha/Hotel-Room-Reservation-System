import type { Room } from '../types/room.types';

export function entryCost(room: Room) {
  return (room.floor - 1) * 2 + (room.position - 1);
}

export function moveCost(fromRoom: Room, toRoom: Room) {
  if (fromRoom.floor === toRoom.floor) {
    return Math.abs(fromRoom.position - toRoom.position);
  }

  return Math.abs(fromRoom.floor - toRoom.floor) * 2 + (fromRoom.position - 1) + (toRoom.position - 1);
}

export function calculateTravelTime(rooms: Room[]) {
  if (rooms.length === 0) {
    return 0;
  }

  const sorted = [...rooms].sort((left, right) => {
    if (left.floor !== right.floor) {
      return left.floor - right.floor;
    }

    return left.position - right.position;
  });

  let total = entryCost(sorted[0]);
  for (let index = 1; index < sorted.length; index += 1) {
    total += moveCost(sorted[index - 1], sorted[index]);
  }

  return total;
}

