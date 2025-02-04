import React from 'react';

import { HebrewCalendar, Location } from '@hebcal/core';
const Calender = ({ location }: { location: string }) => {
  console.log({ location });
  const options = {
    year: 2025,
    isHebrewYear: false,
    candlelighting: true,
    location: Location.lookup(location),
    sedrot: true,
    omer: true,
  };

  const events = HebrewCalendar.calendar(options);
  console.log(events);
  const myArray = [];
  for (const ev of events) {
    const hd = ev.getDate();
    const date = hd.greg();
    // setDates([
    //   ...dates,
    //   date.toLocaleDateString(),
    //   ev.render('en'),
    //   hd.toString(),
    // ]);
    const obj = {
      date: date.toLocaleDateString(),
      event: ev.render('en'),
      hd: hd.toString(),
    };
    console.log(obj);
    myArray.push(obj);

    // console.log(date.toLocaleDateString(), ev.render('en'), hd.toString());
  }
  console.log(myArray);

  return (
    <div>
      <h1>Calender</h1>
      {myArray.map((date, i) => (
        <div key={i}>
          {date.date},{date.event},{date.hd}
        </div>
      ))}
    </div>
  );
};

export default Calender;
