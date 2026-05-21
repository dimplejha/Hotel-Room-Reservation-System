import type { Room } from './room.types';

export type BookingStrategy = 'same-floor' | 'cross-floor';

export interface BookingResult {
  bookedRooms: number[];
  totalTravelTime: number;
  floorCount: number;
  strategy: BookingStrategy;
  rooms: Room[];
}

