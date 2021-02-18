import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList";
import "components/Application.scss";

import Appointment from "components/appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
  id: 2,
  time: "1pm",
  interview: {
    student: "Lydia Miller-Jones",
    interviewer: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
];


const schedule = appointments.map((appointment) => {
  return (
    <Appointment
      key={appointment.id} {...appointment}
    />
  );
});

export default function Application(props) {
  const [days, setDays] = useState([]);

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
