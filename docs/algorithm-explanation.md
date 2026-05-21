# Algorithm Explanation

The allocator checks available rooms and tries:

1. Same-floor contiguous windows.
2. Cross-floor combinations ordered by floor and position.

Travel time is measured from the left-side staircase/lift entrance and between booked rooms.

