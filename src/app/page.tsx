// import React, { useState, useEffect } from 'react';
'use-client';
import Link from 'next/link';
import { sanityFetch } from '../sanity/live';
import { BIRTHDAY_QUERY } from '../sanity/queries';

export default async function Home() {
  const { data: birthdayData } = await sanityFetch({
    query: BIRTHDAY_QUERY,
    params: {},
  });
  console.log({ birthdayData });

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-black mb-6">
        📅 Halachic Times Dashboard
      </h1>
      {birthdayData && (
        <div className="popup">
          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-2">
              🎉 Happy Birthday {birthdayData.name}!
            </h2>
            <p>{birthdayData.message}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Link href="/zmanim">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            📜 View Zmanim Times!!!
          </button>
        </Link>

        <Link href="/shabbat-candle-lighting">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
            🕯️ View Shabbat Candle Lighting Times
          </button>
        </Link>
      </div>
    </main>
  );
}
