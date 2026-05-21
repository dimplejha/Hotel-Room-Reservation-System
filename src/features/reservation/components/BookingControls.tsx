import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

interface BookingControlsProps {
  roomCount: number;
  onRoomCountChange: (value: number) => void;
  onBook: () => void | Promise<void>;
  onRandomize: () => void | Promise<void>;
  onReset: () => void | Promise<void>;
  message: string;
  messageType: 'success' | 'error' | 'neutral';
}

export function BookingControls({
  roomCount,
  onRoomCountChange,
  onBook,
  onRandomize,
  onReset,
  message,
  messageType,
}: BookingControlsProps) {
  return (
    <>
      <div className="booking-form">
        <label htmlFor="roomCount">Number of rooms</label>
        <div className="inline">
          <Input
            id="roomCount"
            type="number"
            min={1}
            max={5}
            step={1}
            value={roomCount}
            onChange={(event) => onRoomCountChange(Number(event.target.value))}
          />
          <Button variant="primary" onClick={() => void onBook()}>
            Book Rooms
          </Button>
        </div>
      </div>

      <div className="actions">
        <Button onClick={() => void onRandomize()}>Generate Random Occupancy</Button>
        <Button variant="ghost" onClick={() => void onReset()}>
          Reset Entire Booking
        </Button>
      </div>

      <div className={`message ${messageType === 'error' ? 'error' : ''}`} aria-live="polite">
        {message}
      </div>
    </>
  );
}
