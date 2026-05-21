export type RoomStatus = 'available' | 'occupied' | 'booked';

export interface Room {
  roomNumber: number;
  floor: number;
  position: number;
}

export interface RoomViewModel extends Room {
  status: RoomStatus;
}

