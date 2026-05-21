import type { Room } from '../types/room.types';

export function buildOccupiedSet(occupiedRoomNumbers: number[]) {
  return new Set(occupiedRoomNumbers);
}

export function filterAvailableRooms(rooms: Room[], occupiedRoomNumbers: number[]) {
  const occupied = buildOccupiedSet(occupiedRoomNumbers);
  return rooms.filter((room) => !occupied.has(room.roomNumber));
}

export function generateRandomOccupancy(rooms: Room[], rate: number) {
  const clampedRate = Math.min(1, Math.max(0, rate));
  const occupied: number[] = [];

  for (const room of rooms) {
    if (Math.random() < clampedRate) {
      occupied.push(room.roomNumber);
    }
  }

  if (occupied.length === rooms.length && rooms.length > 0) {
    occupied.pop();
  }

  if (occupied.length === 0 && rooms.length > 0) {
    occupied.push(rooms[0].roomNumber);
  }

  return occupied;
}

