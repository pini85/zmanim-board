'use client';

import { useState, useEffect } from 'react';
import { Zmanim, GeoLocation } from '@hebcal/core';

const ZmanimComponent = () => {
  // Rosh HaAyin Location
  const latitude = 32.0978;
  const longitude = 34.9564;
  const timeZone = 'Asia/Jerusalem';
  const useElevation = false; // Set to true if you want elevation-based calculations

  // State to store zmanim
  const [zmanim, setZmanim] = useState<{ [key: string]: string | null }>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Function to fetch zmanim for a given date
  const fetchZmanim = (dateStr: string) => {
    const date = new Date(dateStr);
    const gloc = new GeoLocation(null, latitude, longitude, 0, timeZone);
    const zmanim = new Zmanim(gloc, date, useElevation);

    setZmanim({
      sunrise: zmanim.sunrise()?.toLocaleTimeString() || null,
      sunset: zmanim.sunset()?.toLocaleTimeString() || null,
      shkiah: zmanim.shkiah()?.toLocaleTimeString() || null,
      alotHaShachar: zmanim.alotHaShachar()?.toLocaleTimeString() || null,
      misheyakir: zmanim.misheyakir()?.toLocaleTimeString() || null,
      sofZmanShma: zmanim.sofZmanShma()?.toLocaleTimeString() || null,
      sofZmanShmaMGA: zmanim.sofZmanShmaMGA()?.toLocaleTimeString() || null,
      sofZmanTfilla: zmanim.sofZmanTfilla()?.toLocaleTimeString() || null,
      chatzot: zmanim.chatzot()?.toLocaleTimeString() || null,
      minchaGedola: zmanim.minchaGedola()?.toLocaleTimeString() || null,
      minchaKetana: zmanim.minchaKetana()?.toLocaleTimeString() || null,
      plagHaMincha: zmanim.plagHaMincha()?.toLocaleTimeString() || null,
      tzeit: zmanim.tzeit()?.toLocaleTimeString() || null,
      tzeit72: zmanim.tzeit(72)?.toLocaleTimeString() || null,
      tzeit90: zmanim.tzeit(90)?.toLocaleTimeString() || null,
    });
  };

  // Fetch Zmanim when component mounts or date changes
  useEffect(() => {
    fetchZmanim(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        📍 <span className="text-blue-600">Halachic Zmanim</span> - Rosh HaAyin
      </h2>

      {/* Date Picker */}
      <div className="mb-4 text-center">
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
          Select Date:
        </label>
        <input
          type="date"
          className="border p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Display Zmanim */}
      <ul className="space-y-2 text-lg">
        {Object.entries(zmanim).map(([key, value], index) => (
          <li
            key={key}
            className={`flex justify-between border-b pb-1 ${
              index % 2 === 0
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-700'
            } text-gray-900 dark:text-white p-2 rounded-md`}
          >
            <span className="font-medium text-blue-600">
              {key.replace(/([A-Z])/g, ' $1')}
            </span>
            <span className="text-yellow-600 font-semibold">
              {value || 'N/A'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZmanimComponent;
