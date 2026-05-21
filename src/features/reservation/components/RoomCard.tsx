import type { RoomViewModel } from '../types/room.types';

interface RoomCardProps {
  room: RoomViewModel;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <div className={`room ${room.status}`}>
      <span className="room-number">{room.roomNumber}</span>
      <span className="room-meta">{room.status === 'available' ? 'Open' : room.status === 'booked' ? 'Booked' : 'Occupied'}</span>
    </div>
  );
}

