import type { BookingResult } from './booking.types';
import type { RoomViewModel } from './room.types';

export interface FloorViewModel {
  floor: number;
  rooms: RoomViewModel[];
}

export interface ReservationSummary {
  totalRooms: number;
  occupiedCount: number;
  availableCount: number;
}

export interface ReservationViewModel {
  floors: FloorViewModel[];
  summary: ReservationSummary;
  lastBooking: BookingResult | null;
  message: string;
  messageType: 'success' | 'error' | 'neutral';
}
