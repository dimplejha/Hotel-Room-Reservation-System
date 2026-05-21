import { RoomCard } from './RoomCard';
import type { FloorViewModel } from '../types/hotel.types';

interface FloorViewProps {
  floor: FloorViewModel;
}

export function FloorView({ floor }: FloorViewProps) {
  return (
    <div className="floor-row">
      <div className="floor-label">Floor {floor.floor}</div>
      <div className="room-strip">
        {floor.rooms.map((room) => (
          <RoomCard key={room.roomNumber} room={room} />
        ))}
      </div>
    </div>
  );
}

