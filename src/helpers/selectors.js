function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  //filters through the states.days array and creates a new array that only contains the appointments of the said day 
  const dayArray = state.days.find((thisDay) => day === thisDay.name);
  
  if (dayArray === [] || !day || dayArray === undefined) {
    return [];
  }

  const apps = dayArray.appointments;
  
  for (const appointment of Object.values(state.appointments)) {
    if (apps.includes(appointment.id)) {
      dayAppointments.push(appointment);
    }
  }

  return dayAppointments;
}

//transforms interview data from api to a returned object that components can now work with
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

//similar function to getAppointmentsForDay, where we fetch the interviewers available that day instead
function getInterviewersForDay(state, day) {
  const interviewerList = [];
  const interviewDayArray = state.days.find((thisDay) => day === thisDay.name);

  if (interviewDayArray === [] || !day || interviewDayArray === undefined) {
    return [];
  }

  const { interviewers } = interviewDayArray;

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