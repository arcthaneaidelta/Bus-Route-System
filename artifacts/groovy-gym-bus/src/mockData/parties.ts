import { addDays, setHours, setMinutes, startOfDay } from 'date-fns';

const today = startOfDay(new Date());

export const generateParties = () => {
  // Generate some weekend slots
  const slots: { id: string; date: Date; available: boolean }[] = [];
  
  // Find next saturday
  let nextSat = addDays(today, 6 - today.getDay());
  if (today.getDay() === 6) nextSat = addDays(today, 7); // If today is Sat, get next
  
  const nextSun = addDays(nextSat, 1);
  const followingSat = addDays(nextSat, 7);
  const followingSun = addDays(nextSun, 7);
  
  const dates = [nextSat, nextSun, followingSat, followingSun];
  
  dates.forEach(date => {
    // 10 AM, 1 PM, 4 PM slots
    [10, 13, 16].forEach(hour => {
      // Randomly make some booked
      const isAvailable = Math.random() > 0.4;
      slots.push({
        id: `slot-${date.getTime()}-${hour}`,
        date: setHours(setMinutes(date, 0), hour),
        available: isAvailable
      });
    });
  });
  
  return slots;
};
