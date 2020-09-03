export function getAppointmentsForDay(state, day) {
	const selectedDayObj = state.days.find((item) => item.name === day);

	if (!selectedDayObj) return [];
	else {
		const appointments = selectedDayObj.appointments.map(
			(appointmentsId) => state.appointments[appointmentsId]
		);
		return appointments;
	}
}
