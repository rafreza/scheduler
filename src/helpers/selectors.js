function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  const dayArray = state.days.filter((thisDay) => day === thisDay.name);

  if (dayArray === [] || !day || dayArray[0] === undefined) {
    return [];
  }

  const apps = dayArray[0].appointments;
  
  for (const appointment of Object.values(state.appointments)) {
    if (apps.includes(appointment.id)) {
      dayAppointments.push(appointment);
    }
  }

  return dayAppointments;
}

function getInterview(state, interview) {
  if (interview === null || !interview) {
    return null;
  }
  for (const interviewer of Object.values(state.interviewers)) {
    if (interviewer.id === interview.interviewer) {
      
      return { student: interview.student, interviewer: interviewer };
    }
  }

}

function getInterviewersForDay(state, day) {
  const interviewerList = [];
  const interviewDayArray = state.days.filter((thisDay) => day === thisDay.name);

  if (interviewDayArray === [] || !day || interviewDayArray[0] === undefined) {
    return [];
  }

  const { interviewers } = interviewDayArray[0];

  for (const interviewer of interviewers) {
    interviewerList.push(state.interviewers[interviewer]);
  }

  return interviewerList;
}

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
};