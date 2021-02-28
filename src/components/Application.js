import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    editInterview
  } = useApplicationData();
  
  const schedule = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={ getInterview(state, appointment.interview) }
        interviewers={ getInterviewersForDay(state, state.day) }
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        editInterview={editInterview}
      />
    );
  });
  
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
          days={state.days}
          day={state.day}
          setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />{" "}
      </section>
      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
