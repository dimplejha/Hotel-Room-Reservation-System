export function useRandomOccupancy() {
  return async (rate?: number) => {
    await fetch('/api/reservation/randomize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rate }),
    });
  };
}
