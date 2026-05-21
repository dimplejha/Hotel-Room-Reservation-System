import { FloorView } from './FloorView';
import type { FloorViewModel } from '../types/hotel.types';

interface HotelGridProps {
  floors: FloorViewModel[];
}

export function HotelGrid({ floors }: HotelGridProps) {
  return (
    <div className="floors">
      {floors.map((floor) => (
        <FloorView key={floor.floor} floor={floor} />
      ))}
    </div>
  );
}

