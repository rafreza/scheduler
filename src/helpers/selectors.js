export default function getAppointmentsForDay(state, day) {
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