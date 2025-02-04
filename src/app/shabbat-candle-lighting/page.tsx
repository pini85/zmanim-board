'use client';

import { useState, useEffect } from 'react';
import { HebrewCalendar, Location, CandleLightingEvent } from '@hebcal/core';

const CandleLightingList = () => {
  // Use precise latitude/longitude for Rosh HaAyin, Israel
  const location = new Location(32.0978, 34.9564, false, 'Asia/Jerusalem');

  // State for storing candle lighting times
  const [candleTimes, setCandleTimes] = useState<
    { hebrewDate: string; gregorianDate: string; candleTime: string }[]
  >([]);

  // Function to fetch all Shabbat candle lighting times for the year
  const fetchCandleLightingForYear = () => {
    const year = new Date().getFullYear();

    // Ensure location is valid
    if (!location) {
      console.error('Location is undefined or invalid.');
      return;
    }

    // Generate calendar events for the entire year
    const options = {
      year,
      isHebrewYear: false,
      candlelighting: true,
      location, // Ensure this is a valid `Location` object
    };

    const events = HebrewCalendar.calendar(options);

    // Filter events for Shabbat candle lighting
    const candleLightingList = events
      .filter((ev) => ev.getDesc() === 'Candle lighting')
      .map((ev) => {
        const candleEvent = ev as CandleLightingEvent; // ✅ Type assertion
        return {
          hebrewDate: ev.getDate().render(),
          gregorianDate: ev.getDate().greg().toDateString(),
          candleTime: candleEvent.eventTime?.toLocaleTimeString() || 'N/A', // ✅ Now recognized by TypeScript
        };
      });

    setCandleTimes(candleLightingList);
  };

  // Fetch candle lighting times on component mount
  useEffect(() => {
    fetchCandleLightingForYear();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        🕯️{' '}
        <span className="text-yellow-600">Shabbat Candle Lighting Times</span> -
        Rosh HaAyin
      </h2>

      {/* Table for Displaying Data */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                📅 <span className="text-blue-600">Gregorian Date</span>
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                📜 <span className="text-green-600">Hebrew Date</span>
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                🕯️ <span className="text-yellow-600">Candle Lighting</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {candleTimes.map((entry, index) => (
              <tr
                key={index}
                className="text-center even:bg-gray-100 odd:bg-white dark:even:bg-gray-700 dark:odd:bg-gray-800 text-gray-900 dark:text-white"
              >
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {entry.gregorianDate}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {entry.hebrewDate}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold text-yellow-600">
                  {entry.candleTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandleLightingList;
