import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList";
import "components/Application.scss";

import Appointment from "components/appointment"



const schedule = appointments.map((appointment) => {
  return (
    <Appointment
      key={appointment.id} {...appointment}
    />
  );
});

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getDays = `http://localhost:8001/api/days`;
    axios.get(getDays).then((response) => {
      setDays([...response.data]);
      console.log(response.data);
    });

  }, [days]);


  const [day, setDay] = useState("Monday");

  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
