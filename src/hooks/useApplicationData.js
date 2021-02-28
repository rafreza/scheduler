import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  // This function gets called whenever an appointment is 
  // made/deleted and changes the spots remaining accordingly based on the operand
  function spotsRemaining(state, day, operand) {
    const currentDay = state.days.find((event) => event.name === day);
    if (operand === "+") {
      currentDay.spots += 1;
    } else if (operand === "-") {
      currentDay.spots -= 1;
    }
  }

  //books an appointment based on id, makes a put request
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        spotsRemaining(state, state.day, "-");
        setState(() => ({ ...state, appointments }));
       });
  };
  //deletes an appointment based on id, makes a delete request
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        spotsRemaining(state, state.day, '+');
        setState(() => ({...state, appointments }));
      });
  }

  function editInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
    .put(`/api/appointments/${id}`, appointment)
    .then(() => {
      spotsRemaining(state, state.day, "0");
      setState(() => ({ ...state, appointments }));
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {

      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview, editInterview };
}