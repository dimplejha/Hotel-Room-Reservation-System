export function ReservationLegend() {
  return (
    <div className="legend">
      <span className="legend-item">
        <span className="dot available" />
        Available
      </span>
      <span className="legend-item">
        <span className="dot occupied" />
        Occupied
      </span>
      <span className="legend-item">
        <span className="dot booked" />
        Just booked
      </span>
    </div>
  );
}

